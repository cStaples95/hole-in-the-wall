from fastapi import FastAPI, Depends, HTTPException, Request
from typing import List, Union
from sqlalchemy.orm import Session
import authentication, schemas
from database import models, database, email
from routers import users, profiles, posts, comments
# Casey Staples


models.Base.metadata.create_all(bind=database.engine)

# Main point of app
app = FastAPI()

# allow access form everywhere
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(email.router, prefix="/emails", tags=["emails"])
app.include_router(profiles.router, prefix="/profiles", tags=["profiles"])
app.include_router(posts.router, prefix="/posts", tags=["posts"])
app.include_router(comments.router, prefix="/comments", tags=["comments"])



# Login Endpoint
@app.get("/")
async def root():
    return {"message": "Created by Casey Staples"}
