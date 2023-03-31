from fastapi import FastAPI, Depends, HTTPException
from typing import List, Union
from sqlalchemy.orm import Session
import authentication, schemas
from database import models, database, email
from routers import users, profiles
# Casey Staples


models.Base.metadata.create_all(bind=database.engine)

# Main point of app
app = FastAPI()

# allow for access from localhost
origins = [
    "http://localhost",
]

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(authentication.router, prefix="/auth", tags=["auth"])
app.include_router(email.router, prefix="/emails", tags=["emails"])
app.include_router(profiles.router, prefix="/profiles", tags=["profiles"])



# Login Endpoint
@app.get("/")
async def root():
    return {"message": "Created by Casey Staples"}
