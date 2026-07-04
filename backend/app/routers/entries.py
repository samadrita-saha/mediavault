from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.entry import EntryCreate, EntryResponse
from app.services.entries import create_entry as create_entry_service
from app.services.entries import get_entries as get_entries_service

router = APIRouter(prefix="/entries", tags=["Entries"])


@router.post("/", response_model=EntryResponse)
def create_entry(entry: EntryCreate, db: Session = Depends(get_db)):
    return create_entry_service(entry, db)


@router.get("/", response_model=list[EntryResponse])
def get_entries(db: Session = Depends(get_db)):
    user_id = 1  # temporary
    return get_entries_service(user_id, db)
