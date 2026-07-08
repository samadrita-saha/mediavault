# MediaVault

A personal media tracking application where users can search for movies, TV shows, and books using TMDB and Google Books, add ratings, and maintain a personal media library. Selected media is stored locally in PostgreSQL for efficient retrieval.

## Overview

```mermaid
flowchart LR
    User[Client]
    API[FastAPI Backend]
    DB[(PostgreSQL)]
    TMDB[TMDB]
    Books[Google Books]

    User -->|Register / Login| API
    API --> DB
    API -->|JWT| User

    User -->|Search| API
    API --> TMDB
    API --> Books

    User -->|Add rating / View entries| API
```

## Features

- User registration and JWT authentication
- Search movies and TV shows via TMDB
- Search books via Google Books
- Store media metadata locally
- Add ratings to media entries
- Retrieve your personal media library

## Tech Stack

- **Framework:** FastAPI
- **Database:** PostgreSQL
- **Auth:** JWT tokens with Argon2 password hashing
- **Migrations:** Alembic
- **External APIs:** TMDB (movies/TV), Google Books API

## Setup

### Prerequisites

- Python 3.13
- PostgreSQL (via Docker or local install)
- TMDB read access token
- Google Books API key

### Environment

Create `backend/.env`:

```env
DATABASE_URL=postgresql+psycopg://mediavault:password@localhost:5432/mediavault
SECRET_KEY=<random-secret>
TMDB_READ_ACCESS_TOKEN=<your-token>
GOOGLE_BOOKS_API_KEY=<your-key>
```

### Run

```bash
# Start the database
docker compose up -d

# Install dependencies
cd backend
uv sync

# Run migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload
```

The API is available at `http://localhost:8000`. Interactive API documentation is available at `http://localhost:8000/scalar`.

## API Endpoints

### Users

| Method | Path | Description |
|--------|------|-------------|
| POST | `/users/register` | Create an account |
| POST | `/users/login` | Login and get a JWT token |

### Search

| Method | Path | Description |
|--------|------|-------------|
| GET | `/search/?query={q}&type={movie/tv/book}` | Search TMDB or Google Books |

### Entries (authenticated)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/entries/` | List your entries |
| POST | `/entries/` | Add an entry with a rating (1-5) |

All entry endpoints require a `Bearer <token>` Authorization header.


## Project Structure

```
mediavault/
├── backend/
│   ├── app/
│   │   ├── auth/          # JWT and password hashing
│   │   ├── database/      # DB engine, session, declarative base
│   │   ├── models/        # SQLAlchemy models
│   │   ├── routers/       # FastAPI route handlers
│   │   ├── schemas/       # Pydantic request/response models
│   │   ├── services/      # Business logic
│   │   ├── config.py      # Application settings
│   │   ├── dependencies.py# Shared dependencies
│   │   └── main.py        # FastAPI app entry point
│   ├── alembic/           # Database migrations
│   └── pyproject.toml
├── frontend/              # TODO
└── docker-compose.yml
