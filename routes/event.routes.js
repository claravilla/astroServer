const router = require("express").Router();
const mongoose = require("mongoose");
const Event = require("../models/Event.model");
const User = require("../models/User.model");

// CREATE EVENT

router.post("/", (req, res, next) => {
  const {
    name,
    time,
    place,
    observations,
    season,
    difficulty,
    seen,
    score,
    ojectCatalogueId,
    userId,
  } = req.body;

  if (!name) {
    res.status(400).json({ error: "Please add a name" });
    return;
  }

  Event.create({
    name,
    time,
    place,
    observations,
    season,
    difficulty,
    seen,
    score,
    ojectCatalogueId,
    userId,
  })
    .then((newEvent) => {
      return User.findByIdAndUpdate(
        userId,
        { $push: { events: newEvent._id } },
        { new: true }
      );
    })
    .then(() => {
      res.status(200).json({ message: "Event has been created" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Something went wrong, try again" });
    });
});

module.exports = router;
