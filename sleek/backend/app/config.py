from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://sleek:sleek_dev@db:5432/sleek"

    # Redis
    REDIS_URL: str = "redis://:sleek_redis_dev@localhost:6379/0"

    # Celery
    CELERY_BROKER_URL: str = "redis://:sleek_redis_dev@localhost:6379/0"
    CELERY_RESULT_BACKEND: str = "redis://:sleek_redis_dev@localhost:6379/1"

    # JWT
    SECRET_KEY: str = "change-me-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    # Apify
    APIFY_API_TOKEN: str = ""

    # AI
    ANTHROPIC_API_KEY: str = ""

    # App
    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:5174"

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()
