from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base

# Casey Staples
# V .01
# Models fo the database tables


class User(Base):
    __tablename__ = "User"

    UserID = Column(Integer, primary_key=True, index=True)
    Username = Column(String, unique=True, index=True)
    Email = Column(String, unique=True, index=True)
    Password = Column(String)
    PasswordSalt = Column(Boolean, default=True)


class Profile(Base):
    __tablename__ = "Profile"

    ProfileID = Column(Integer, primary_key=True, index=True)
    FirstName = Column(String)
    LastName = Column(String)
    DOB = Column(String)

    UserID = Column(Integer, ForeignKey("User.UserID"))


class UserSettings(Base):
    __tablename__ = "UserSettings"

    UserSettingsID = Column(Integer, primary_key=True, index=True)
    CommentsNotifs = Column(Boolean, default=True)
    FollowNotifs = Column(Boolean, default=True)

    UserID = Column(Integer, ForeignKey("User.UserID"))


class Comments(Base):
    __tablename__ = "Comments"

    CommentID = Column(Integer, primary_key=True, index=True)
    Comment = Column(String)
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
