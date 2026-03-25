import asyncio
import time
from datetime import datetime, timezone

import structlog
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.tasks.celery_app import celery
from app.config import settings
from app.models.source import Source
from app.models.crawl import CrawlJob
from app.connectors.registry import ConnectorRegistry
from app.connectors.base import SearchParams
from app.services.ingestion import IngestionService
from app.core.security import (
    get_circuit_breaker,
    get_rate_limiter,
    get_random_search_query,
    jitter,
    randomize_crawl_interval,
)

logger = structlog.get_logger()


def _make_session() -> async_sessionmaker[AsyncSession]:
    """Create a fresh engine + session for each task (avoids event loop conflicts in forked workers)."""
    engine = create_async_engine(settings.DATABASE_URL, pool_size=5, max_overflow=10)
    return async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


def run_async(coro):
    """Run an async coroutine from a sync Celery task."""
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        return loop.run_until_complete(coro)
    finally:
        loop.close()


@celery.task(name="app.tasks.crawl_tasks.trigger_scheduled_crawls")
def trigger_scheduled_crawls():
    run_async(_trigger_scheduled_crawls())


async def _trigger_scheduled_crawls():
    session_factory = _make_session()
    async with session_factory() as db:
        result = await db.execute(select(Source).where(Source.is_active == True))
        sources = result.scalars().all()

        now = datetime.now(timezone.utc)
        for source in sources:
            cb = get_circuit_breaker(source.name)
            if not cb.can_execute():
                logger.warning("crawl.circuit_open", source=source.name, state=cb.state)
                continue

            if source.last_crawl_at is None:
                crawl_source.apply_async(args=[str(source.id)], countdown=jitter(2, 0.5))
                logger.info("crawl.scheduled", source=source.name, reason="never_crawled")
            else:
                randomized_interval = randomize_crawl_interval(source.crawl_interval_minutes)
                minutes_since = (now - source.last_crawl_at).total_seconds() / 60
                if minutes_since >= randomized_interval:
                    crawl_source.apply_async(args=[str(source.id)], countdown=jitter(5, 0.5))
                    logger.info("crawl.scheduled", source=source.name, minutes_since=round(minutes_since))


@celery.task(name="app.tasks.crawl_tasks.crawl_source", bind=True, max_retries=2, default_retry_delay=120)
def crawl_source(self, source_id: str):
    run_async(_crawl_source(source_id))


async def _crawl_source(source_id: str):
    import uuid
    import app.connectors  # ensure all connectors are registered

    session_factory = _make_session()
    async with session_factory() as db:
        result = await db.execute(select(Source).where(Source.id == uuid.UUID(source_id)))
        source = result.scalar_one_or_none()

        if not source:
            logger.error("crawl.source_not_found", source_id=source_id)
            return

        cb = get_circuit_breaker(source.name)
        if not cb.can_execute():
            logger.warning("crawl.blocked_by_circuit_breaker", source=source.name)
            return

        rl = get_rate_limiter(source.name, rpm=source.rate_limit_rpm)
        if not rl.acquire():
            wait = rl.wait_time()
            logger.info("crawl.rate_limited", source=source.name, wait_seconds=round(wait))
            await asyncio.sleep(wait)

        search_query = get_random_search_query()
        job = CrawlJob(
            source_id=source.id,
            status="running",
            search_params={"query": search_query, "country": source.country},
            started_at=datetime.now(timezone.utc),
        )
        db.add(job)
        await db.commit()

        logger.info("crawl.started", source=source.name, job_id=str(job.id), query=search_query)

        try:
            connector = ConnectorRegistry.get(source.name)
            params = SearchParams(query=search_query, brand="Oakley", country=source.country)

            listings = await connector.search(params)

            ingestion = IngestionService(db)
            new_count = 0

            for listing_data in listings:
                raw = await ingestion.ingest_raw(source.id, job.id, listing_data)
                normalized_data = connector.normalize(listing_data)
                await ingestion.normalize_and_store(raw, normalized_data, source)
                new_count += 1

            await db.commit()

            job.status = "completed"
            job.listings_found = len(listings)
            job.listings_new = new_count
            job.completed_at = datetime.now(timezone.utc)
            job.duration_seconds = (job.completed_at - job.started_at).total_seconds()

            source.last_crawl_at = datetime.now(timezone.utc)
            source.health_status = "healthy"
            cb.record_success()

            await db.commit()
            logger.info("crawl.completed", source=source.name, found=len(listings), new=new_count)

            # Trigger pipeline
            from app.tasks.pipeline_tasks import process_listings
            process_listings.delay(str(source.id), str(job.id))

        except Exception as e:
            cb.record_failure()
            job.status = "failed"
            job.errors = {"error": str(e)}
            job.completed_at = datetime.now(timezone.utc)
            source.health_status = "degraded" if cb.state != "OPEN" else "down"
            await db.commit()
            logger.error("crawl.failed", source=source.name, error=str(e), cb_state=cb.state)
            raise
