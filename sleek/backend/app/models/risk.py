import uuid
from typing import Optional

from sqlalchemy import Float, ForeignKey, String, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class RiskAssessment(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "risk_assessments"

    normalized_listing_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("normalized_listings.id"), nullable=False)
    counterfeit_risk: Mapped[float] = mapped_column(Float, default=0.0)
    condition_risk: Mapped[float] = mapped_column(Float, default=0.0)
    seller_risk: Mapped[float] = mapped_column(Float, default=0.0)
    data_quality_risk: Mapped[float] = mapped_column(Float, default=0.0)
    overall_risk_score: Mapped[float] = mapped_column(Float, default=0.0)
    risk_factors: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)
    recommendation: Mapped[str] = mapped_column(String(20), default="SAFE")
