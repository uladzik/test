import uuid
from datetime import datetime
from decimal import Decimal
from typing import Optional

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, Numeric, String, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class PriceObservation(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "price_observations"

    model_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("product_models.id"), nullable=False)
    source_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("sources.id"), nullable=True)
    price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    currency: Mapped[str] = mapped_column(String(3), default="EUR")
    condition: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    is_sold: Mapped[bool] = mapped_column(Boolean, default=False)
    observed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    listing_url: Mapped[Optional[str]] = mapped_column(String(2000), nullable=True)


class ValuationResult(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "valuation_results"

    normalized_listing_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("normalized_listings.id"), nullable=False)
    model_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("product_models.id"), nullable=True)
    estimated_market_value: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    estimated_resale_value: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    valuation_method: Mapped[str] = mapped_column(String(50), default="HISTORICAL_MEDIAN")
    data_points_used: Mapped[int] = mapped_column(Integer, default=0)
    confidence: Mapped[float] = mapped_column(Float, default=0.5)
    breakdown: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
