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
from app.models.review import ManualReview

router = APIRouter()


class ReviewOut(BaseModel):
    id: str
    opportunity_id: str
    reason: str
    status: str
    decision_notes: Optional[str]
    decided_by: Optional[str]
    decided_at: Optional[datetime]
    created_at: datetime


class ReviewDecision(BaseModel):
    decision: str  # APPROVED, REJECTED, ESCALATED
    notes: Optional[str] = None


@router.get("", response_model=list[ReviewOut])
async def list_reviews(
    status: Optional[str] = Query("PENDING"),
    limit: int = Query(50, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = select(ManualReview).order_by(desc(ManualReview.created_at)).limit(limit)
    if status:
        query = query.where(ManualReview.status == status)
    result = await db.execute(query)
    reviews = result.scalars().all()
    return [_review_out(r) for r in reviews]


@router.post("/{review_id}/decide", response_model=ReviewOut)
async def decide_review(
    review_id: str,
    decision: ReviewDecision,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(ManualReview).where(ManualReview.id == uuid.UUID(review_id)))
    review = result.scalar_one_or_none()
    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    review.status = decision.decision
    review.decision_notes = decision.notes
    review.decided_by = current_user.id
    review.decided_at = datetime.utcnow()
    await db.commit()
    return _review_out(review)


def _review_out(r: ManualReview) -> ReviewOut:
    return ReviewOut(
        id=str(r.id),
        opportunity_id=str(r.opportunity_id),
        reason=r.reason,
        status=r.status,
        decision_notes=r.decision_notes,
        decided_by=str(r.decided_by) if r.decided_by else None,
        decided_at=r.decided_at,
        created_at=r.created_at,
    )
