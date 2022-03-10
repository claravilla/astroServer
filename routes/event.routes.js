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
    objectCatalogueId,
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
    objectCatalogueId,
    userId,
  })
    .then((newEvent) => {
      return User.findByIdAndUpdate(
        userId,
        { $push: { events: newEvent._id } },
        { new: true }
      );
    })
    .then((updatedUser) => {
      const userId = updatedUser._id.toString();
      updateUserScores(userId);
    })
    .then(() => {
      res.status(200).json({ message: "Event has been created" });
    })
    .catch((error) => {
      next(error);
      res.status(500).json({ error: "Something went wrong, try again" });
    });
});

//GET EVENTS

router.get("/", (req, res, next) => {
  Event.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
      res.status(500).json({
        error: "Sorry, we couldn't retrieve your events, please try again",
      });
    });
});

//DELETE SINGLE EVENT

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Event.findByIdAndDelete({ _id: id })
    .then((deletedEvent) => {
      updateUserScores(deletedEvent.userId);
    })
    .then(() => {
      res.status(200).json({ message: "Event has been deleted" });
    })
    .catch((error) => {
      next(error);
      res.status(500).json({
        error:
          "Something went wrong while deleting your event, please try again",
      });
    });
});

//GET SINGLE EVENT

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Event.findById({ _id: id })
    .then((foundEvent) => {
      res.status(200).json(foundEvent);
    })
    .catch((error) => {
      next(error);
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
    objectCatalogueId,
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
      objectCatalogueId,
      userId,
    },
    { new: true }
  )
    .then((updatedEvent) => {
      updateUserScores(updatedEvent.userId);
    })
    .then((updatedUser) => {
      res.status(200).json({ message: "Event has been updated" });
    })
    .catch((error) => {
      next(error);
      res.status(500).json({
        error:
          "Something went wrong while deleting your event, please try again",
      });
    });
});

//FUNCTION TO UPDATE THE USER SCORES WHEN AN EVENT IS ADDED/EDITED/DELETE

const updateUserScores = async (userId) => {
  try {
    const events = await Event.find();
    let score = 0;
    let totalSeen = 0;
    const userEvents = events.filter((eachEvent) => {
      return eachEvent.userId === userId;
    });

    let seenObjectsId = [];

    userEvents.forEach((eachEvent) => {
      if (eachEvent.seen && eachEvent.objectCatalogueId !== "") {
        if (seenObjectsId.includes(eachEvent.objectCatalogueId) === false) {
          score += eachEvent.score;
          totalSeen++;
          seenObjectsId.push(eachEvent.objectCatalogueId);
        }
      }
    });

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { totalSeen: totalSeen, score: score },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    return error;
  }
};

module.exports = router;
