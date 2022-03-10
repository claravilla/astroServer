# ASTRO WATCHLIST

REST api to support a [React App](https://github.com/claravilla/astro-client) that provides:

- Messier Catalogue Data
- User Creation and Auth
- Create/Edit/Delete event from user account
- Create comments on the Messier objects

---

## LINK

[Astro Watchlist server](https://astro-watch-list.herokuapp.com/api)

## BUILT WITH

- Express.js
- Express JWT
- MongoDB
- Deployed on Heroku

---

## DATA MODELS

- User
- AstroObject
- Event
- Comment

---

## ROUTES

### ASTRO-OBJECTS

| HTTP verb | Url                    | Request body | Description         |
| --------- | ---------------------- | ------------ | ------------------- |
| GET       | /api/astro-objects     | Empty        | Returns all objects |
| GET       | /api/astro-objects/:id | Empty        | Returns one object  |

### EVENTS

| HTTP verb | Url             | Request body | Description         |
| --------- | --------------- | ------------ | ------------------- |
| GET       | /api/events     | Empty        | Returns all events  |
| POST      | /api/events     | JSON         | Creates a new event |
| GET       | /api/events/:id | Empty        | Returns one event   |
| PUT       | /api/events/:id | JSON         | Update one event    |
| DELETE    | /api/events/:id | Empty        | Delete one event    |

### COMMENTS

| HTTP verb | Url           | Request body | Description          |
| --------- | ------------- | ------------ | -------------------- |
| GET       | /api/comments | Empty        | Returns all comments |
| POST      | /api/comments | JSON         | Create a new comment |

### AUTH

| HTTP verb | Url              | Request body | Description                     |
| --------- | ---------------- | ------------ | ------------------------------- |
| POST      | /api/auth/signup | JSON         | Create a new user               |
| POST      | /api/auth/login  | JSON         | Login user                      |
| GET       | /api/auth/verify | JSON         | Verify JWT stored on the client |

### USERS

| HTTP verb | Url        | Request body | Description       |
| --------- | ---------- | ------------ | ----------------- |
| GET       | /api/users | Empty        | Returns all users |

---

### USER STORIES

---

## COMING UP NEXT

- Create a get user route

---

## RESOURCES

[Express.js](https://expressjs.com/)  
[MongoDB](https://www.mongodb.com/atlas/database)  
[Mongoose](https://mongoosejs.com/)

Description of the project
User Stories
Setup(Optional)
Technologies Used
Models
Server routes table(Method, Route or URL, Description as columns)
Project Link
Future Work
Resources
Team members
