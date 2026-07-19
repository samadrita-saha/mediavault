from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.entry import Entry
from app.models.media import Media
from app.models.user import User
from app.schemas.entry import EntryCreate, EntryResponse


def create_entry(entry: EntryCreate, current_user: User, db: Session) -> EntryResponse:
    media = db.scalar(
        select(Media).where(
            Media.external_id == entry.external_id, Media.source == entry.source
        )
    )

    if media is None:
        media = Media(
            name=entry.name,
            type=entry.type,
            external_id=entry.external_id,
            source=entry.source,
            creator=entry.creator,
            image=entry.image,
        )

        db.add(media)
        db.flush()

    new_entry = Entry(user_id=current_user.id, media_id=media.id, rating=entry.rating)

    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)

    return EntryResponse(
        entry_id=new_entry.id,
        media_name=media.name,
        media_type=media.type,
        rating=new_entry.rating,
        date_added=new_entry.date_added,
    )


def get_entries(current_user: User, db: Session) -> list[EntryResponse]:
    entries = db.scalars(select(Entry).where(Entry.user_id == current_user.id)).all()

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
