from fastapi import FastAPI, Depends, HTTPException
from typing import List, Union
from sqlalchemy.orm import Session
import authentication, schemas
from database import models, database
from routers import users
# Casey Staples
# V .01
# main file that will contain the FastAPI Endpoints


models.Base.metadata.create_all(bind=database.engine)

# Main point of app
app = FastAPI()

# allow for access from localhost
origins = [
    "http://localhost",
]

app.include_router(users.router, prefix="/users", tags=["users"])




# Login Endpoint
@app.get("/")
async def root():
    return {"message": "Created by Casey Staples"}
