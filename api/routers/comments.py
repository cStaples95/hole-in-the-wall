from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from typing import List, Union
from sqlalchemy.orm import Session
import authentication, schemas
from database import crud, database

router = APIRouter()

# This endpoint is currently in testing - Casey Staples

# Create a comment on a post
@router.post("/create", status_code=status.HTTP_201_CREATED)
def create_comment(comment: schemas.CommentCreate, db: Session = Depends(database.get_db),
                   current_user: schemas.User = Depends(authentication.get_current_user)):
    comment.UserID = current_user.UserID
    return crud.create_new_comment(db=db, comment=comment)

# Get all comments
@router.get("/all", response_model=List[schemas.Comment])
def get_all_comments(db: Session = Depends(database.get_db)):
    return crud.get_all_comments(db=db)

# Delete all comments
@router.delete("/delete/all", status_code=status.HTTP_204_NO_CONTENT)
def delete_all_comments(db: Session = Depends(database.get_db)):
    return crud.delete_all_comments(db)

