"""Create initial admin user."""
import asyncio
import os

from passlib.context import CryptContext
from sqlalchemy import select

from app.database import async_session
from app.models.user import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def seed():
    email = os.getenv("ADMIN_EMAIL", "admin@sleek.local")
    password = os.getenv("ADMIN_PASSWORD", "changeme")

    async with async_session() as db:
        existing = await db.execute(select(User).where(User.email == email))
        if existing.scalar_one_or_none():
            print(f"User {email} already exists. Skipping.")
            return

        user = User(
            email=email,
            name="Admin",
            password_hash=pwd_context.hash(password),
            role="ADMIN",
            is_active=True,
        )
        db.add(user)
        await db.commit()
        print(f"Created admin user: {email}")


if __name__ == "__main__":
    asyncio.run(seed())
