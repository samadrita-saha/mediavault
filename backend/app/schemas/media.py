from pydantic import BaseModel


class SearchResponse(BaseModel):
    external_id: str
    source: str
    name: str
    type: str
