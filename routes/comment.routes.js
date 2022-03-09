const router = require("express").Router();
const { Router } = require("express");
const mongoose = require("mongoose");
const AstroObject = require("../models/AstroObject.model");
const Comment = require("../models/Comment.model");
const { isAuthenticated } = require("../middleware/jwt.authenticated");

//GET ALL COMMENTS

router.get("/", (req, res, next) => {
  Comment.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
      res
        .status(500)
        .json({ error: "Sorry, we cannot display comments, please try again" });
    });
});

//CREATE COMMENT

router.post("/", isAuthenticated, (req, res, next) => {
  const { objectCatalogueId, username, text, date } = req.body;
  if (!objectCatalogueId || !username || !text || !date) {
    res.status(400).json({ error: "Please fill all required fields" });
    return;
  }
  Comment.create({ objectCatalogueId, username, text, date })
    .then((newComment) => {
      return AstroObject.findByIdAndUpdate(
        newComment.objectCatalogueId,
        { $push: { comments: newComment._id } },
        { new: true }
      );
    })
    .then(() => {
      res.status(200).json({ message: `new comment created` });
    })
    .catch((error) => {
      next(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

module.exports = router;
