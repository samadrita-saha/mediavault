from fastapi import FastAPI

from app.routers import entries

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Welcome to MediaVault!"}


app.include_router(entries.router)
