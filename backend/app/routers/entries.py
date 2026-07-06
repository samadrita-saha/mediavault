from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_current_user, get_db
from app.models.user import User
from app.schemas.entry import EntryCreate, EntryResponse
from app.services.entries import create_entry as create_entry_service
from app.services.entries import get_entries as get_entries_service

router = APIRouter(prefix="/entries", tags=["Entries"])


@router.post("/", response_model=EntryResponse)
def create_entry(
    entry: EntryCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return create_entry_service(entry, current_user, db)


@router.get("/", response_model=list[EntryResponse])
def get_entries(
    current_user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    return get_entries_service(current_user, db)
