from fastapi import APIRouter

from app.api.health import router as health_router
from app.api.auth import router as auth_router
from app.api.opportunities import router as opportunities_router
from app.api.sources import router as sources_router
from app.api.reviews import router as reviews_router
from app.api.offers import router as offers_router
from app.api.products import router as products_router
from app.api.analytics import router as analytics_router

api_router = APIRouter()

api_router.include_router(health_router, prefix="/health", tags=["health"])
api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(opportunities_router, prefix="/opportunities", tags=["opportunities"])
api_router.include_router(sources_router, prefix="/sources", tags=["sources"])
api_router.include_router(reviews_router, prefix="/reviews", tags=["reviews"])
api_router.include_router(offers_router, prefix="/offers", tags=["offers"])
api_router.include_router(products_router, prefix="/products", tags=["products"])
api_router.include_router(analytics_router, prefix="/analytics", tags=["analytics"])
