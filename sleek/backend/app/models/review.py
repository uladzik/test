import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class ManualReview(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "manual_reviews"

    opportunity_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("opportunities.id"), nullable=False)
    reason: Mapped[str] = mapped_column(String(200), nullable=False)
    assigned_to: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("user_accounts.id"), nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="PENDING")
    decision_notes: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    decided_by: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("user_accounts.id"), nullable=True)
    decided_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
