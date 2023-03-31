from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from typing import List, Union
from sqlalchemy.orm import Session
import authentication, schemas
from database import crud, database


router = APIRouter()

@router.post("/create")
def create_profile(profile: schemas.Profile, db : Session = Depends(database.get_db)):
    return crud.create_new_profile(db=db, profile=profile)

@router.get("/all", response_model=List[schemas.Profile])
def get_all_profiles(db: Session = Depends(database.get_db)):
    return crud.get_all_profiles(db=db)

