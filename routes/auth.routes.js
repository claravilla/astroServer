const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

//SIGN UP route

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Your password must be at least 6 characters" });
  }

  //checking is user submitted a username, and if so, if already exists.
  //username is not enforced in the model to be unique

  if (username) {
    User.findOne({ username: username }).then((foundUser) => {
      if (foundUser) {
        return res.status(400).json({ message: "Username already exists" });
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
      });
    })
    .then((newUser) => {
      const { username, email, _id } = newUser;
      const user = {
        username,
        email,
        _id,
      };

      return res.status("200").json({
        message: `user: ${user.username}, email: ${user.email} has been created`,
      });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

//LOGIN route

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please provide all mandatory fields" });
  }

  //check if email exists

  User.findOne({ email: email }).then((foundUser) => {
    if (!foundUser) {
      return res
        .status(401)
        .json({ message: "We couldn't log you in with those credentials" });
    }

    if (bcrypt.compareSync(password, foundUser.password)) {
      const { username, email, _id } = foundUser;
      //creating payload to be passed in the token
      const payload = {
        _id,
        username,
        email,
      };

      //creating the token

      let token = jwt.sign(payload, process.env.TOKEN, {
        algorithm: "HS256",
        expiresIn: "1d",
      });

      console.log(token);

      res.status(200).json({ authToken: token });
    } else {
      return res
        .status(401)
        .json({ message: "We couldn't log you in with those credentials" });
    }
  });
});

module.exports = router;
