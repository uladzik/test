import asyncio
import asyncpg
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def update_hash():
    # 1. Генерируем реальный хэш движком приложения
    real_hash = pwd_context.hash("admin123")
    
    # 2. Подключаемся и перезаписываем заглушку
    conn = await asyncpg.connect("postgresql://ulad@127.0.0.1:5432/postgres")
    await conn.execute("UPDATE user_accounts SET password_hash = $1 WHERE email = 'admin@sleek.local'", real_hash)
    await conn.close()
    print("✅ РЕАЛЬНЫЙ ХЭШ ЗАПИСАН В БАЗУ")

asyncio.run(update_hash())
