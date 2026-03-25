import uuid
from typing import Optional

from sqlalchemy import Boolean, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class Alert(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "alerts"

    type: Mapped[str] = mapped_column(String(50), nullable=False)
    severity: Mapped[str] = mapped_column(String(20), default="INFO")
    title: Mapped[str] = mapped_column(String(300), nullable=False)
    message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    opportunity_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("opportunities.id"), nullable=True)
    source_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("sources.id"), nullable=True)
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    is_sent: Mapped[bool] = mapped_column(Boolean, default=False)
    channel: Mapped[str] = mapped_column(String(20), default="DASHBOARD")
