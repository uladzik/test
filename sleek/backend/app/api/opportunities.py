from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy import select, func, desc
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime
from decimal import Decimal
from typing import Optional
import uuid

from app.database import get_db
from app.api.auth import get_current_user
from app.models.user import User
from app.models.opportunity import Opportunity

router = APIRouter()


class OpportunityOut(BaseModel):
    id: str
    platform: str
    listing_title: str
    source_listing_id: str
    url: str
    model_name: Optional[str]
    listed_price: float
    estimated_market_value: Optional[float]
    estimated_resale_value: Optional[float]
    offer_percentage: Optional[float]
    offer_amount: Optional[float]
    expected_margin: Optional[float]
    expected_margin_pct: Optional[float]
    confidence_score: Optional[float]
    risk_score: Optional[float]
    deal_score: Optional[float]
    recommendation: str
    status: str
    created_at: datetime
    updated_at: datetime


class OpportunityListResponse(BaseModel):
    data: list[OpportunityOut]
    meta: dict


class StatusUpdate(BaseModel):
    status: str
    notes: Optional[str] = None


@router.get("", response_model=OpportunityListResponse)
async def list_opportunities(
    recommendation: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    source_id: Optional[str] = Query(None),
    min_deal_score: Optional[float] = Query(None),
    min_margin: Optional[float] = Query(None),
    sort_by: str = Query("deal_score"),
    sort_order: str = Query("desc"),
    page: int = Query(1, ge=1),
    per_page: int = Query(50, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = select(Opportunity)

    if recommendation:
        recommendations = recommendation.split(",")
        query = query.where(Opportunity.recommendation.in_(recommendations))
    if status:
        statuses = status.split(",")
        query = query.where(Opportunity.status.in_(statuses))
    if source_id:
        query = query.where(Opportunity.source_id == uuid.UUID(source_id))
    if min_deal_score is not None:
        query = query.where(Opportunity.deal_score >= min_deal_score)
    if min_margin is not None:
        query = query.where(Opportunity.expected_margin >= min_margin)

    # Count
    count_query = select(func.count()).select_from(query.subquery())
    total = (await db.execute(count_query)).scalar()

    # Sort
    sort_col = getattr(Opportunity, sort_by, Opportunity.deal_score)
    if sort_order == "desc":
        query = query.order_by(desc(sort_col))
    else:
        query = query.order_by(sort_col)

    # Paginate
    query = query.offset((page - 1) * per_page).limit(per_page)
    result = await db.execute(query)
    opportunities = result.scalars().all()

    return OpportunityListResponse(
        data=[_to_out(o) for o in opportunities],
        meta={"total": total, "page": page, "per_page": per_page, "total_pages": (total + per_page - 1) // per_page},
    )


@router.get("/{opportunity_id}", response_model=OpportunityOut)
async def get_opportunity(
    opportunity_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Opportunity).where(Opportunity.id == uuid.UUID(opportunity_id)))
    opp = result.scalar_one_or_none()
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return _to_out(opp)


@router.patch("/{opportunity_id}")
async def update_opportunity(
    opportunity_id: str,
    update: StatusUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Opportunity).where(Opportunity.id == uuid.UUID(opportunity_id)))
    opp = result.scalar_one_or_none()
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    opp.status = update.status
    if update.notes:
        opp.notes = update.notes
    opp.reviewed_by = current_user.id
    opp.reviewed_at = datetime.utcnow()
    await db.commit()
    return _to_out(opp)


@router.post("/{opportunity_id}/approve")
async def approve_opportunity(
    opportunity_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Opportunity).where(Opportunity.id == uuid.UUID(opportunity_id)))
    opp = result.scalar_one_or_none()
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    opp.status = "APPROVED"
    opp.reviewed_by = current_user.id
    opp.reviewed_at = datetime.utcnow()
    await db.commit()
    return _to_out(opp)


@router.post("/{opportunity_id}/reject")
async def reject_opportunity(
    opportunity_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Opportunity).where(Opportunity.id == uuid.UUID(opportunity_id)))
    opp = result.scalar_one_or_none()
    if not opp:
        raise HTTPException(status_code=404, detail="Opportunity not found")

    opp.status = "REJECTED"
    opp.reviewed_by = current_user.id
    opp.reviewed_at = datetime.utcnow()
    await db.commit()
    return _to_out(opp)


def _to_out(o: Opportunity) -> OpportunityOut:
    return OpportunityOut(
        id=str(o.id),
        platform=o.platform,
        listing_title=o.listing_title,
        source_listing_id=o.source_listing_id,
        url=o.url,
        model_name=o.model_name,
        listed_price=float(o.listed_price),
        estimated_market_value=float(o.estimated_market_value) if o.estimated_market_value else None,
        estimated_resale_value=float(o.estimated_resale_value) if o.estimated_resale_value else None,
        offer_percentage=o.offer_percentage,
        offer_amount=float(o.offer_amount) if o.offer_amount else None,
        expected_margin=float(o.expected_margin) if o.expected_margin else None,
        expected_margin_pct=o.expected_margin_pct,
        confidence_score=o.confidence_score,
        risk_score=o.risk_score,
        deal_score=o.deal_score,
        recommendation=o.recommendation,
        status=o.status,
        created_at=o.created_at,
        updated_at=o.updated_at,
    )
