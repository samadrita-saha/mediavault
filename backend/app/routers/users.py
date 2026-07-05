from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.user import (
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
)
from app.services.users import login_user as login_user_service
from app.services.users import register_user as register_user_service

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/register", response_model=RegisterResponse)
def register_user(user: RegisterRequest, db: Session = Depends(get_db)):
    return register_user_service(user, db)


@router.post("/login", response_model=LoginResponse)
def login_user(user: LoginRequest, db: Session = Depends(get_db)):
    return login_user_service(user, db)
