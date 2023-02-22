from typing import List, Union
from pydantic import BaseModel


class PostBase(BaseModel):
    title: Union[str, None] = None
    body: str


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    email: str
    username: str
    password: str


class User(UserBase):
    id: int
    email: str
    is_active: bool
    post: List[Post] = []

    class Config:
        orm_mode = True
