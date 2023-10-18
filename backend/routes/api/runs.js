const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Character = mongoose.model("Character");
const Run = mongoose.model("Run");
const { requireUser } = require("../../config/passport");
const validateRunInput = require("../../validations/runs");

router.post("/", requireUser, validateRunInput, async (req, res, next) => {
  try {
    const newRun = new Run({
      character: req.body.character,
      startTime: req.body.startTime,
      startPosition: req.body.startPosition,
      endTime: req.body.endTime,
      endPosition: req.body.endPosition,
      duration: req.body.duration,
      distance: req.body.distance,
      caption: req.body.caption,
    });
    let run = await newRun.save();
    return res.json(run);
  } catch (err) {
    next(err);
  }
});

router.get("/character/:characterId", async (req, res, next) => {
  let character;
  try {
    character = await Character.findById(req.params.characterId);
  } catch (err) {
    const error = new Error("Character not found");
    error.statusCode = 404;
    error.errors = { message: "No character found with that id" };
    return next(error);
  }
  try {
    const runs = await Run.find({ character: character._id })
      .sort({ createdAt: -1 })
      .populate("character", "_id name");
    return res.json(runs);
  } catch (err) {
    return res.json([]);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const run = await Run.findById(req.params.id).populate(
      "character",
      "_id name"
    );
    return res.json(run);
  } catch (err) {
    const error = new Error("Run not found");
    error.statusCode = 404;
    error.errors = { message: "No Run found with that id" };
    return next(error);
  }
});

router.put("/:id", requireUser, async (req, res, next) => {
  try {
    const run = await Run.findById(req.params.id);

    if (!run) {
      const error = new Error("Run not found, did you perhaps not do it?");
      error.statusCode = 404;
      error.message = "No Runs found with that ID";
      return next(error);
    }

    const updatedRun = await run.save();
    return res.json(updatedRun);
  } catch (err) {
    const error = new Error("Error updating run");
    error.statusCode = 500;
    error.message = err.message;
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const runs = await Run.find()
      .sort({ distance: -1 })
      .limit(10)
      .populate("character", "_id name");

    return res.json(runs);
  } catch (err) {
    const error = new Error("Runs not found");
    error.statusCode = 404;
    error.errors = { message: "No runs found" };
    return next(error);
  }
});

module.exports = router;
