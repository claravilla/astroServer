const { model, Schema } = require("mongoose");

const eventSchema = new Schema({
  name: {
    type: String,
    mandatory: true,
  },
  image: String,
  season: String,
  time: String,
  place: String,
  observations: String,
  seen: Boolean,
  ojectCatalogueId: String,
  score: Number,
  userId: String,
});

const Event = model("Event", eventSchema);

module.exports = Event;
