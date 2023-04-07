import datetime
from typing import List, Union
from pydantic import BaseModel, EmailStr

# Casey Staples and Jonathan White
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

# got rid of firstname, lastname and dob added bio and picture (picture is str until we figure out how to add image)
class ProfileBase(BaseModel):
    Bio: str
    Picture: str
    class Config:
        orm_mode = True

class ProfileCreate(ProfileBase):
    userID: Union[str, None] = None

class Profile(ProfileBase):
    profileID: int
    userID: int

    class Config:
        orm_mode = True

# Post models--------------------------------------------------------------


class PostBase(BaseModel):
    Title: str
    Description: str
    DatePosted = datetime.datetime.now()
    # Optional
    Location: Union[str, None] = None

    class Config:
        orm_mode = True

class Post(PostBase):
    userID: int

    class Config:
        orm_mode = True

class PostCreate(PostBase):
    userID: Union[str, None] = None

class PostDelete(Post):
    pass

# Comment models-----------------------------------------------------------


class CommentBase(BaseModel):
    Content: str
    DatePosted = datetime.datetime.now()


class CommentCreate(CommentBase):
    pass


class Comment(CommentBase):
    commentID: int
    UserID: int
    PostID: int

    class Config:
        orm_mode = True


class CommentDelete(Comment):
    pass


# Group models -Jonathan White----------------------------------------------------------

class GroupBase(BaseModel):
    GroupName: str

class GroupCreate(GroupBase):
    pass

class Group(GroupBase):
    GroupID: int
    HangoutID: int
    
    class Config:
        orm_mode = True

class GroupDelete(Group):
    pass


class GroupMemberBase(BaseModel):
    GroupMemberID: int

    class Config:
        orm_mode = True

class GroupMember(GroupMemberBase):
    UserID: int
    GroupID: int

    class Config:
        orm_mode = True


# Friends models -Jonathan White----------------------------------------------------------

class FriendsBase(BaseModel):
    FriendshipID: int


class Friends(FriendsBase):
    FriendUserID: int
    UserID: int

    class Config:
        orm_mode = True

# Hangout models -Jonathan White----------------------------------------------------------

class HangoutBase(BaseModel):
    HangoutName: str
    Date: str
    Votes: int

class HangoutCreate(HangoutBase):
    pass

class Hangout(HangoutBase):
    HangoutID: int
    GroupID: int

    class Config:
        orm_mode = True

class HangoutDelete(Hangout):
    pass