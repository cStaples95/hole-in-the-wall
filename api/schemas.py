import datetime
from typing import List, Union
from pydantic import BaseModel, EmailStr

# Casey Staples and Jonathan White
# V .01
# File for json schemas using pydantic
# Union[type, None] = None is used to make fields optional (Since we're using older python)

# Token models -----------------------------------------------------------


class Token(BaseModel):
    Access_token: str
    Token_type: str


class TokenData(BaseModel):
    Username: Union[str, None] = None


class EmailSchema(BaseModel):
    Email: List[EmailStr]
                
# User models--------------------------------------------------------------


class UserBase(BaseModel):
    Username: str

    class Config:
        orm_mode = True


class UserCreate(UserBase):
    Password: str
    Email: str
    Username: str


class UserLogin(UserBase):
    Password: str


class UserChangePassword(BaseModel):
    old_password: str
    new_password: str


class UserChangeEmail(BaseModel):
    old_email: str
    new_email: str


class UserSettings(BaseModel):
    CommentsNotifs: bool
    FollowNotifs: bool


class User(UserBase):
    UserID: int
    Email: str
    Deleted: bool

    class Config:
        orm_mode = True


class UserDelete(User):
    Deleted = True

# Profile models-----------------------------------------------------------

# got rid of firstname, lastname and dob added bio and picture (picture is str until we figure out how to add image)
class ProfileBase(BaseModel):
    Bio: Union[str, None] = None # Made bio optional to allow for auto profile creation - Casey Staples
    Picture: Union[str, None] = None
    PictureExt: Union[str, None] = None
    class Config:
        orm_mode = True

class ProfileCreate(ProfileBase):
    UserID: Union[str, None] = None

class ProfileReturn(ProfileBase):
    Username: str
    UserID: Union[str, None] = None
    class Config:
        orm_mode = True

class Profile(ProfileBase):
    ProfileID: int
    UserID: int

    class Config:
        orm_mode = True

# Comment models-----------------------------------------------------------

class LikesBase(BaseModel):
    UserID: int
    PostID: int

class Likes(LikesBase):
    LikeID: int

    class Config:
        orm_mode = True

# Comment models-----------------------------------------------------------


class CommentBase(BaseModel):
    Comment: str
    DateCommented = datetime.datetime.now()

    class Config:
        orm_mode = True


class Comment(CommentBase):
    CommentID: int
    UserID: int
    PostID: int

    class Config:
        orm_mode = True

class CommentCreate(CommentBase):
    UserID: Union[int, None] = None
    PostID: Union[int, None] = None

class CommentDelete(Comment):
    pass

# Post models--------------------------------------------------------------

class PostBase(BaseModel):
    Title: str
    Description: str
    DatePosted = datetime.datetime.now()
    # Optional fields
    Location: Union[str, None] = None
    Comments: List[Union[CommentBase, None]] = []
    Picture: Union[str, None] = None
    PictureExt: Union[str, None] = None
    Likes: List[Union[LikesBase, None]] = []

    class Config:
        orm_mode = True

class Post(PostBase):
    UserID: int
    PostID :int

    class Config:
        orm_mode = True

class PostCreate(PostBase):
    UserID: Union[str, None] = None

class PostDelete(Post):
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

# Might be useful to bring back the Group name
#  And List of users in the group - Casey Staples
class GroupMemberList(GroupBase):
    GroupMembers: List[UserBase] = []

    class Config:
        orm_mode = True

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

# Test model, might be useful to bring back all the friends of a user - Casey Staples
class FriendsList(BaseModel):
    Friends: List[UserBase] = []

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
