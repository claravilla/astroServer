const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],

    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

    totalSeen: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
