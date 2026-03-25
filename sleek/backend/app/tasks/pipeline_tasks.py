import asyncio
import uuid

import structlog
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.tasks.celery_app import celery
from app.config import settings
from app.models.listing import NormalizedListing
from app.models.opportunity import Opportunity
from app.models.source import Source
from app.services.matching import MatchingService
from app.services.valuation import ValuationService
from app.services.scoring import ScoringService

logger = structlog.get_logger()


def _make_session() -> async_sessionmaker[AsyncSession]:
    engine = create_async_engine(settings.DATABASE_URL, pool_size=5, max_overflow=10)
    return async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


def run_async(coro):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        return loop.run_until_complete(coro)
    finally:
        loop.close()


@celery.task(name="app.tasks.pipeline_tasks.process_listings")
def process_listings(source_id: str, crawl_job_id: str):
    run_async(_process_listings(source_id, crawl_job_id))


async def _process_listings(source_id: str, crawl_job_id: str):
    session_factory = _make_session()
    async with session_factory() as db:
        result = await db.execute(select(Source).where(Source.id == uuid.UUID(source_id)))
        source = result.scalar_one_or_none()
        if not source:
            return

        # Get listings that don't already have opportunities
        from sqlalchemy import not_, exists
        opp_exists = (
            select(Opportunity.id)
            .where(Opportunity.normalized_listing_id == NormalizedListing.id)
            .exists()
        )

        result = await db.execute(
            select(NormalizedListing).where(
                NormalizedListing.source_id == uuid.UUID(source_id),
                NormalizedListing.is_duplicate == False,
                NormalizedListing.is_active == True,
                ~opp_exists,
            )
        )
        listings = result.scalars().all()

        if not listings:
            logger.info("pipeline.no_new_listings", source=source.name)
            return

        matcher = MatchingService(db)
        valuator = ValuationService(db)
        scorer = ScoringService(db)

        processed = 0
        for listing in listings:
            try:
                match_result = await matcher.match(listing)
                valuation = await valuator.valuate(listing, match_result.model_id)
                await scorer.score_and_create_opportunity(
                    listing=listing,
                    valuation=valuation,
                    source=source,
                    model_name=match_result.model_name,
                    match_confidence=match_result.confidence,
                )
                processed += 1
            except Exception as e:
                logger.error("pipeline.listing_error", listing_id=str(listing.id), error=str(e))
                continue

        await db.commit()
        logger.info("pipeline.completed", source=source.name, processed=processed, total=len(listings))
