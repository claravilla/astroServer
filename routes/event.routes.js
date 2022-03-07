const router = require("express").Router();
const mongoose = require("mongoose");
const Event = require("../models/Event.model");
const User = require("../models/User.model");

// CREATE EVENT

router.post("/", (req, res, next) => {
  const {
    name,
    object,
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
    object,
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

//GET EVENTS PER USER

router.get("/:userId", (req, res, next) => {
  const { userId } = req.params;
  Event.find({ userId: userId })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "Sorry, we couldn't retrieve your events, please try again",
      });
    });
});

//DELETE SINGLE EVENT

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Event.findByIdAndDelete({ _id: id })
    .then(() => {
      res.status(200).json({ message: "Event has been deleted" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error:
          "Something went wrong while deleting your event, please try again",
      });
    });
});

//GET SINGLE EVENT

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  Event.findById({ _id: id })
    .then((foundEvent) => {
      res.status(200).json(foundEvent);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error: "Something went wrong loading your event, please try again",
      });
    });
});

//EDIT SINGLE EVENT

router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    object,
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

  Event.findByIdAndUpdate(
    { _id: id },
    {
      name,
      object,
      time,
      place,
      observations,
      season,
      difficulty,
      seen,
      score,
      ojectCatalogueId,
      userId,
    },
    { new: true }
  )
    .then(() => {
      res.status(200).json({ message: "Event has been updated" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        error:
          "Something went wrong while deleting your event, please try again",
      });
    });
});

module.exports = router;
