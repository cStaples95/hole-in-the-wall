from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Union
from sqlalchemy.orm import Session
import authentication, schemas
from database import models, database, email
from routers import users, profiles, posts, comments
# Casey Staples


models.Base.metadata.create_all(bind=database.engine)

# Main point of app
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(email.router, prefix="/emails", tags=["emails"])
app.include_router(profiles.router, prefix="/profiles", tags=["profiles"])
app.include_router(posts.router, prefix="/posts", tags=["posts"])
app.include_router(comments.router, prefix="/comments", tags=["comments"])



# Login Endpoint
@app.get("/")
async def root():
    return {"message": "Created by Casey Staples"}
