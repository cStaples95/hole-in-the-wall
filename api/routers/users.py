from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from typing import List, Union
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import authentication, schemas
from database import crud, database


router = APIRouter()


# User Login 
@router.post("/login")
def login(UserLogin: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    if authentication.authenticate_user(db, UserLogin.username.lower(), UserLogin.password):
        access_token = authentication.create_access_token(
            data={"sub": UserLogin.username}, expires_delta=authentication.ACCESS_TOKEN_ACCESS_TOKEN_EXPIRE_MINUTES)
        return {"access_token": access_token, "token_type": "bearer"}
    else:
        raise HTTPException(
            status_code=401, detail="Incorrect username or password")


# Create User
@router.post("/register", status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    db_user = crud.get_user_by_username(db, user.username.lower())
    if db_user is not None:
        raise HTTPException(
            status_code=409, detail="Username already registered")
    else:
         return crud.create_user(db=db, user=user)
    


# To be used as an easy way to delete test data from the database
# Will throw an error when used, but will still delete the user (I don't know why)
# Use this by interacting with the docs. 
@router.delete("/delete/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(id: int, db: Session = Depends(database.get_db)):
    db_user = crud.get_user_by_userID(db, userID=id)
    if db_user is None:
        raise HTTPException(
            status_code=404, detail="User not found")
    else:
        crud.delete_user_by_userID(db, userID=id)
        return