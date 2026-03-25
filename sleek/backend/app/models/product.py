import uuid
from decimal import Decimal
from typing import Optional

from sqlalchemy import Boolean, Float, ForeignKey, Integer, Numeric, String, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base
from app.models.base import UUIDMixin, TimestampMixin


class Brand(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "brands"

    name: Mapped[str] = mapped_column(String(200), unique=True, nullable=False)
    slug: Mapped[str] = mapped_column(String(200), unique=True, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    config: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)


class ProductCategory(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "product_categories"

    brand_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("brands.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    slug: Mapped[str] = mapped_column(String(200), nullable=False)
    parent_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("product_categories.id"), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)


class ProductModel(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "product_models"

    brand_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("brands.id"), nullable=False)
    category_id: Mapped[Optional[uuid.UUID]] = mapped_column(UUID(as_uuid=True), ForeignKey("product_categories.id"), nullable=True)
    name: Mapped[str] = mapped_column(String(300), nullable=False)
    slug: Mapped[str] = mapped_column(String(300), nullable=False)
    sku: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    retail_price: Mapped[Optional[Decimal]] = mapped_column(Numeric(10, 2), nullable=True)
    retail_currency: Mapped[str] = mapped_column(String(3), default="EUR")
    year_released: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    is_discontinued: Mapped[bool] = mapped_column(Boolean, default=False)
    popularity_tier: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    resale_factor: Mapped[float] = mapped_column(Float, default=0.85)
    config: Mapped[Optional[dict]] = mapped_column(JSON, nullable=True)


class ProductAlias(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "product_aliases"

    model_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("product_models.id"), nullable=False)
    alias: Mapped[str] = mapped_column(String(300), nullable=False)
    alias_type: Mapped[str] = mapped_column(String(50), default="NAME")
