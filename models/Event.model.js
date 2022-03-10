const { model, Schema } = require("mongoose");

const eventSchema = new Schema({
  name: {
    type: String,
    mandatory: true,
  },
  object: String,
  image: String,
  season: String,
  difficulty: String,
  time: String,
  place: String,
  observations: String,
  seen: Boolean,
  objectCatalogueId: String,
  score: Number,
  userId: String,
});

const Event = model("Event", eventSchema);

module.exports = Event;
