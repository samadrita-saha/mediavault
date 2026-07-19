import httpx

from app.config import settings
from app.schemas.media import SearchResponse

GOOGLE_BOOKS_URL = "https://www.googleapis.com/books/v1/volumes"
TMDB_MOVIE_URL = "https://api.themoviedb.org/3/search/movie"
TMDB_TV_URL = "https://api.themoviedb.org/3/search/tv"


def search_media(
    query: str, type: str, limit: int, offset: int
) -> list[SearchResponse]:
    if type == "book":
        return search_google_books(query, limit, offset)
    return search_tmdb(query, type, limit, offset)


def search_google_books(query: str, limit: int, offset: int) -> list[SearchResponse]:
    response = httpx.get(
        GOOGLE_BOOKS_URL, params={"q": query, "key": settings.google_books_api_key}
    )
    response.raise_for_status()
    data = response.json()
    results = []

    for item in data.get("items", [])[offset : offset + limit]:
        volume_info = item.get("volumeInfo", {})

        authors = volume_info.get("authors", [])
        creator = authors[0] if authors else None

        image = volume_info.get("imageLinks", {}).get("thumbnail")

        results.append(
            SearchResponse(
                external_id=item.get("id"),
                source="google_books",
                name=volume_info.get("title"),
                type="book",
                creator=creator,
                image=image,
            )
        )

    return results


def search_tmdb(query: str, type: str, limit: int, offset: int) -> list[SearchResponse]:
    headers = {"Authorization": f"Bearer {settings.tmdb_read_access_token}"}

    if type == "movie":
        url = TMDB_MOVIE_URL
    else:
        url = TMDB_TV_URL

    response = httpx.get(url, params={"query": query}, headers=headers)
    response.raise_for_status()
    data = response.json()
    results = []

    for result in data.get("results", [])[offset : offset + limit]:
        if type == "movie":
            name = result.get("title")

            credits_response = httpx.get(
                f"https://api.themoviedb.org/3/movie/{result['id']}/credits",
                headers=headers,
            )
            credits_response.raise_for_status()

            crew = credits_response.json().get("crew", [])
            director = next(
                (member for member in crew if member.get("job") == "Director"),
                None,
            )
            creator = director.get("name") if director else None

        else:
            name = result.get("name")

            tv_response = httpx.get(
                f"https://api.themoviedb.org/3/tv/{result['id']}",
                headers=headers,
            )
            tv_response.raise_for_status()

            tv_data = tv_response.json()
            created_by = tv_data.get("created_by", [])
            creator = created_by[0].get("name") if created_by else None

        poster = result.get("poster_path")
        image = f"https://image.tmdb.org/t/p/w342{poster}" if poster else None

        results.append(
            SearchResponse(
                external_id=str(result.get("id")),
                source="tmdb",
                name=name,
                type=type,
                creator=creator,
                image=image,
            )
        )

    return results
