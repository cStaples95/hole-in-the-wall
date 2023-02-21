
from fastapi import FastAPI, HTTPException
import random
import os
import json
from pydantic import BaseModel
from typing import Optional
from uuid import uuid4
from fastapi.encoders import jsonable_encoder
app = FastAPI()


# Users Model
class Users(BaseModel):
    user_id: Optional[str] = uuid4().hex
    name: str
    email: str
    password: str


USERS_FILE = "users.json"
USER_DATABASE = []

if os.path.exists(USERS_FILE):
    with open(USERS_FILE, "r") as f:
        USER_DATABASE = json.load(f)


@app.get("/")
async def root():
    return {"message": "Welcome to the test API"}


@app.get("/users-by-index/{index}")
async def get_user_by_index(index: int):
    if index < 0 or index >= len(USER_DATABASE):
        # fail
        raise HTTPException(
            404, f"index {index} is out of range {len(USER_DATABASE)}.")
    else:
        return USER_DATABASE[index]


@app.get("/get-random-user")
async def get_random_user():
    return random.choice(USER_DATABASE)


@app.get("/list-users")
async def list_users():
    return [USER_DATABASE]


@app.get("/get-user")
async def get_user(user_id: str):
    for user in USER_DATABASE:
        if user["user_id"] == user_id:
            return user

    raise HTTPException(404, f"User with id {user_id} not found.")


@app.post("/add-user")
async def add_user(user: Users):
    user.users_id = uuid4().hex
    json_user = jsonable_encoder(user)
    USER_DATABASE.append(json_user)
    with open(USERS_FILE, "w") as f:
        json.dump(USER_DATABASE, f)
    return {"message": f"User {user} added successfully", "user_id": user.users_id}
