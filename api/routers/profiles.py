from fastapi import FastAPI, Depends, HTTPException, status, APIRouter, UploadFile, File, Form
from PIL import Image
import io
import base64
from typing import List, Union
from sqlalchemy.orm import Session
import authentication, schemas
from database import crud, database
from authentication import get_current_user


router = APIRouter()

@router.post("/create" , status_code= status.HTTP_201_CREATED) 
def create_profile(profile: schemas.ProfileCreate, db : Session = Depends(database.get_db),
                    current_user: schemas.User = Depends(authentication.get_current_user)):
    profile.UserID = current_user.UserID
    return crud.create_new_profile(db=db, profile=profile)

@router.get("/all")
def get_all_profiles(db: Session = Depends(database.get_db)):
    return crud.get_all_profiles(db=db)

@router.delete("/delete/all", status_code=status.HTTP_204_NO_CONTENT)
def delete_all_profiles(db: Session = Depends(database.get_db)):
    return crud.delete_all_profiles(db)

@router.get("/get", response_model=schemas.ProfileReturn)
def get_profile(db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_user)):
    userID = current_user.UserID
    return crud.get_profile_from_userid(db=db, userid=userID)

@router.get("/get/{user_id}", response_model=schemas.ProfileReturn)
def get_profile(db: Session = Depends(database.get_db), user_id: int = None):
    return crud.get_profile_from_userid(db=db, userid=user_id)


@router.put("/update")
async def update_profile(bio: str = Form(""), picture: UploadFile = File(None), picture_ext: str = Form(""), db: Session = Depends(database.get_db), current_user: schemas.User = Depends(get_current_user)):
    userID = current_user.UserID
    return await crud.update_profile_from_userid(db=db, userid=userID, bio=bio, picture=picture, picture_ext=picture_ext)


# get my profile
@router.get("/get/mine", response_model=schemas.ProfileReturn)
def get_my_profile(db: Session = Depends(database.get_db), current_user: schemas.User = Depends(authentication.get_current_user)):
    return crud.get_profile_from_userid(db=db, userid=current_user.UserID)


@router.get("/get/picture/{user_id}", response_model=str)
def get_profile_picture(db: Session = Depends(database.get_db), user_id: int = None):
    return crud.get_profile_picture_from_userid(db=db, userid=user_id)
