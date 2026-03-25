import sys, os
sys.path.insert(0, os.getcwd())
try:
    from app.db.session import SessionLocal
    from app.models.user import User
    from app.core.security import get_password_hash
    
    db = SessionLocal()
    if not db.query(User).filter_by(email='admin@sleek.local').first():
        db.add(User(email='admin@sleek.local', hashed_password=get_password_hash('admin123'), is_active=True, is_superuser=True))
        db.commit()
        print("✅ АДМИН СОЗДАН")
    else:
        print("✅ АДМИН УЖЕ СУЩЕСТВУЕТ")
except Exception as e:
    print(f"Критическая ошибка: {e}")
