# FastAPI prototype
Fast API local host prototype2 with local sqlLite db functionality created by Casey Staples
This prototype allows the api to create users and posts, and save them to the local database.
This api is also capable of pulling that infomation back from the database to the user.

# Requirements
Check the requirments.txt to install the required modules for this project
this can be done easily on the command line once you're inside the dir
```
pip install -r requirments.txt
```

# Setting up local server 
To run the API and test it out, you must run a local host server
run this command inside the main dir of the project

```
uvicorn main:app --reload
```
the --reload flag will cause the server to listen to file changes inside the dir
this will allow you to make changes to main.py and see the changes in real time on the server.

to access the webpage you can go to 
```
http://127.0.0.1:8000
```
this will bring up the root page

to access the swagger docs, and access the curl commands for each rest point go to

```
http://127.0.0.1:8000/docs
```


