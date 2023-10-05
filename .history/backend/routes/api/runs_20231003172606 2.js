const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Character = mongoose.model('Character');
const Run = mongoose.model('Run');
const { requireUser } = require('../../config/passport');

// const validateCharacterInput = require('../../validations/characters');

router.post('/', requireUser, async (req, res, next) => {
    try{
        const newRun = new Run({
            character: req.character,
            startTime: req.body.startTime,
            startPosition: req.body.startPosition,
        })
        let run = await newRun.save();
        return res.json(run);
    } catch (err) {
        next(err);
    }
});

router.get('/character/:characterId', async (req, res, next) => {
    let character;
    try {
        character = await Character.findById(req.params.characterId);   
    } catch(err) {
        const error = new Error("Character not found");
        error.statusCode =404;
        error.errors = { message: "No character found with that id" };
        return next(error);
    } 
    try {
        const runs = await Run.find({ character: character._id})
                                        .sort({ createdAt: -1 }) 
                                        .populate("character", "_id name");
        return res.json(runs);
    }
    catch(err) {
        return res.json([]);
    }
   
    })

router.get('/:id', async (req, res, next) => {
    try {
        const run = await Run.findById(req.params.id)
                        .populate("character", "_id name");
        return res.json(run);
    }
    catch(err) {
        const error = new Error('Run not found');
        error.statusCode = 404;
        error.errors = { message: "No Run found with that id" };
        return next(error);
    }
});

router.put('/:id', requireUser, async (req, res, next) => {
    try {
      const run = await Run.findById(req.params.id);
  
      if (!run) {
        const error = new Error('Run not found, did you perhaps not do it?');
        error.statusCode = 404;
        error.message = 'No Runs found with that ID';
        return next(error);
      }
  
      run.endTime = req.body.endTime;
      run.endPosition = req.body.endPosition;
      run.duration = req.body.duration;
      run.distance = req.body.distance;
      run.caption = req.body.caption;


      const updatedRun = await run.save();
      return res.json(updatedRun);
    } catch (err) {
      const error = new Error('Error updating run');
      error.statusCode = 500;
      error.message = err.message;
      return next(error);
    }
  });

  module.exports = router;