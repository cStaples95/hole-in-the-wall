from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from typing import List, Union
from sqlalchemy.orm import Session
import authentication, schemas
from database import crud, database


router = APIRouter()

@router.post("/create" , status_code= status.HTTP_201_CREATED) 
def create_profile(profile: schemas.ProfileCreate, db : Session = Depends(database.get_db)):

    return crud.create_new_profile(db=db, profile=profile)

@router.get("/all", response_model=List[schemas.ProfileReturn])
def get_all_profiles(db: Session = Depends(database.get_db), current_user: schemas.User = Depends(authentication.get_current_user)):
    return crud.get_all_profiles(db=db)

@router.delete("/delete/all", status_code=status.HTTP_204_NO_CONTENT)
def delete_all_profiles(db: Session = Depends(database.get_db)):
    return crud.delete_all_profiles(db)

@router.get("/get/{profile_id}", response_model=schemas.ProfileReturn)
def get_profile(profile_id: int, db: Session = Depends(database.get_db)):
    return crud.get_profile_from_id(db=db, profile_id=profile_id)

# get profile from username
@router.get("/get/{username}", response_model=schemas.ProfileReturn)
def get_profile_from_username(username: str, db: Session = Depends(database.get_db)):
    return crud.get_profile_from_username(db=db, username=username)

# get my profile
@router.get("/mine", response_model=schemas.ProfileReturn)
def get_my_profile(db: Session = Depends(database.get_db), current_user: schemas.User = Depends(authentication.get_current_user)):
    return crud.get_profile_from_userid(db=db, userid=current_user.UserID)