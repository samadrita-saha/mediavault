from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.auth.hashing import hash_password, verify_password
from app.auth.jwt import create_access_token
from app.models.user import User
from app.schemas.user import (
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
)


def register_user(user: RegisterRequest, db: Session) -> RegisterResponse:
    existing_user = db.scalar(select(User).where(User.username == user.username))
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    existing_email = db.scalar(select(User).where(User.email == user.email))
    if existing_email:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = hash_password(user.password)
    new_user = User(username=user.username, email=user.email, password=hashed_password)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return RegisterResponse(
        id=new_user.id, username=new_user.username, email=new_user.email
    )


def login_user(user: LoginRequest, db: Session) -> LoginResponse:
    user_db = db.scalar(select(User).where(User.username == user.username))
    if user_db is None or not verify_password(user.password, user_db.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": str(user_db.id)})

    return LoginResponse(access_token=access_token, token_type="bearer")
