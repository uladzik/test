from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
import uuid

from app.database import get_db
from app.api.auth import get_current_user
from app.models.user import User
from app.models.product import Brand, ProductModel, ProductAlias

router = APIRouter()


class BrandOut(BaseModel):
    id: str
    name: str
    slug: str
    is_active: bool


class ModelOut(BaseModel):
    id: str
    brand_id: str
    name: str
    slug: str
    retail_price: Optional[float]
    popularity_tier: Optional[str]
    aliases: list[str]


@router.get("/brands", response_model=list[BrandOut])
async def list_brands(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Brand).where(Brand.is_active == True).order_by(Brand.name))
    brands = result.scalars().all()
    return [BrandOut(id=str(b.id), name=b.name, slug=b.slug, is_active=b.is_active) for b in brands]


@router.get("/brands/{brand_id}/models", response_model=list[ModelOut])
async def list_models(
    brand_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(ProductModel).where(ProductModel.brand_id == uuid.UUID(brand_id)).order_by(ProductModel.name)
    )
    models = result.scalars().all()

    out = []
    for m in models:
        alias_result = await db.execute(select(ProductAlias.alias).where(ProductAlias.model_id == m.id))
        aliases = [a for a in alias_result.scalars().all()]
        out.append(ModelOut(
            id=str(m.id),
            brand_id=str(m.brand_id),
            name=m.name,
            slug=m.slug,
            retail_price=float(m.retail_price) if m.retail_price else None,
            popularity_tier=m.popularity_tier,
            aliases=aliases,
        ))
    return out


@router.get("/models/{model_id}", response_model=ModelOut)
async def get_model(
    model_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(ProductModel).where(ProductModel.id == uuid.UUID(model_id)))
    model = result.scalar_one_or_none()
    if not model:
        raise HTTPException(status_code=404, detail="Model not found")

    alias_result = await db.execute(select(ProductAlias.alias).where(ProductAlias.model_id == model.id))
    aliases = [a for a in alias_result.scalars().all()]

    return ModelOut(
        id=str(model.id),
        brand_id=str(model.brand_id),
        name=model.name,
        slug=model.slug,
        retail_price=float(model.retail_price) if model.retail_price else None,
        popularity_tier=model.popularity_tier,
        aliases=aliases,
    )
