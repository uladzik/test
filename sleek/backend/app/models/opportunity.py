import uuid
from datetime import datetime
from decimal import Decimal
from typing import Optional

from sqlalchemy import DateTime, Float, ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class Opportunity(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "opportunities"

    normalized_listing_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("normalized_listings.id"), nullable=False)
    source_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("sources.id"), nullable=False)
    model_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("product_models.id"), nullable=True)
    valuation_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("valuation_results.id"), nullable=True)
    risk_assessment_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("risk_assessments.id"), nullable=True)
    offer_strategy_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("offer_strategies.id"), nullable=True)

    # Denormalized for fast queries
    platform: Mapped[str] = mapped_column(String(50), nullable=False)
    listing_title: Mapped[str] = mapped_column(String(500), nullable=False)
    source_listing_id: Mapped[str] = mapped_column(String(200), nullable=False)
    url: Mapped[str] = mapped_column(String(2000), nullable=False)
    model_name: Mapped[Optional[str]] = mapped_column(String(300), nullable=True)

    # Pricing
    listed_price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    estimated_market_value: Mapped[Optional[Decimal]] = mapped_column(Numeric(10, 2), nullable=True)
    estimated_resale_value: Mapped[Optional[Decimal]] = mapped_column(Numeric(10, 2), nullable=True)
    offer_percentage: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    offer_amount: Mapped[Optional[Decimal]] = mapped_column(Numeric(10, 2), nullable=True)
    expected_margin: Mapped[Optional[Decimal]] = mapped_column(Numeric(10, 2), nullable=True)
    expected_margin_pct: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    # Scores
    confidence_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    risk_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    deal_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)

    # Decision
    recommendation: Mapped[str] = mapped_column(String(20), default="REVIEW")
    status: Mapped[str] = mapped_column(String(20), default="NEW")

    # Review
    reviewed_by: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("user_accounts.id"), nullable=True)
    reviewed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
