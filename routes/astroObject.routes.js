const router = require("express").Router();
const mongoose = require("mongoose");
const AstroObject = require("../models/AstroObject.model");

//GET route to fetch all objects

router.get("/", (req, res, next) => {
  AstroObject.find()
    .then((data) => {
      res.status("200").json(data);
    })
    .catch((error) => {
      console.log(error);
      next(error);
      res.json(error);
    });
});

module.exports = router;
