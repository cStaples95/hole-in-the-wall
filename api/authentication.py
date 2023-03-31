from fastapi import APIRouter, FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, SecurityScopes
from typing import List, Union
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import schemas
from database import models, database, crud

# Casey Staples
# File to keep all the authentication code separate from the main.py file.
# Since we couldn't get it working, I didn't want to clutter up the main.py file with it.
# Might be useful in the future if we decide to implement it.


# To create a key run
# openssl rand -hex 32
SERECT_KEY = "2b2b841dfb59e81990b7be83b04d93d7312d8738deefcfdd325feac9e71724da"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
ACCESS_TOKEN_ACCESS_TOKEN_EXPIRE_MINUTES = timedelta(
    minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

# Establishing the password hashing and OAuth2
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/login")

# Database interaction


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Authentication


def create_access_token(data: dict, expires_delta: Union[timedelta, None]):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SERECT_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(db: Session, username: str, password: str):
    user = crud.get_user_by_username(db, username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return True


def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SERECT_KEY, algorithms=[ALGORITHM])
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


def get_current_active_user(current_user: schemas.User = Depends(get_current_user)):
    if current_user.deleted:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

# End point for autho if we end up getting it to work.
router = APIRouter()




@router.post("/token", response_model=schemas.Token)
async def login_for_access_token(db, form_data: schemas.UserLogin):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=400,
           detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
       data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
