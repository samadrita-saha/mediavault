from __future__ import annotations

from sqlalchemy import String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.elements import True_

from app.database.base import Base


class Media(Base):
    __tablename__ = "media"

    __table_args__ = (UniqueConstraint("external_id", "source"),)

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String(255), nullable=False)

    type: Mapped[str] = mapped_column(String(50), nullable=False)

    external_id: Mapped[str] = mapped_column(String(255), nullable=False)

    source: Mapped[str] = mapped_column(String(50), nullable=False)

    creator: Mapped[str] = mapped_column(String(255), nullable=True)

    image: Mapped[str] = mapped_column(String(255), nullable=True)

    entries: Mapped[list[Entry]] = relationship(back_populates="media")
