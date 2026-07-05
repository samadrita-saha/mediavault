from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.auth.hashing import hash_password
from app.models.user import User
from app.schemas.user import RegisterRequest, RegisterResponse


def register_user(user: RegisterRequest, db: Session) -> RegisterResponse:
    existing_user = db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    existing_email = db.query(User).filter(User.email == user.email).first()
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
