const router = require("express").Router();
const mongoose = require("mongoose");
const Event = require("../models/Event.model");

// CREATE EVENT

router.post("/", (req, res, next) => {
  const {
    name,
    time,
    place,
    observations,
    season,
    difficulty,
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
    score,
    ojectCatalogueId,
    userId,
  })
    .then((newEvent) => {
      res.status(200).json({ message: "Event has been created" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
