from __future__ import annotations

from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)

    username: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)

    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)

    password: Mapped[str] = mapped_column(String(255), nullable=False)

    entries: Mapped[list[Entry]] = relationship(back_populates="user")
