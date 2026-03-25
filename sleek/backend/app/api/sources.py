from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy import select, desc
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from typing import Optional
import uuid

from app.database import get_db
from app.api.auth import get_current_user
from app.models.user import User
from app.models.source import Source
from app.models.crawl import CrawlJob

router = APIRouter()


class SourceOut(BaseModel):
    id: str
    name: str
    display_name: str
    marketplace: str
    country: str
    base_url: str
    is_active: bool
    crawl_interval_minutes: int
    last_crawl_at: Optional[datetime]
    health_status: str


class CrawlJobOut(BaseModel):
    id: str
    source_id: str
    status: str
    listings_found: int
    listings_new: int
    errors: Optional[dict]
    started_at: Optional[datetime]
    completed_at: Optional[datetime]
    duration_seconds: Optional[float]
    created_at: datetime


@router.get("", response_model=list[SourceOut])
async def list_sources(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Source).order_by(Source.display_name))
    sources = result.scalars().all()
    return [_source_out(s) for s in sources]


@router.get("/{source_id}", response_model=SourceOut)
async def get_source(
    source_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Source).where(Source.id == uuid.UUID(source_id)))
    source = result.scalar_one_or_none()
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    return _source_out(source)


@router.get("/{source_id}/crawls", response_model=list[CrawlJobOut])
async def list_crawls(
    source_id: str,
    limit: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(CrawlJob)
        .where(CrawlJob.source_id == uuid.UUID(source_id))
        .order_by(desc(CrawlJob.created_at))
        .limit(limit)
    )
    crawls = result.scalars().all()
    return [_crawl_out(c) for c in crawls]


@router.post("/{source_id}/crawl")
async def trigger_crawl(
    source_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Source).where(Source.id == uuid.UUID(source_id)))
    source = result.scalar_one_or_none()
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    if not source.is_active:
        raise HTTPException(status_code=400, detail="Source is not active")

    from app.tasks.crawl_tasks import crawl_source
    task = crawl_source.delay(source_id)

    return {"message": "Crawl triggered", "task_id": task.id}


def _source_out(s: Source) -> SourceOut:
    return SourceOut(
        id=str(s.id),
        name=s.name,
        display_name=s.display_name,
        marketplace=s.marketplace,
        country=s.country,
        base_url=s.base_url,
        is_active=s.is_active,
        crawl_interval_minutes=s.crawl_interval_minutes,
        last_crawl_at=s.last_crawl_at,
        health_status=s.health_status,
    )


def _crawl_out(c: CrawlJob) -> CrawlJobOut:
    return CrawlJobOut(
        id=str(c.id),
        source_id=str(c.source_id),
        status=c.status,
        listings_found=c.listings_found or 0,
        listings_new=c.listings_new or 0,
        errors=c.errors,
        started_at=c.started_at,
        completed_at=c.completed_at,
        duration_seconds=c.duration_seconds,
        created_at=c.created_at,
    )
