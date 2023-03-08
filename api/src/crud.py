from sqlalchemy.orm import Session
import bcrypt
from passlib.context import CryptContext
import models
import schemas

# Casey Staples
# V .01
# File for handling CRUD operations

# Password Hashing

# Get user functions


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.Username == username).first()


def get_user_by_userID(db: Session, userID: int):
    return db.query(models.User).filter(models.User.UserID == userID).first()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = bcrypt.hashpw(
        user.password.encode('utf-8'), bcrypt.gensalt())
    db_user = models.User(Username=user.username,
                          Password=hashed_password, Email=user.email, Deleted=False)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, username: str):
    db_user = get_user_by_username(db, username)
    db_user.Deleted = True
    db.commit()
    db.refresh(db_user)
    return db_user
