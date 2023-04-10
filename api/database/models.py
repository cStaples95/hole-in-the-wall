from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, BLOB
from sqlalchemy.orm import relationship
from .database import Base

# Casey Staples and Jonathan White
# V .01
# Models for the database tables


class User(Base):
    __tablename__ = "User"

    UserID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Username = Column(String, unique=True, index=True)
    Email = Column(String, unique=True, index=True)
    Password = Column(String, index=True)
    Deleted = Column(Boolean, default=False)

# chnaged to add blob image and bio
class Profile(Base):
    __tablename__ = "Profile"

    ProfileID = Column(Integer, primary_key=True, index=True, autoincrement= True)
    UserID = Column(Integer, ForeignKey("User.UserID"))
    Picture = Column(BLOB)
    Bio = Column(String)

    
class UserSettings(Base):
    __tablename__ = "UserSettings"

    UserSettingsID = Column(Integer, primary_key=True, index=True)
    CommentsNotifs = Column(Boolean, default=True)
    FollowNotifs = Column(Boolean, default=True)

    UserID = Column(Integer, ForeignKey("User.UserID"))


class Comments(Base):
    __tablename__ = "Comments"

    CommentID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    Comment = Column(String)
    DateCommented = Column(String)

    UserID = Column(Integer, ForeignKey("User.UserID"))
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

    UserID = Column(Integer, ForeignKey("User.UserID"))


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