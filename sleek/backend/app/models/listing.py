import uuid
from datetime import datetime
from decimal import Decimal
from typing import Optional

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, Numeric, String, Text, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class RawListing(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "raw_listings"

    source_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("sources.id"), nullable=False)
    crawl_job_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("crawl_jobs.id"), nullable=False)
    source_listing_id: Mapped[str] = mapped_column(String(200), nullable=False)
    url: Mapped[str] = mapped_column(String(2000), nullable=False)
    raw_payload: Mapped[dict] = mapped_column(JSON, nullable=False)
    snapshot_path: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    fetched_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)


class NormalizedListing(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "normalized_listings"

    raw_listing_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("raw_listings.id"), nullable=False)
    source_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("sources.id"), nullable=False)
    source_listing_id: Mapped[str] = mapped_column(String(200), nullable=False)
    url: Mapped[str] = mapped_column(String(2000), nullable=False)
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    listed_price: Mapped[Decimal] = mapped_column(Numeric(10, 2), nullable=False)
    currency: Mapped[str] = mapped_column(String(3), default="EUR")
    original_price: Mapped[Optional[Decimal]] = mapped_column(Numeric(10, 2), nullable=True)
    original_currency: Mapped[Optional[str]] = mapped_column(String(3), nullable=True)
    condition: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    brand_raw: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    model_raw: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    category_raw: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    color: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    size: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    country: Mapped[Optional[str]] = mapped_column(String(2), nullable=True)
    city: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    seller_id: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    seller_rating: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    image_count: Mapped[int] = mapped_column(Integer, default=0)
    listing_created_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_duplicate: Mapped[bool] = mapped_column(Boolean, default=False)
    duplicate_of_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("normalized_listings.id"), nullable=True)
    matched_model_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("product_models.id"), nullable=True)
    match_confidence: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    data_quality_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)


class ListingImage(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "listing_images"

    normalized_listing_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("normalized_listings.id"), nullable=False)
    source_url: Mapped[str] = mapped_column(String(2000), nullable=False)
    stored_path: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    position: Mapped[int] = mapped_column(Integer, default=1)
    quality_score: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    analysis_result: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
