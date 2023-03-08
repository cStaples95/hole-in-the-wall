from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import List, Union
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import crud
import models
import schemas
import database

# Casey Staples
# V .01
# main file that will contain the FastAPI functions

# To create a key run
# openssl rand -hex 32
SECRET_KEY = "88e3d9f2343ecef017870f83c4d20316549ddcea16efb2746497dcf8d4463a39"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
SALTROUNDS = 10


# Establish connnection to database for end points


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Setup for OAuth2 and password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Main point of app
app = FastAPI()

# Authentice a user


def authenticate_user(username: str, password: str, db: Session):
    user = crud.get_user_by_username(db, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user

# Get the current user and verify the token


async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

# Return true if the current user is active


async def get_current_active_user(current_user: schemas.User = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code=402, detail="Inactive user")
    return current_user

# Create access token to be passed to an authenticated user


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Verify password


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Get hashed password


def get_password_hash(password):
    return pwd_context.hash(password, SALTROUNDS)


# End point for creating a token
@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=400,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

# --------------------- End points for user interaction ---------------------------------------------

# Create a user
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=402, detail="Username already registered")
    return crud.create_user(db=db, user=user)

# Get all users
@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), Depends(get_current_active_user)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

# Get a user by username
@app.get("/users/{username}", response_model=schemas.User)
def read_user(username: str, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_user = crud.get_user_by_username(db, username=username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Get user by e-mail
@app.get("/users/email/{email}", response_model=schemas.User)
def read_user(email: str, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_user = crud.get_user_by_email(db, email=email)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Update a user
@app.put("/users/{username}", response_model=schemas.User)
def update_user(username: str, user: schemas.UserUpdate, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_user = crud.get_user_by_username(db, username=username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.update_user(db=db, db_user=db_user, user=user)

# Delete a user
@app.delete("/users/{username}", response_model=schemas.User)
def delete_user(username: str, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_user = crud.get_user_by_username(db, username=username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.delete_user(db=db, username=username)

# ------------ End points for post interaction -----------------------------

# Create a post
@app.post("/posts/", response_model=schemas.Post)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db), Depends(get_current_active_user)):
    return crud.create_post(db=db, post=post)

# Get all posts
@app.get("/posts/", response_model=List[schemas.Post])
def read_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), Depends(get_current_active_user)):
    posts = crud.get_posts(db, skip=skip, limit=limit)
    return posts

# Get a post by id
@app.get("/posts/{post_id}", response_model=schemas.Post)
def read_post(post_id: int, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_post = crud.get_post_by_id(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

# Get a post by User_ID
@app.get("/posts/user/{user_id}", response_model=List[schemas.Post])
def read_post(user_id: int, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_post = crud.get_post_by_user_id(db, user_id=user_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

# Update a post 
@app.put("/posts/{post_id}", response_model=schemas.Post)
def update_post(post_id: int, post: schemas.PostUpdate, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_post = crud.get_post_by_id(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return crud.update_post(db=db, db_post=db_post, post=post)

# Delete a post
@app.delete("/posts/{post_id}", response_model=schemas.Post)
def delete_post(post_id: int, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_post = crud.get_post_by_id(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return crud.delete_post(db=db, post_id=post_id)

# ---------------- End points for comment interaction -----------------------------

# Create a comment
@app.post("/comments/", response_model=schemas.Comment)
def create_comment(comment: schemas.CommentCreate, db: Session = Depends(get_db), Depends(get_current_active_user)):
    return crud.create_comment(db=db, comment=comment)

# Get all comments
@app.get("/comments/", response_model=List[schemas.Comment])
def read_comments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), Depends(get_current_active_user)):
    comments = crud.get_comments(db, skip=skip, limit=limit)
    return comments

# Get a comment by id
@app.get("/comments/{comment_id}", response_model=schemas.Comment)
def read_comment(comment_id: int, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_comment = crud.get_comment_by_id(db, comment_id=comment_id)
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return db_comment

# Get a comment by User_ID
@app.get("/comments/user/{user_id}", response_model=List[schemas.Comment])
def read_comment(user_id: int, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_comment = crud.get_comment_by_user_id(db, user_id=user_id)
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return db_comment

# Get a comment by Post_ID
@app.get("/comments/post/{post_id}", response_model=List[schemas.Comment])
def read_comment(post_id: int, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_comment = crud.get_comment_by_post_id(db, post_id=post_id)
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return db_comment

# Update a comment
@app.put("/comments/{comment_id}", response_model=schemas.Comment)
def update_comment(comment_id: int, comment: schemas.CommentUpdate, db: Session = Depends(get_db), Depends(get_current_active_user)):   
    db_comment = crud.get_comment_by_id(db, comment_id=comment_id)
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return crud.update_comment(db=db, db_comment=db_comment, comment=comment)

# Delete a comment
@app.delete("/comments/{comment_id}", response_model=schemas.Comment)
def delete_comment(comment_id: int, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_comment = crud.get_comment_by_id(db, comment_id=comment_id)
    if db_comment is None:
        raise HTTPException(status_code=404, detail="Comment not found")
    return crud.delete_comment(db=db, comment_id=comment_id)

# ---------------- End points for Post Tags -----------------------------

# Create a post tag
@app.post("/post_tags/", response_model=schemas.PostTag)
def create_post_tag(post_tag: schemas.PostTagCreate, db: Session = Depends(get_db), Depends(get_current_active_user)):
    return crud.create_tag(db=db, post_tag=post_tag)


# Delete a post tag
@app.delete("/post_tags/{post_tag_id}", response_model=schemas.PostTag)
def delete_post_tag(post_tag_id: int, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_post_tag = crud.get_post_tag_by_id(db, post_tag_id=post_tag_id)
    if db_post_tag is None:
        raise HTTPException(status_code=404, detail="Post Tag not found")
    return crud.delete_post_tag(db=db, post_tag_id=post_tag_id)

# Update a post tag
@app.put("/post_tags/{post_tag_id}", response_model=schemas.PostTag)
def update_post_tag(post_tag_id: int, post_tag: schemas.PostTagUpdate, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_post_tag = crud.get_post_tag_by_id(db, post_tag_id=post_tag_id)
    if db_post_tag is None:
        raise HTTPException(status_code=404, detail="Post Tag not found")
    return crud.update_post_tag(db=db, db_post_tag=db_post_tag, post_tag=post_tag)

# Get a post tag by id
@app.get("/post_tags/{post_tag_id}", response_model=schemas.PostTag)
def read_post_tag(post_tag_id: int, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_post_tag = crud.get_post_tag_by_id(db, post_tag_id=post_tag_id)
    if db_post_tag is None:
        raise HTTPException(status_code=404, detail="Post Tag not found")
    return db_post_tag

# Get a post tag by Post_ID
@app.get("/post_tags/post/{post_id}", response_model=List[schemas.PostTag])
def read_post_tag(post_id: int, db: Session = Depends(get_db), Depends(get_current_active_user)):
    db_post_tag = crud.get_post_tag_by_post_id(db, post_id=post_id)
    if db_post_tag is None:
        raise HTTPException(status_code=404, detail="Post Tag not found")
    return db_post_tag

