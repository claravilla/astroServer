const { Schema, model } = require("mongoose");

const astroObjectSchema = new Schema(
  {
    ngc: String,
    latinName: String,
    mag: Number,
    messier: String,
    distance: Number,
    englishName: String,
    dec: String,
    ra: String,
    dimension: String,
    season: String,
    discoveredBy: String,
    object: String,
    imageMap: String,
    commonName: String,
    image: String,
    difficulty: String,
    score: Number,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamp: true }
);

const AstroObject = model("AstroObject", astroObjectSchema);

module.exports = AstroObject;
