import httpx

from app.config import settings
from app.schemas.media import SearchResponse

GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes"
TMDB_MOVIE_URL = "https://api.themoviedb.org/3/search/movie"
TMDB_TV_URL = "https://api.themoviedb.org/3/search/tv"


def search_media(query: str, type: str) -> list[SearchResponse]:
    if type == "book":
        return search_google_books(query)
    return search_tmdb(query, type)


def search_google_books(query: str) -> list[SearchResponse]:
    response = httpx.get(
        GOOGLE_BOOKS_URL, params={"q": query, "key": settings.google_books_api_key}
    )
    response.raise_for_status()
    data = response.json()
    results = []

    for item in data.get("items", []):
        results.append(
            SearchResponse(
                external_id=item.get("id"),
                source="google_books",
                name=item.get("volumeInfo", {}).get("title"),
                type="book",
            )
        )

    return results


def search_tmdb(query: str, type: str) -> list[SearchResponse]:
    headers = {"Authorization": f"Bearer {settings.tmdb_read_access_token}"}

    if type == "movie":
        url = TMDB_MOVIE_URL
    else:
        url = TMDB_TV_URL

    response = httpx.get(url, params={"query": query}, headers=headers)
    response.raise_for_status()
    data = response.json()
    results = []

    for result in data.get("results", []):
        if type == "movie":
            name = result.get("title")
        else:
            name = result.get("name")
        results.append(
            SearchResponse(
                external_id=str(result.get("id")),
                source="tmdb",
                name=name,
                type=type,
            )
        )

    return results
