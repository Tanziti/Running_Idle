const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
// const Character = mongoose.model('Character');
const { requireUser } = require('../../config/passport');
// const validateCharacterInput = require('../../validations/characters');





// "POST '/' route" to create a new character

router.post('/', requireUser, validateCharacterInput, async (req, res, next) => {
    try {
      const newTweet = new Tweet({
        text: req.body.text,
        author: req.user._id
      });
  
      let tweet = await newTweet.save();
      tweet = await tweet.populate('author', '_id username');
      return res.json(tweet);
    }
    catch(err) {
      next(err);
    }
  });