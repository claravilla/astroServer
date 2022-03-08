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

//GET route for one object

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  AstroObject.findById(id)
    .populate("comments")
    .then((foundObject) => {
      if (foundObject) {
        console.log(foundObject);
        res.status("200").json(foundObject);
      } else {
        res.status("200").json({ message: "Object not found" });
      }
    })
    .catch((error) => {
      res.json(error);
    });
});

module.exports = router;
