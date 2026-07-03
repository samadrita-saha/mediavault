from __future__ import annotations

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Media(Base):
    __tablename__ = "media"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String(255), nullable=False)

    type: Mapped[str] = mapped_column(String(50), nullable=False)

    entry: Mapped[list[Entry]] = relationship(back_populates="media")
