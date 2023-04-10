from typing import List, Union
from sqlalchemy.orm import Session
import bcrypt
from passlib.context import CryptContext
from .database import models
import schemas

# Casey Staples

# Get user functions


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def get_users_by_userID(db: Session, userID: int):
    return db.query(models.User).filter(models.User.UserID == userID).first()

def get_username_by_userID(db: Session, userID: int):
    return db.query(models.User.Username).filter(models.User.UserID == userID).first()

def get_user_by_username(db: Session, username: str):
    user_name = db.query(models.User).filter(models.User.Username == username.lower()).first()
    if user_name is None:
        return None # User does not exist
    else:
        return user_name


def get_user_by_userID(db: Session, userID: int):
    return db.query(models.User).filter(models.User.UserID == userID).first()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = bcrypt.hashpw(
        user.password.encode('utf-8'), bcrypt.gensalt())
    db_user = models.User(username=user.Username.lower(),
                          Password=hashed_password, Email=user.Email, Deleted=False)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return 1


def delete_user(db: Session, username: str):
    db_user = get_user_by_username(db, username)
    db_user.Deleted = True
    db.commit()
    db.refresh(db_user)
    return

def delete_user_by_userID(db: Session, userID: int):
    db_user = get_user_by_userID(db, userID)
    db.delete(db_user)
    db.commit()
    return

def delete_all_users(db: Session):
    try:
        num_rows_deleted = db.query(models.User).delete()
        db.commit()
    except Exception as e:
        db.rollback()
    return num_rows_deleted


# Profile functions

def create_new_profile(db: Session, profile: schemas.ProfileCreate, username: str):
    db_profile = models.Profile(Username=username, Bio=profile.Bio, Picture=profile.Picture, userID=profile.UserID)
    db.add(db_profile)
    db.commit()
    return 

# Get all the profiles and the username from the user table that created the profile
def get_all_profiles(db: Session):
    return db.query(models.Profile).join(models.User).all()

def delete_all_profiles(db: Session):
    try:
        num_rows_deleted = db.query(models.Profile).delete()
        db.commit()
    except Exception as e:
        db.rollback()
    return num_rows_deleted

# Post functions

def create_new_post(db: Session, post: schemas.PostCreate):
    db_post = models.Post(Title = post.Title, Description = post.Description, DatePosted = post.DatePosted,
                           Location = post.Location, UserID = post.UserID)
    db.add(db_post)
    db.commit()
    return db.query(models.Post).filter(models.Post.userID == post.userID).order_by(models.Post.DatePosted.desc()).first()


# Get all of my posts with all of their comments
def get_all_my_posts_with_comments(db: Session, userID: int) -> schemas.Post:
    results = schemas.Post
    posts = db.query(models.Post).filter(models.Post.UserID == userID).all()
    for p in posts: 
        comments = db.query(models.Comments).filter(models.Comments.PostID == p.PostID).all()
    for p in posts :
        results = schemas.Post(Title=p.Title, Description=p.Description, DatePosted=p.DatePosted, Location=p.Location, UserID=p.UserID, PostID=p.PostID, Comments = c)
    return results


# Get my posts with all the comments and the user who posted the comment
def get_my_posts_with_comments(db: Session, userID: int) -> schemas.Post:
    posts = db.query(models.Post).filter(models.Post.UserID == userID).first()
    comments = db.query(models.Comments).filter(models.Comments.PostID == posts.PostID).all()
    return schemas.Post(Title=posts.Title, Description=posts.Description, DatePosted=posts.DatePosted, Location=posts.Location, UserID=posts.UserID, PostID=posts.PostID, Comments=comments)

def get_my_posts(db: Session, userID: int):
    return db.query(models.Post).filter(models.Post.UserID == userID).all()

def get_my_recent_posts(db: Session, userID: int):
    return db.query(models.Post).filter(models.Post.UserID == userID).order_by(models.Post.DatePosted.desc()).limit(5).all()

def get_all_posts(db: Session):
    return db.query(models.Post).all()

def delete_all_posts(db: Session):
    try:
        num_rows_deleted = db.query(models.Post).delete()
        db.commit()
    except Exception as e:
        db.rollback()
    return num_rows_deleted

def delete_my_posts(db: Session, userID: int):
    try:
        num_rows_deleted = db.query(models.Post).filter(models.Post.UserID == userID).delete()
        db.commit()
    except Exception as e:
        db.rollback()
    return num_rows_deleted

def count_all_other_posts(db: Session, userID: int):
    return db.query(models.Post).filter(models.Post.UserID != userID).count()

def get_feed(db: Session, userID: int, skip: int = 0, limit: int = 10):
    return db.query(models.Post).filter(models.Post.UserID != userID).offset(skip).limit(limit).all()


# Comment functions 

def create_new_comment(db: Session, comment: schemas.CommentCreate):
    db_comment = models.Comments(Comment = comment.Comment, DateCommented = comment.DateCommented, UserID = comment.UserID, PostID = comment.PostID)
    db.add(db_comment)
    db.commit()
    return 1

def get_all_comments(db: Session):
    return db.query(models.Comments).all()

def get_post_comments(db: Session, postID: int):
    return db.query(models.Comments).filter(models.Comments.PostID == postID).all()

def delete_all_comments(db: Session):
    try:
        num_rows_deleted = db.query(models.Comments).delete()
        db.commit()
    except Exception as e:
        db.rollback()
    return num_rows_deleted
