// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const { isAuthenticated } = require("./middleware/jwt.authenticated");

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

//Object endpoints
const astroObjectRoutes = require("./routes/astroObject.routes");
app.use("/api/astro-objects", astroObjectRoutes);

//Auth endpoints
const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);

//Event endpoints

const EventRoutes = require("./routes/event.routes");
app.use("/api/events", isAuthenticated, EventRoutes);

//Comment endpoints

const CommentRoutes = require("./routes/comment.routes");
app.use("/api/comments", CommentRoutes);

//User endpoints

const UserRoutes = require("./routes/user.routes");
app.use("/api/users", UserRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
