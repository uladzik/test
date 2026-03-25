from celery import Celery
from celery.schedules import crontab

from app.config import settings

celery = Celery("sleek")

celery.conf.update(
    broker_url=settings.CELERY_BROKER_URL,
    result_backend=settings.CELERY_RESULT_BACKEND,
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Europe/Berlin",
    task_track_started=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
    task_reject_on_worker_lost=True,
    task_default_queue="default",
    task_routes={
        "app.tasks.crawl_tasks.*": {"queue": "crawl"},
        "app.tasks.pipeline_tasks.*": {"queue": "pipeline"},
    },
)

celery.conf.beat_schedule = {
    "trigger-crawls-every-5-min": {
        "task": "app.tasks.crawl_tasks.trigger_scheduled_crawls",
        "schedule": crontab(minute="*/5"),
    },
}

# Explicitly import tasks so Celery registers them
import app.tasks.crawl_tasks  # noqa: F401, E402
import app.tasks.pipeline_tasks  # noqa: F401, E402
