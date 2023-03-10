# **Design Specification**
![HoleInTheWall](https://user-images.githubusercontent.com/74618860/221284439-b63626aa-b854-4b69-8ea4-b3e64b310cb3.png)

By: Michael Cipolla, Jake Larmer, Brian Penot, Matthew Sky, Casey Staples, Jonathan White

Github: [Senior-Project](https://github.com/cStaples95/senior-project)

**High Level Description:**

- Hole in the Wall is a social media application centered around sharing user's favorite foods, recommending places to eat, and creating meetups with friends and peers.
- The app runs on mobile devices, where users can create and maintain profiles and friends.
- On logging in users are presented with a start page that includes a feed of the most recent posts from their friends, an option to see their profile, a button to view their groups, and another to create a post.
- The user profile page includes a customizable profile picture, biography, and their posts from most recent to least recent.
- The group page of the app displays a number of groups the user belongs to and leads to another page where specific recommendations, posts, and discussions can be viewed.

**Approaches Considered:**

- React vs Flutter

We considered the pros and cons of using React Native and Flutter. Both are cross platform and will allow us to develop for IOS and Android. We decided to go with React native since it is more widely used, and will be easier to look up information on.

- Firebase vs MySql

We considered two different approaches to our backend database system, Firebase and a MySql server hosted on AWS. We decided to use MySql since none of us are familiar with a no-Sql database system, and our data is relational. Using a Sql database fits the needs of our data model better than a no-sql database would, and will be all familiar with building the tables and performing sql queries.

**Mockups:**

![Shape14](RackMultipart20230310-1-q3ftfc_html_a1d548372fe09ee6.gif) ![Shape1](RackMultipart20230310-1-q3ftfc_html_6a387b0c7d43b6cf.gif)

![Shape18](RackMultipart20230310-1-q3ftfc_html_74bb4af96e5d5ff2.gif) ![Shape28](RackMultipart20230310-1-q3ftfc_html_c2265d1372f671a4.gif)

![Shape35](RackMultipart20230310-1-q3ftfc_html_68bb861c2801aeb3.gif)

**Navigation: ![Shape36](RackMultipart20230310-1-q3ftfc_html_12f80e7d953111be.gif)**

**REST API:**

- FastAPI
- Uvicorn server
- Sqlalchemy - ORM
- OAuth2 for authentication, uses bcrypt to hash and salt passwords

**End Points:**

- [/api/docs]
  - Returns interactive swagger docs for api
- [/api/auth/login]
  - Allows admin to gain access to all endpoints (testing)
- [/api/user/]
  - Returns all user[s] information from database
  - New users will be added with a POST
- [/api/user/login]
  - Matches users information to allow access
- [/api/user/profile]
  - Returns logged in users profile information from database
- [/api/user/post]
  - Handles logged in users post information
  - New posts can be added from here, as well as receiving specific posts through post\_id look up.

**Functionality:**

- Login page gives the user access to the application, where the user can choose between logging in or creating an account.
- The Sign Up page allows the user to create their account to receive access.
- The Start/Feed page is the user's feed. It shows all the current posts of their friends. There is also a bar at the bottom that allows the user to switch pages.
- The User page allows the user to customize their profile. They can choose their profile picture, their bio, and make a post. There is also a bar at the bottom that allows the user to switch pages.
- The Groups Screen starts with a list of the groups the user is in but after selecting a group, it takes the user to the profile picture and bio of the group as well as further features such as posts in the group, recommendations of restaurants, and the chat.

**User Authentication / Security Considerations:**

- Auth0 SDK for React will handle authentication.
- Auth0 uses bcrypt to manage salt and hashes for passwords.

**Tech Stack:**

- VS Code
- React Native
- JavaScript
- Python
- MySQL
- js
- Github
- AWS
- FastAPI

**Goals and Assignments:**

- Michael Cipolla: Profile and post functionality
- Jake Larmer: Database design, creating tables
- Brian Penot: Login/sign up, authentication, and group pages
- Matthew Sky: Live feed and search functionality
- Casey Stapler: Fast API
- Jonathan White: Connecting the Database to the API, calling the API from the front end