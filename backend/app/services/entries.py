from sqlalchemy.orm import Session

from app.models.entry import Entry
from app.models.user import User
from app.schemas.entry import EntryCreate, EntryResponse


def create_entry(entry: EntryCreate, current_user: User, db: Session) -> EntryResponse:
    new_entry = Entry(
        user_id=current_user.id, media_id=entry.media_id, rating=entry.rating
    )

    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)

    return EntryResponse(
        entry_id=new_entry.id,
        media_name=new_entry.media.name,
        media_type=new_entry.media.type,
        rating=new_entry.rating,
        date_added=new_entry.date_added,
    )


def get_entries(current_user: User, db: Session) -> list[EntryResponse]:
    entries = db.query(Entry).filter(Entry.user_id == current_user.id).all()

    responses = []
    for entry in entries:
        responses.append(
            EntryResponse(
                entry_id=entry.id,
                media_name=entry.media.name,
                media_type=entry.media.type,
                rating=entry.rating,
                date_added=entry.date_added,
            )
        )

    return responses
