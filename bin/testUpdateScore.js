require("dotenv").config();
const mongoose = require("mongoose");
const Event = require("../models/Event.model");
const User = require("../models/User.model");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/astroList";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const updateUserScores = async (userId) => {
  try {
    console.log("this works");
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

    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      { totalSeen: totalSeen, score: score },
      { new: true }
    );

    return updateUser;
  } catch (error) {
    return error;
  }
};

updateUserScores("6225bdc8ec14632c239c5343");
