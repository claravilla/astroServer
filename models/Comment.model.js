const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    ojectCatalogueId: {
      type: String,
      required: true,
    },
    username: String,
    text: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const Comment = model("Comment", commentSchema);

module.export(Comment);
