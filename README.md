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
| GET       | /api/events/:id | Empty        | Returns one event   |
| POST      | /api/events     | JSON         | Creates a new event |
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

**As a developer** **I want to** be able request all data from the astro object catalogue **so** I can display them in my app.
**As a developer** **I want to** be able to request details for just one astro object **so** I can create an Object details page without having to filter.
**As a developer** **I want to** be able create an new event in the API **so** I can build a form in my app for my users.
**As a developer** **I want to** be able to get all events **so** I can filter them and display the right ones to my user in my app.
**As a developer** **I want to** be able to get details of a single event **so** I can easily display them to the user in my app.
**As a developer** **I want to** be able to update an event in the API **so** the user in my app can modify stored events.
**As a developer** **I want to** be able to delete a single event in the API **so** the user in my app can have a cleaner account.
**As a developer** **I want to** be able to request all comments **so** I can display them in my app.
**As a developer** **I want to** be able to create anew comment in the API **so** the users in my app can write their own comments and see them saved.
**As a developer** **I want to** be able to create new user **so** the users of my app can create their account and events.
**As a developer** **I want to** be able to login user **so** I can be sure the user in my app can only access their account and their events.
**As a developer** **I want to** be able to verify if a token is valid **so** I can protect my routes.
**As a developer** **I want to** be able to get all the users of the app **so** I can use the data to create a leader board.

---

## COMING UP NEXT

- Remove event reference in the user model when the event is delete
- When a new event with an Object Id is created, check if one with the same Object Id exists and return an error
- Create a get single user route
- Create a get/put/delete routes for comments
- Add admin user role to manage the catalogue
- Add route to maintain the catalogue
- Add middleware to protect admin only route

---

## RESOURCES

[Express.js](https://expressjs.com/)  
[MongoDB](https://www.mongodb.com/atlas/database)  
[Mongoose](https://mongoosejs.com/)

## BUILT BY

[Clara Villa](https://github.com/claravilla)
