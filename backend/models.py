from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Post(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    image_url: str
    caption: str
    user_id: int = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
