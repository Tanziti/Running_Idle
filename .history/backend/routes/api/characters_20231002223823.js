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
      const newCharacter = new Character({
        name: req.body.name,
        heart: req.body.heart,
        legs: req.body.legs,
        arms: req.body.arms,
        outfit: req.body.outfit,
        shoes: req.body.shoes
      });
  
      let character = await newCharacter.save();
      return res.json(character);
    } catch (err) {
      next(err);
    }
  });
  
  module.exports = router;