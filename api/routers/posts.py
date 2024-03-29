from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from typing import List, Union
from sqlalchemy.orm import Session
import authentication, schemas
from database import crud, database

router = APIRouter()

# Create Post
@router.post("/create" , status_code= status.HTTP_201_CREATED, response_model=schemas.PostBase)
def create_post(post: schemas.PostCreate, db: Session = Depends(database.get_db),
                 current_user: schemas.User = Depends(authentication.get_current_user)):
    post.UserID = current_user.UserID
    return crud.create_new_post(db=db, post=post)

# Get my Posts with comments
@router.get("/myposts/comments", response_model=schemas.Post)
def get_my_posts_with_comments(db: Session = Depends(database.get_db),
                    current_user: schemas.User = Depends(authentication.get_current_user)):
        return crud.get_my_posts_with_comments(db=db, userID=current_user.UserID)

# Get all of my Posts with comments 
@router.get("/myposts/comments/all")
def get_all_my_posts_comments(db: Session = Depends(database.get_db),
                              current_user: schemas.User = Depends(authentication.get_current_user)):
        return crud.get_all_my_posts_with_comments(db=db, userID=current_user.UserID)

# Get my posts
@router.get("/myposts", response_model=List[schemas.PostBase])
def get_my_posts(db: Session = Depends(database.get_db),
                    current_user: schemas.User = Depends(authentication.get_current_user)):
        return crud.get_my_posts(db=db, userID=current_user.UserID)

# Delete my posts
@router.delete("/delete/myposts", status_code=status.HTTP_204_NO_CONTENT)
def delete_my_posts(db: Session = Depends(database.get_db),
                    current_user: schemas.User = Depends(authentication.get_current_user)):
    return crud.delete_my_posts(db, userID=current_user.UserID)

# Delete all posts
@router.delete("/delete/all", status_code=status.HTTP_204_NO_CONTENT)
def delete_all_posts(db: Session = Depends(database.get_db)):
    return crud.delete_all_posts(db)

# Get posts for my feed
@router.get("/feed", response_model=List[schemas.Post])
def get_my_feed(db: Session = Depends(database.get_db),
                    current_user: schemas.User = Depends(authentication.get_current_user)):
    return crud.get_feed(db=db, userID=current_user.UserID)

# Get all posts
@router.get("/all", response_model=List[schemas.Post])
def get_all_posts(db: Session = Depends(database.get_db)):
    return crud.get_all_posts(db=db)

# Count other posts 
@router.get("/count", response_model=int)
def count_all_other_posts(db: Session = Depends(database.get_db),
                    current_user: schemas.User = Depends(authentication.get_current_user)):
    return crud.count_all_other_posts(db=db, userID=current_user.UserID)


# Get 10 posts
@router.get("/ten", response_model=List[schemas.Post])
def get_ten_posts(db: Session = Depends(database.get_db)):
    return crud.get_ten_posts(db=db)