from typing import List, Union
from pydantic import BaseModel

# Casey Staples
# V .01
# File for json schemas using pydantic

# Model for Token


class Token(BaseModel):
    access_token: str
    token_type: str

# Model for Token Data


class TokenData(BaseModel):
    username: Union[str, None] = None

# User models


class UserLogin(BaseModel):
    Username: str
    Password: str


class UserCreate(BaseModel):
    pass


class UserRegister(BaseModel):
    Username: str
    Password: str
    Email: str


class User(BaseModel):
    UserID: int
    Username: str
    Password: str
    PasswordSalt: str
    Email: str

    class Config:
        orm_mode = True


class UserSettings(BaseModel):
    UserSettingsID: int
    CommentsNotifs: bool
    FollowNotifs: bool
    UserID: int

    class Config:
        orm_mode = True

# Profile models


class Profile(BaseModel):
    ProfileID: int
    FirstName: str
    LastName: str
    DOB: str
    UserID: int

    class Config:
        orm_mode = True


class ProfileCreate(BaseModel):
    FirstName: str
    LastName: str
    DOB: str
    UserID: int

 # Comment models


class Comments(BaseModel):
    CommentID: int
    Comment: str
    DateCommented: str
    UserID: int
    PostID: int

    class Config:
        orm_mode = True


class CreateComment(BaseModel):
    Comment: str
    DateCommented: str
    UserID: int
    PostID: int


# Post models

class CreatePost(BaseModel):
    Title: str
    Content: str
    DatePosted: str
    Location: str
    UserID: int


class Post(BaseModel):
    PostID: int
    Title: str
    Content: str
    DatePosted: str
    Location: str
    UserID: int

    class Config:
        orm_mode = True


# Tag models

class Tag(BaseModel):
    TagID: int
    Tag: str
    PostID: int

    class Config:
        orm_mode = True


class CreateTag(BaseModel):
    Tag: str
    PostID: int


# List models

class UserList(BaseModel):
    users: List[User]

    class Config:
        orm_mode = True


class ProfileList(BaseModel):
    profiles: List[Profile]

    class Config:
        orm_mode = True


class CommentList(BaseModel):
    comments: List[Comments]

    class Config:
        orm_mode = True


class PostList(BaseModel):
    posts: List[Post]

    class Config:
        orm_mode = True
