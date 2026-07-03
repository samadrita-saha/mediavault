from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.sqltypes import DateTime

from app.database.base import Base


class Entry(Base):
    __tablename__ = "entries"

    __table_args__ = UniqueConstraint("user_id", "media_id")

    id: Mapped[int] = mapped_column(primary_key=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)

    media_id: Mapped[int] = mapped_column(ForeignKey("media.id"), nullable=False)

    rating: Mapped[int] = mapped_column(nullable=False)

    date_added: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )

    user: Mapped[User] = relationship(back_populates="entries")

    media: Mapped[Media] = relationship(back_populates="entries")
