![Python](https://img.shields.io/badge/Python-3.13-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.139-009688)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791)
![GitHub](https://img.shields.io/badge/GitHub-Repository-black?logo=github)
![License](https://img.shields.io/badge/License-MIT-green)

# MediaVault

MediaVault is a full-stack web application for tracking books, movies, and TV shows. Inspired by platforms like Goodreads and Letterboxd, it provides a single place to discover, rate, and organize your favorite media. Users can search media using the TMDB and Google Books APIs, rate items, and maintain a personal library with secure JWT-based authentication.

**Live Demo:** <https://app-mediavault.fastapicloud.dev/>

---

## Features

- Search books, movies, and TV shows
- Build a personal media library
- Rate media on a 1–5 star scale
- Prevent duplicate entries automatically
- Secure JWT-based authentication
- Responsive interface built with React
- Production deployment using Docker and FastAPI Cloud

---

## Screenshots

### Landing Page

![Landing Page](assets/landing.jpg)

### Dashboard

![Dashboard](assets/dashboard.jpg)

### Search

![Search](assets/search.jpg)

### Rating

![Rating](assets/rating.jpg)

---

## Tech Stack

| Layer          | Technology                                                    |
| -------------- | ------------------------------------------------------------- |
| Frontend       | React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui           |
| Backend        | FastAPI, Python 3.13                                          |
| Database       | PostgreSQL 17, SQLAlchemy                                     |
| Authentication | JWT, Argon2                                                   |
| Migrations     | Alembic                                                       |
| External APIs  | TMDB, Google Books API                                        |
| Deployment     | Docker, FastAPI Cloud (Application), Supabase (PostgreSQL DB) |

---

## Architecture

```mermaid
flowchart LR

Browser --> React["React Frontend (served by FastAPI)"]
React --> API["FastAPI REST API"]

API --> DB[("Supabase PostgreSQL")]
API --> TMDB["TMDB API"]
API --> Books["Google Books API"]
```

---

## Project Structure

```text
mediavault/
├── backend/
│   ├── app/
│   │   ├── auth/          # Authentication (JWT, password hashing)
│   │   ├── database/      # Database configuration and session
│   │   ├── models/        # SQLAlchemy models
│   │   ├── routers/       # API endpoints
│   │   ├── schemas/       # Pydantic models
│   │   ├── services/      # Business logic
│   │   ├── static/        # Production React build
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   └── main.py
│   ├── alembic/           # Database migrations
│   ├── Dockerfile
│   └── pyproject.toml
│
├── frontend/
│   ├── src/               # React application
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
├── .env.example
├── LICENSE
└── README.md
```

---

## Quick Start

### Prerequisites

- Docker
- TMDB Read Access Token
- Google Books API Key

### Environment Variables

Create a `.env` file in the project root.

```env
POSTGRES_USER=mediavault
POSTGRES_PASSWORD=your_password
POSTGRES_DB=mediavault
POSTGRES_PORT=5432

DATABASE_URL=postgres+psycopg://mediavault:your_password@postgres:5432/mediavault

SECRET_KEY=your_secret_key

TMDB_READ_ACCESS_TOKEN=your_tmdb_token
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

### Run

```bash
docker compose up --build
```

Run database migrations:

```bash
docker compose exec backend alembic upgrade head
```

Application URLs:

| Service     | URL                          |
| ----------- | ---------------------------- |
| Application | http://localhost:8000        |
| API Docs    | http://localhost:8000/scalar |

---

## REST API

### Authentication

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | `/users/register` |
| POST   | `/users/login`    |

---

### Search

| Method | Endpoint  |
| ------ | --------- |
| GET    | `/search` |

Query Parameters

| Name   | Description              |
| ------ | ------------------------ |
| query  | Search term              |
| type   | `movie`, `tv`, or `book` |
| limit  | Optional                 |
| offset | Optional                 |

---

### Entries

Requires

```
Authorization: Bearer <JWT>
```

| Method | Endpoint   |
| ------ | ---------- |
| GET    | `/entries` |
| POST   | `/entries` |

Example Request

```json
{
  "external_id": "12345",
  "source": "tmdb",
  "name": "Inception",
  "type": "movie",
  "creator": "Christopher Nolan",
  "image": "...",
  "rating": 5
}
```

---

## Database Design

### User

- id
- username
- email
- password

### Media

- id
- external_id
- source
- name
- type
- creator
- image

Unique Constraint

```
(external_id, source)
```

### Entry

- id
- user_id
- media_id
- rating
- date_added

Unique Constraint

```
(user_id, media_id)
```

---

## Deployment

MediaVault is deployed on FastAPI Cloud using Docker containers.

The production application serves the React frontend directly from FastAPI, while PostgreSQL is hosted on Supabase.

**Live Demo:** <https://app-mediavault.fastapicloud.dev/>

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
