from typing import Literal

from fastapi import APIRouter

from app.schemas.media import SearchResponse
from app.services.search import search_media as search_media_service

router = APIRouter(prefix="/search", tags=["Search"])


@router.get("/", response_model=list[SearchResponse])
def search_media(
    query: str, type: Literal["book", "movie", "tv"], limit: int = 5, offset: int = 0
):
    return search_media_service(query, type, limit, offset)
