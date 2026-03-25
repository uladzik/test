from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, DateTime, String
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class User(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "user_accounts"

    email: Mapped[str] = mapped_column(String(300), unique=True, nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    password_hash: Mapped[str] = mapped_column(String(500), nullable=False)
    role: Mapped[str] = mapped_column(String(20), default="OPERATOR")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    last_login_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
