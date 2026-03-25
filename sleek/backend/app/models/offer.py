import uuid
from typing import Optional

from sqlalchemy import Boolean, Float, ForeignKey, Integer, String, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class OfferStrategy(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "offer_strategies"

    name: Mapped[str] = mapped_column(String(200), nullable=False)
    source_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("sources.id"), nullable=True)
    model_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("product_models.id"), nullable=True)
    brand_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("brands.id"), nullable=True)
    condition: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    default_offer_pct: Mapped[float] = mapped_column(Float, default=0.65)
    min_offer_pct: Mapped[float] = mapped_column(Float, default=0.50)
    max_offer_pct: Mapped[float] = mapped_column(Float, default=0.80)
    risk_adjustment: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    priority: Mapped[int] = mapped_column(Integer, default=0)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
