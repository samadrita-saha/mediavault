from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scalar_fastapi import get_scalar_api_reference

from app.routers import entries, search, users

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

STATIC_DIR = Path(__file__).parent / "static"


@app.get("/scalar", include_in_schema=False)
def scalar_root():
    return get_scalar_api_reference(openapi_url=app.openapi_url)


app.include_router(entries.router)
app.include_router(users.router)
app.include_router(search.router)

app.frontend("/", directory=STATIC_DIR)
