const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    ojectCatalogueId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Comment = model("Comment", commentSchema);

module.export(Comment);
