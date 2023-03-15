from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from typing import List, Union
from sqlalchemy.orm import Session
import authentication, schemas
from database import crud, database


router = APIRouter()


@router.post("/login")
async def login(UserLogin: schemas.UserLogin, db: Session = Depends(database.get_db)):
    if authentication.authenticate_user(db, UserLogin.username, UserLogin.password):
        access_token = authentication.create_access_token(
            data={"sub": UserLogin.username}, expires_delta=authentication.ACCESS_TOKEN_ACCESS_TOKEN_EXPIRE_MINUTES)
        return {"access_token": access_token, "token_type": "bearer"}
    else:
        raise HTTPException(
            status_code=401, detail="Incorrect username or password")


# Create User


@router.post("/create", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(
            status_code=400, detail="Username already registered")
    return crud.create_user(db=db, user=user)