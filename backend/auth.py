from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from sqlmodel import Session, select

from .database import get_session
from .models import User

SECRET_KEY = "super-secret-change-me"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

router = APIRouter(prefix="/auth", tags=["auth"])


class Token(BaseModel):
    access_token: str
    token_type: str


class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    username: str
    password: str


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_user_by_username(session: Session, username: str) -> Optional[User]:
    statement = select(User).where(User.username == username)
    return session.exec(statement).first()


@router.post("/signup", response_model=Token, status_code=status.HTTP_201_CREATED)
def signup(payload: UserCreate, session: Session = Depends(get_session)) -> Token:
    existing_user = get_user_by_username(session, payload.username)
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    user = User(
        username=payload.username,
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
    )
    session.add(user)
    session.commit()
    session.refresh(user)

    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return Token(access_token=access_token, token_type="bearer")


@router.post("/login", response_model=Token)
def login(payload: UserLogin, session: Session = Depends(get_session)) -> Token:
    user = get_user_by_username(session, payload.username)
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    return Token(access_token=access_token, token_type="bearer")


def decode_token(token: str) -> str:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except JWTError as exc:
        raise HTTPException(status_code=401, detail="Invalid token") from exc
