from sqlalchemy.orm import Session

from app.models.entry import Entry
from app.schemas.entry import EntryCreate, EntryResponse


def create_entry(entry: EntryCreate, db: Session) -> EntryResponse:
    user_id = 1  # temporary

    new_entry = Entry(user_id=user_id, media_id=entry.media_id, rating=entry.rating)

    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)

    entry_response = EntryResponse(
        entry_id=new_entry.id,
        media_name=new_entry.media.name,
        media_type=new_entry.media.type,
        rating=new_entry.rating,
        date_added=new_entry.date_added,
    )

    return entry_response


def get_entries(user_id: int, db: Session) -> list[EntryResponse]:
    entries = db.query(Entry).filter(Entry.user_id == user_id).all()

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
