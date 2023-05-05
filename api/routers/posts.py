from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    status,
    APIRouter,
    Path,
    UploadFile,
    Form,
    File,
    Response
)
from typing import List, Union
from sqlalchemy.orm import Session
import authentication, schemas
from database import crud, database

router = APIRouter()


# Create Post
@router.post(
    "/create", status_code=status.HTTP_201_CREATED, response_model=schemas.PostBase
)
async def create_post(
    title: str = Form(""),
    description: str = Form(""),
    location: str = Form(""),
    picture: UploadFile = File(None),
    picture_ext: str = Form(""),
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(authentication.get_current_user),
):
    userID = current_user.UserID
    print(picture)
    print(picture_ext)
    return await crud.create_new_post(
        db=db,
        userID=userID,
        title=title,
        description=description,
        location=location,
        picture=picture,
        picture_ext=picture_ext,
    )


# Get my Posts with comments
@router.get("/myposts/comments", response_model=schemas.Post)
def get_my_posts_with_comments(
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(authentication.get_current_user),
):
    return crud.get_my_posts_with_comments(db=db, userID=current_user.UserID)


# Get all of my Posts with comments
@router.get("/myposts/comments/all")
def get_all_my_posts_comments(
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(authentication.get_current_user),
):
    return crud.get_all_my_posts_with_comments(db=db, userID=current_user.UserID)


# Get my posts
@router.get("/myposts")
def get_my_posts(
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(authentication.get_current_user),
):
    return crud.get_my_posts(db=db, userID=current_user.UserID)


# Delete my posts
@router.delete("/delete/myposts", status_code=status.HTTP_204_NO_CONTENT)
def delete_my_posts(
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(authentication.get_current_user),
):
    return crud.delete_my_posts(db, userID=current_user.UserID)


# Delete all posts
@router.delete("/delete/all", status_code=status.HTTP_204_NO_CONTENT)
def delete_all_posts(db: Session = Depends(database.get_db)):
    return crud.delete_all_posts(db)


# Get posts for my feed
@router.get("/feed", response_model=List[schemas.Post])
def get_my_feed(
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(authentication.get_current_user),
):
    return crud.get_feed(db=db, userID=current_user.UserID)


# Get all posts
@router.get("/all", response_model=List[schemas.Post])
def get_all_posts(db: Session = Depends(database.get_db)):
    return crud.get_all_posts(db=db)


# Count other posts
@router.get("/count", response_model=int)
def count_all_other_posts(
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(authentication.get_current_user),
):
    return crud.count_all_other_posts(db=db, userID=current_user.UserID)


# Get {number} amount of posts
@router.get("/{number}")
def get_posts_by_number(
    db: Session = Depends(database.get_db),
    number: int = Path(..., gt=0, le=100),
):
    return crud.get_posts_by_number(db=db, number_of_posts=number)


@router.get("/{post_id}/likes")
def get_post_likes(db: Session = Depends(database.get_db), post_id: int = None):
    return crud.get_likes(db=db, post_id=post_id)


@router.get("/{post_id}/like")
def like_post(
    db: Session = Depends(database.get_db),
    post_id: int = None,
    current_user: schemas.User = Depends(authentication.get_current_user),
):
    res = crud.like_post(db=db, post_id=post_id, user_id=current_user.UserID)

    if res is None:
        raise HTTPException(
            status_code=status.HTTP_304_NOT_MODIFIED, detail="Already Liked"
        )
    else:
        return Response(status_code=status.HTTP_200_OK)
