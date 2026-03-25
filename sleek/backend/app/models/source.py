from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, DateTime, Integer, String, JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class Source(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "sources"

    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    display_name: Mapped[str] = mapped_column(String(200), nullable=False)
    marketplace: Mapped[str] = mapped_column(String(50), nullable=False)
    country: Mapped[str] = mapped_column(String(2), nullable=False)
    base_url: Mapped[str] = mapped_column(String(500), nullable=False)
    connector_class: Mapped[str] = mapped_column(String(200), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    auth_config: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    rate_limit_rpm: Mapped[int] = mapped_column(Integer, default=30)
    crawl_interval_minutes: Mapped[int] = mapped_column(Integer, default=60)
    last_crawl_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    health_status: Mapped[str] = mapped_column(String(20), default="healthy")
