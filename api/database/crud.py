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
    return db.query(models.User).filter(models.User.userID == userID).first()

def get_username_by_userID(db: Session, UserID: int):
    return db.query(models.User.username).filter(models.User.userID == UserID).first()

def get_user_by_username(db: Session, username: str):
    user_name = db.query(models.User).filter(models.User.username == username).first()
    if user_name is None:
        return None # User does not exist
    else:
        return user_name


def get_user_by_userID(db: Session, userID: int):
    return db.query(models.User).filter(models.User.userID == userID).first()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = bcrypt.hashpw(
        user.password.encode('utf-8'), bcrypt.gensalt())
    db_user = models.User(username=user.username.lower(),
                          password=hashed_password, email=user.email, deleted=False)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return 1


def delete_user(db: Session, username: str):
    db_user = get_user_by_username(db, username)
    db_user.deleted = True
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

def create_new_profile(db: Session, profile: schemas.Profile):
    db_profile = models.Profile(firstName=profile.firstName, 
                                lastName=profile.lastName, DOB=profile.DOB, userID=profile.userID)
    db.add(db_profile)
    db.commit()
    return 

def get_all_profiles(db: Session):
    return db.query(models.Profile).all()

def delete_all_profiles(db: Session):
    try:
        num_rows_deleted = db.query(models.Profile).delete()
        db.commit()
    except Exception as e:
        db.rollback()
    return num_rows_deleted