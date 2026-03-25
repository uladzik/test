import uuid
from typing import Optional

from sqlalchemy import ForeignKey, String, Text, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class MessageDraft(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "message_drafts"

    opportunity_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("opportunities.id"), nullable=False)
    platform: Mapped[str] = mapped_column(String(50), nullable=False)
    recipient_id: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    subject: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    body: Mapped[str] = mapped_column(Text, nullable=False)
    language: Mapped[str] = mapped_column(String(5), default="de")
    status: Mapped[str] = mapped_column(String(20), default="DRAFT")  # DRAFT, APPROVED, SENT, REJECTED
    template_used: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    ai_generated: Mapped[bool] = mapped_column(default=True)
    extra_data: Mapped[Optional[dict]] = mapped_column("metadata", JSON, nullable=True)
    approved_by: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("user_accounts.id"), nullable=True)
