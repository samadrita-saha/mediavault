from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.user import RegisterRequest, RegisterResponse
from app.services.users import register_user as register_user_service

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/register", response_model=RegisterResponse)
def register_user(user: RegisterRequest, db: Session = Depends(get_db)):
    return register_user_service(user, db)
