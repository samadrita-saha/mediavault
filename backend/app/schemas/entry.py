from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field


class MediaSource(str, Enum):
    TMDB = "tmdb"
    GOOGLE_BOOKS = "google_books"


class MediaType(str, Enum):
    BOOK = "book"
    TV = "tv"
    MOVIE = "movie"


class EntryCreate(BaseModel):
    external_id: str
    source: MediaSource
    name: str
    type: MediaType
    creator: str | None = None
    image: str | None = None
    rating: int = Field(ge=1, le=5)


class EntryResponse(BaseModel):
    entry_id: int
    media_name: str
    media_type: str
    rating: int
    date_added: datetime
