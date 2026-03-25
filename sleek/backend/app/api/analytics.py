from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.api.auth import get_current_user
from app.models.user import User
from app.models.opportunity import Opportunity
from app.models.source import Source
from app.models.review import ManualReview

router = APIRouter()


class DashboardStats(BaseModel):
    total_opportunities: int
    buy_count: int
    review_count: int
    ignore_count: int
    avg_deal_score: float | None
    avg_margin: float | None
    pending_reviews: int
    active_sources: int


@router.get("/dashboard", response_model=DashboardStats)
async def dashboard_stats(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Total opportunities
    total = (await db.execute(select(func.count(Opportunity.id)))).scalar() or 0

    # By recommendation
    buy = (await db.execute(
        select(func.count(Opportunity.id)).where(Opportunity.recommendation == "BUY")
    )).scalar() or 0
    review = (await db.execute(
        select(func.count(Opportunity.id)).where(Opportunity.recommendation == "REVIEW")
    )).scalar() or 0
    ignore = (await db.execute(
        select(func.count(Opportunity.id)).where(Opportunity.recommendation == "IGNORE")
    )).scalar() or 0

    # Averages
    avg_score = (await db.execute(select(func.avg(Opportunity.deal_score)))).scalar()
    avg_margin = (await db.execute(select(func.avg(Opportunity.expected_margin)))).scalar()

    # Pending reviews
    pending = (await db.execute(
        select(func.count(ManualReview.id)).where(ManualReview.status == "PENDING")
    )).scalar() or 0

    # Active sources
    sources = (await db.execute(
        select(func.count(Source.id)).where(Source.is_active == True)
    )).scalar() or 0

    return DashboardStats(
        total_opportunities=total,
        buy_count=buy,
        review_count=review,
        ignore_count=ignore,
        avg_deal_score=round(float(avg_score), 1) if avg_score else None,
        avg_margin=round(float(avg_margin), 2) if avg_margin else None,
        pending_reviews=pending,
        active_sources=sources,
    )
