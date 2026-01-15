from datetime import datetime
from typing import List

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/posts", tags=["posts"])


class PostOut(BaseModel):
    id: int
    username: str
    image_url: str
    caption: str
    created_at: datetime


@router.get("/", response_model=List[PostOut])
def list_posts() -> List[PostOut]:
    now = datetime.utcnow()
    return [
        PostOut(
            id=1,
            username="alexr",
            image_url="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
            caption="Morning light in the mountains.",
            created_at=now,
        ),
        PostOut(
            id=2,
            username="marina",
            image_url="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
            caption="Coffee + a good book.",
            created_at=now,
        ),
    ]
