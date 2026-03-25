from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db

router = APIRouter()


@router.get("")
async def health():
    return {"status": "ok"}


@router.get("/detailed")
async def health_detailed(db: AsyncSession = Depends(get_db)):
    checks = {}

    # Database check
    try:
        await db.execute(text("SELECT 1"))
        checks["database"] = "ok"
    except Exception as e:
        checks["database"] = f"error: {str(e)}"

    # Redis check
    try:
        from redis.asyncio import from_url
        from app.config import settings
        r = await from_url(settings.REDIS_URL)
        await r.ping()
        checks["redis"] = "ok"
        await r.close()
    except Exception as e:
        checks["redis"] = f"error: {str(e)}"

    all_ok = all(v == "ok" for v in checks.values())
    return {"status": "ok" if all_ok else "degraded", "checks": checks}
