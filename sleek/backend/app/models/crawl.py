import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class CrawlJob(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "crawl_jobs"

    source_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("sources.id"), nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="pending")
    search_params: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    listings_found: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    listings_new: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    listings_updated: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    errors: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    started_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    duration_seconds: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
