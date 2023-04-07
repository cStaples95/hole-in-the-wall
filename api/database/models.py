from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, BLOB
from sqlalchemy.orm import relationship
from .database import Base

# Casey Staples and Jonathan White
# V .01
# Models for the database tables


class User(Base):
    __tablename__ = "User"

    userID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, index=True)
    deleted = Column(Boolean, default=False)

# chnaged to add blob image and bio
class Profile(Base):
    __tablename__ = "Profile"

    profileID = Column(Integer, primary_key=True, index=True, autoincrement= True)
    userID = Column(Integer, ForeignKey("User.userID"))
    Picture = Column(BLOB)
    Bio = Column(String)

    
class UserSettings(Base):
    __tablename__ = "UserSettings"

    userSettingsID = Column(Integer, primary_key=True, index=True)
    commentsNotifs = Column(Boolean, default=True)
    followNotifs = Column(Boolean, default=True)

    userID = Column(Integer, ForeignKey("User.UserID"))


class Comments(Base):
    __tablename__ = "Comments"

    commentID = Column(Integer, primary_key=True, index=True)
    comment = Column(String)
    DateCommented = Column(String)

    userID = Column(Integer, ForeignKey("User.userID"))
    PostID = Column(Integer, ForeignKey("Post.PostID"))

# added picture
class Post(Base):
    __tablename__ = "Post"

    PostID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Title = Column(String)
    Description = Column(String)
    DatePosted = Column(String)
    Location = Column(String)
    Picture = Column(BLOB)

    userID = Column(Integer, ForeignKey("User.userID"))


class PostTages(Base):
    __tablename__ = "PostTags"

    PostTagsID = Column(Integer, primary_key=True, index=True)

    TagID = Column(Integer, ForeignKey("Tags.TagID"))
    PostID = Column(Integer, ForeignKey("Post.PostID"))


class Tags(Base):
    __tablename__ = "Tags"

    TagID = Column(Integer, primary_key=True, index=True)
    Tag = Column(String)

    PostTagsID = Column(Integer, ForeignKey("PostTags.PostTagsID"))

# new models - Jonathan White

class Friends(Base):
    __tablename__ = "Friends"

    FriendshipID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    FriendUserID = Column(Integer)

    UserID = Column(Integer, ForeignKey("User.UserID"))

class Group(Base):
    __tablename__ = "Group"

    GroupID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    GroupName = Column(String)

    HangoutID = Column(Integer, ForeignKey("Hangout.HangoutID"))

class GroupMembers(Base):
    __tablename__ = "GroupMembers"

    GroupMemberID = Column(Integer, primary_key=True, index=True, autoincrement=True)

    UserID = Column(Integer, ForeignKey("User.UserID"))
    GroupID = Column(Integer, ForeignKey("Group.GroupID"))

class Hangout(Base):
    __tablename__ = "Hangout"

    HangoutID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    HangoutName = Column(String)
    Date = Column(String)
    Votes = Column(Integer)

    GroupID = Column(Integer, ForeignKey("Group.GroupID"))