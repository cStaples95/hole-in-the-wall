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

