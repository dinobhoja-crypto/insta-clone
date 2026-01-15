from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .auth import router as auth_router
from .database import init_db
from .posts import router as posts_router

app = FastAPI(title="InstaClone API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.get("/")
def read_root() -> dict:
    return {"status": "ok"}


app.include_router(auth_router)
app.include_router(posts_router)
