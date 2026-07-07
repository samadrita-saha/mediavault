from fastapi import FastAPI
from scalar_fastapi import get_scalar_api_reference

from app.routers import entries, search, users

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Welcome to MediaVault!"}


@app.get("/scalar", include_in_schema=False)
def scalar_root():
    return get_scalar_api_reference(openapi_url=app.openapi_url)


app.include_router(entries.router)
app.include_router(users.router)
app.include_router(search.router)
