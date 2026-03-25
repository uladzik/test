from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.api.router import api_router
from app.api.middleware import SecurityMiddleware

app = FastAPI(
    title="SLEEK - Deal Intelligence Platform",
    description="Monitor second-hand marketplaces for underpriced deals",
    version="0.1.0",
    docs_url="/api/docs" if settings.ENVIRONMENT == "development" else None,
    redoc_url="/api/redoc" if settings.ENVIRONMENT == "development" else None,
)

# Security middleware (first in chain)
app.add_middleware(SecurityMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

app.include_router(api_router, prefix="/api")


@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "sleek"}
