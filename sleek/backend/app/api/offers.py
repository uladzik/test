from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
import uuid

from app.database import get_db
from app.api.auth import get_current_user
from app.models.user import User
from app.models.offer import OfferStrategy

router = APIRouter()


class StrategyOut(BaseModel):
    id: str
    name: str
    source_id: Optional[str]
    model_id: Optional[str]
    brand_id: Optional[str]
    condition: Optional[str]
    default_offer_pct: float
    min_offer_pct: float
    max_offer_pct: float
    priority: int
    is_active: bool


class StrategyCreate(BaseModel):
    name: str
    source_id: Optional[str] = None
    model_id: Optional[str] = None
    brand_id: Optional[str] = None
    condition: Optional[str] = None
    default_offer_pct: float = 0.65
    min_offer_pct: float = 0.50
    max_offer_pct: float = 0.80
    priority: int = 0


class StrategyUpdate(BaseModel):
    name: Optional[str] = None
    default_offer_pct: Optional[float] = None
    min_offer_pct: Optional[float] = None
    max_offer_pct: Optional[float] = None
    priority: Optional[int] = None
    is_active: Optional[bool] = None


class SimulateRequest(BaseModel):
    listed_price: float
    condition: str = "GOOD"
    source_id: Optional[str] = None
    model_id: Optional[str] = None


class SimulateResponse(BaseModel):
    listed_price: float
    offer_percentage: float
    offer_amount: float
    estimated_margin: float


@router.get("/strategies", response_model=list[StrategyOut])
async def list_strategies(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(OfferStrategy).order_by(OfferStrategy.priority.desc()))
    strategies = result.scalars().all()
    return [_strategy_out(s) for s in strategies]


@router.post("/strategies", response_model=StrategyOut)
async def create_strategy(
    data: StrategyCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    strategy = OfferStrategy(
        name=data.name,
        source_id=uuid.UUID(data.source_id) if data.source_id else None,
        model_id=uuid.UUID(data.model_id) if data.model_id else None,
        brand_id=uuid.UUID(data.brand_id) if data.brand_id else None,
        condition=data.condition,
        default_offer_pct=data.default_offer_pct,
        min_offer_pct=data.min_offer_pct,
        max_offer_pct=data.max_offer_pct,
        priority=data.priority,
    )
    db.add(strategy)
    await db.commit()
    await db.refresh(strategy)
    return _strategy_out(strategy)


@router.put("/strategies/{strategy_id}", response_model=StrategyOut)
async def update_strategy(
    strategy_id: str,
    data: StrategyUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(OfferStrategy).where(OfferStrategy.id == uuid.UUID(strategy_id)))
    strategy = result.scalar_one_or_none()
    if not strategy:
        raise HTTPException(status_code=404, detail="Strategy not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(strategy, field, value)
    await db.commit()
    await db.refresh(strategy)
    return _strategy_out(strategy)


@router.delete("/strategies/{strategy_id}", status_code=204)
async def delete_strategy(
    strategy_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(OfferStrategy).where(OfferStrategy.id == uuid.UUID(strategy_id)))
    strategy = result.scalar_one_or_none()
    if not strategy:
        raise HTTPException(status_code=404, detail="Strategy not found")
    await db.delete(strategy)
    await db.commit()


@router.post("/simulate", response_model=SimulateResponse)
async def simulate_offer(
    data: SimulateRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    from app.core.formulas import calculate_offer

    # Use default strategy for simulation
    offer_pct = 0.65
    condition_adj = {"NEW": 0.05, "LIKE_NEW": 0.02, "GOOD": 0.0, "FAIR": -0.05, "POOR": -0.10}.get(data.condition, 0.0)

    from decimal import Decimal
    offer_amount = calculate_offer(
        listed_price=Decimal(str(data.listed_price)),
        offer_pct=offer_pct,
        condition_adjustment=condition_adj,
        risk_adjustment=0.0,
        min_offer_pct=0.50,
        max_offer_pct=0.80,
    )

    return SimulateResponse(
        listed_price=data.listed_price,
        offer_percentage=offer_pct + condition_adj,
        offer_amount=float(offer_amount),
        estimated_margin=data.listed_price - float(offer_amount),
    )


def _strategy_out(s: OfferStrategy) -> StrategyOut:
    return StrategyOut(
        id=str(s.id),
        name=s.name,
        source_id=str(s.source_id) if s.source_id else None,
        model_id=str(s.model_id) if s.model_id else None,
        brand_id=str(s.brand_id) if s.brand_id else None,
        condition=s.condition,
        default_offer_pct=s.default_offer_pct,
        min_offer_pct=s.min_offer_pct,
        max_offer_pct=s.max_offer_pct,
        priority=s.priority,
        is_active=s.is_active,
    )
