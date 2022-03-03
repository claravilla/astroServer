const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

//POST route

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res
      .status("200")
      .json({ message: "Please provide all required fields" });
  }

  if (password.length < 6) {
    return res
      .status("200")
      .json({ message: "Your password must be at least 6 characters" });
  }

  //checking is user submitted a username, and if so, if already exists.
  //username is not enforced in the model to be unique

  if (username) {
    User.findOne({ username: username }).then((foundUser) => {
      if (foundUser) {
        return res.status("200").json({ message: "Username already exists" });
      }
      return;
    });
  }

  User.findOne({ email: email })
    .then((userFound) => {
      if (userFound) {
        return res.status("200").json({ message: "Email already exists" });
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = bcrypt.hashSync(password, salt);

      return User.create({
        username: username,
        email: email,
        password: hashPassword,
      }).then((newUser) => {
        const { username, email, _id } = newUser;
        const user = {
          username,
          email,
          _id,
        };

        return res.status("200").json({
          message: `user: ${user.username}, email: ${user.email} has been created`,
        });
      });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
