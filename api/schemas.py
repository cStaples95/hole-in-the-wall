import datetime
from typing import List, Union
from pydantic import BaseModel, EmailStr

# Casey Staples
# V .01
# File for json schemas using pydantic

# Token models -----------------------------------------------------------


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Union[str, None] = None


class EmailSchema(BaseModel):
    email: List[EmailStr]
                
# User models--------------------------------------------------------------


class UserBase(BaseModel):
    username: str

    class Config:
        orm_mode = True


class UserCreate(UserBase):
    password: str
    email: str


class UserLogin(UserBase):
    password: str


class UserChangePassword(BaseModel):
    old_password: str
    new_password: str


class UserChangeEmail(BaseModel):
    old_email: str
    new_email: str


class UserSettings(BaseModel):
    comments_notifs: bool
    follow_notifs: bool


class User(UserBase):
    userID: int
    email: str
    deleted: bool

    class Config:
        orm_mode = True


class UserDelete(User):
    deleted = True

# Profile models-----------------------------------------------------------


class ProfileBase(BaseModel):
    firstName: str
    lastName: str

    class Config:
        orm_mode = True

class ProfileCreate(ProfileBase):
    pass

class Profile(ProfileBase):
    profileID: int
    userID: int
    DOB: str

    class Config:
        orm_mode = True

# Post models--------------------------------------------------------------


class PostBase(BaseModel):
    Title: str
    Content: str
    DatePosted = datetime.datetime.now()
    # Optional
    Location: Union[str, None] = None


class PostCreate(PostBase):
    pass


class Post(PostBase):
    id: int
    UserID: int

    class Config:
        orm_mode = True


class PostDelete(Post):
    pass

# Comment models-----------------------------------------------------------


class CommentBase(BaseModel):
    Content: str
    DatePosted = datetime.datetime.now()


class CommentCreate(CommentBase):
    pass


class Comment(CommentBase):
    id: int
    UserID: int
    PostID: int

    class Config:
        orm_mode = True


class CommentDelete(Comment):
    pass
