from datetime import datetime

from pydantic import BaseModel, Field


class EntryCreate(BaseModel):
    media_id: int
    rating: int = Field(ge=1, le=5)


class EntryResponse(BaseModel):
    entry_id: int
    media_name: str
    media_type: str
    rating: int
    date_added: datetime
