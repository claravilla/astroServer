const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const { isAuthenticated } = require("../middleware/jwt.authenticated");

//SIGN UP route

router.post("/signup", (req, res, next) => {
  const { username, email, password } = req.body;
  console.log("route file");

  if (!username || !email || !password) {
    res.status(400).json({ error: "Please fill all required fields" });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ error: "Password must be at least 6 characters" });
    return;
  }

  User.findOne({ username: username })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ error: "Username already taken" });
        return;
      }
      User.findOne({ email: email }).then((foundUser) => {
        if (foundUser) {
          res.status(400).json({ error: "Email already taken" });
          return;
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return User.create({
          username: username,
          email: email,
          password: hashedPassword,
        }).then((newUser) => {
          const { username, email, _id } = newUser;
          const user = {
            username,
            email,
            _id,
          };

          //creating the token

          let token = jwt.sign(user, process.env.TOKEN, {
            algorithm: "HS256",
            expiresIn: "1d",
          });

          res.status(200).json({ user: user, authToken: token });
        });
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

//LOGIN route

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please provide all mandatory fields" });
    return;
  }

  //check if email exists

  User.findOne({ email: email }).then((foundUser) => {
    if (!foundUser) {
      res
        .status(401)
        .json({ message: "We couldn't log you in with those credentials" });
      return;
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

      res.status(200).json({ authToken: token });
    } else {
      res
        .status(401)
        .json({ message: "We couldn't log you in with those credentials" });
    }
  });
});

//VERIFY USER IS AUTHENTICATED route

router.get("/verify", isAuthenticated, (req, res, next) => {
  console.log("this works");
  res.status(200).json(req.payload);
});

module.exports = router;
