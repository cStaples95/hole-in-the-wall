from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from .database import Base

# Casey Staples
# V .01
# Models fo the database tables


class User(Base):
    __tablename__ = "User"

    userID = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String, index=True)
    deleted = Column(Boolean, default=False)


class Profile(Base):
    __tablename__ = "Profile"

    profileID = Column(Integer, primary_key=True, index=True)
    firstName = Column(String)
    lastName = Column(String)
    DOB = Column(String)

    userID = Column(Integer, ForeignKey("User.UserID"))


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

    UserID = Column(Integer, ForeignKey("User.UserID"))
    PostID = Column(Integer, ForeignKey("Post.PostID"))


class Post(Base):
    __tablename__ = "Post"

    PostID = Column(Integer, primary_key=True, index=True)
    Title = Column(String)
    Content = Column(String)
    DatePosted = Column(String)
    Location = Column(String)

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
