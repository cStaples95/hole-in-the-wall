from sqlalchemy.orm import Session
from passlib.hash import bcrypt
import models
import schemas

# Casey Staples
# V .01
# File for handling CRUD operations

# Get user functions


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.UserID == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.Username == username).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.Email == email).first()

# get all users


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

# Create user functions


def create_user(db: Session, user: schemas.UserRegister):
    hashed_password = bcrypt.hash(user.Password)
    db_user = models.User(Username=user.Username,
                          Password=hashed_password, Email=user.Email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Update user functions


def update_user(db: Session, user: schemas.User, user_id: int):
    db_user = db.query(models.User).filter(
        models.User.UserID == user_id).first()
    db_user.Username = user.Username
    db_user.Password = user.Password
    db_user.Email = user.Email
    db.commit()
    db.refresh(db_user)
    return db_user

# Delete user functions


def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(
        models.User.UserID == user_id).first()
    db.delete(db_user)
    db.commit()
    return db_user

# Get profile functions


def get_profile(db: Session, profile_id: int):
    return db.query(models.Profile).filter(models.Profile.ProfileID == profile_id).first()


def get_profile_by_user_id(db: Session, user_id: int):
    return db.query(models.Profile).filter(models.Profile.UserID == user_id).first()


def get_profiles_by_first_name(db: Session, first_name: str):
    return db.query(models.Profile).filter(models.Profile.FirstName == first_name).all()


def get_profiles_by_last_name(db: Session, last_name: str):
    return db.query(models.Profile).filter(models.Profile.LastName == last_name).all()


def get_profiles_by_first_and_last_name(db: Session, first_name: str, last_name: str):
    return db.query(models.Profile).filter(models.Profile.FirstName == first_name, models.Profile.LastName == last_name).all()

# get all profiles


def get_profiles(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Profile).offset(skip).limit(limit).all()

# Create profile functions


def create_profile(db: Session, profile: schemas.Profile):
    db_profile = models.Profile(FirstName=profile.FirstName,
                                LastName=profile.LastName, DOB=profile.DOB, UserID=profile.UserID)
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

# Update profile functions


def update_profile(db: Session, profile: schemas.Profile, profile_id: int):
    db_profile = db.query(models.Profile).filter(
        models.Profile.ProfileID == profile_id).first()
    db_profile.FirstName = profile.FirstName
    db_profile.LastName = profile.LastName
    db_profile.DOB = profile.DOB
    db_profile.UserID = profile.UserID
    db.commit()
    db.refresh(db_profile)
    return db_profile

# Delete profile functions


def delete_profile(db: Session, profile_id: int):
    db_profile = db.query(models.Profile).filter(
        models.Profile.ProfileID == profile_id).first()
    db.delete(db_profile)
    db.commit()
    return db_profile

# Get user settings functions


def get_user_settings(db: Session, user_settings_id: int):
    return db.query(models.UserSettings).filter(models.UserSettings.UserSettingsID == user_settings_id).first()


def get_user_settings_by_user_id(db: Session, user_id: int):
    return db.query(models.UserSettings).filter(models.UserSettings.UserID == user_id).first()

# get all user settings


def get_user_settings(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.UserSettings).offset(skip).limit(limit).all()

# Create user settings functions


def create_user_settings(db: Session, user_settings: schemas.UserSettings):
    db_user_settings = models.UserSettings(
        UserID=user_settings.UserID, FollowNotifs=user_settings.FollowNotifs, CommentsNotifs=user_settings.CommentsNotifs)
    db.add(db_user_settings)
    db.commit()
    db.refresh(db_user_settings)
    return db_user_settings

# Update user settings functions


def update_user_settings(db: Session, user_settings: schemas.UserSettings, user_settings_id: int):
    db_user_settings = db.query(models.UserSettings).filter(
        models.UserSettings.UserSettingsID == user_settings_id).first()
    db_user_settings.UserID = user_settings.UserID
    db_user_settings.CommentsNotifs = user_settings.CommentsNotifs
    db_user_settings.FollowNotifs = user_settings.FollowNotifs
    db.commit()
    db.refresh(db_user_settings)
    return db_user_settings

# Delete user settings functions


def delete_user_settings(db: Session, user_settings_id: int):
    db_user_settings = db.query(models.UserSettings).filter(
        models.UserSettings.UserSettingsID == user_settings_id).first()
    db.delete(db_user_settings)
    db.commit()
    return db_user_settings

# get tag functions


def get_tag(db: Session, tag_id: int):
    return db.query(models.Tags).filter(models.Tags.TagID == tag_id).first()


def get_tags(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Tags).offset(skip).limit(limit).all()

# Create tag functions


def create_tag(db: Session, tag: schemas.Tag):
    db_tag = models.Tags(TagName=tag.Tag)
    db.add(db_tag)
    db.commit()
    db.refresh(db_tag)
    return db_tag

# Update tag functions


def update_tag(db: Session, tag: schemas.Tag, tag_id: int):
    db_tag = db.query(models.Tags).filter(models.Tags.TagID == tag_id).first()
    db_tag.Tag = tag.Tag
    db.commit()
    db.refresh(db_tag)
    return db_tag

# Delete tag functions


def delete_tag(db: Session, tag_id: int):
    db_tag = db.query(models.Tags).filter(models.Tags.TagID == tag_id).first()
    db.delete(db_tag)
    db.commit()
    return db_tag
