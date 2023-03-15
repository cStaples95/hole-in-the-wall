from fastapi import Depends, HTTPException, status
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from .models.models import models
# Dependencies for the API


# Database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./testing_db.db"

# Create engine, allows multiple connections and threads
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={
                       "check_same_thread": False})

# Create session for database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create Base for database
Base = declarative_base()

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

