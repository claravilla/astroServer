const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");

// GET all users details

router.get("/", async (req, res, next) => {
  try {
    const foundUsers = await User.find();
    const users = foundUsers.map((eachUser) => {
      return {
        username: eachUser.username,
        totalSeen: eachUser.totalSeen,
        score: eachUser.score,
      };
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
