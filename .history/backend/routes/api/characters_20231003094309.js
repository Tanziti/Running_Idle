const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Character = mongoose.model('Character');
const { requireUser } = require('../../config/passport');
// const validateCharacterInput = require('../../validations/characters');





// "POST '/' route" to create a new character
//include validateCharacterInput for router.post
router.post('/', requireUser, async (req, res, next) => {
    try {
      const newCharacter = new Character({
        name: req.body.name,
        heart: req.body.heart,
        legs: req.body.legs,
        arms: req.body.arms,
        outfit: req.body.outfit,
        shoes: req.body.shoes,
        user: req.user._id
      });
  
      let character = await newCharacter.save();
      return res.json(character);
    } catch (err) {
      next(err);
    }
  });

  router.get('/user/:userId', async (req, res, next) => {
    let user;
    try {
      user = await User.findById(req.params.userId);
    } catch(err) {
      const error = new Error('User not found');
      error.statusCode = 404;
      error.errors = { message: "No user found with that id" };
      return next(error);
    }
    try {
      const characters = await Character.find({ user: user._id })
                                .sort({ createdAt: -1 })
                                .populate("user", "_id username");
      return res.json(characters);
    }
    catch(err) {
      return res.json([]);
    }
  })

  router.get('/:id', async (req, res, next) => {
    try {
      const character = await Character.findById(req.params.id)
                               .populate("user", "_id username");
      return res.json(character);
    }
    catch(err) {
      const error = new Error('Character not found');
      error.statusCode = 404;
      error.errors = { message: "No Character found with that id" };
      return next(error);
    }
  });

  router.put('/:id', requireUser, async (req, res, next) => {
    try {
      const character = await Character.findById(req.params.id);
  
      if (!character) {
        const error = new Error('Character not found');
        error.statusCode = 404;
        error.message = 'No Character found with that ID';
        return next(error);
      }
  
      character.name = req.body.name;
      // character.heart = req.body.heart;
      // character.legs = req.body.legs;
      // character.arms = req.body.arms;
      // character.outfit = req.body.outfit;
      // character.shoes = req.body.shoes;

      const updatedCharacter = await character.save();
      return res.json(updatedCharacter);
    } catch (err) {
      const error = new Error('Error updating character');
      error.statusCode = 500;
      error.message = err.message;
      return next(error);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const deletedCharacter = await Character.findByIdAndRemove(req.params.id);
  
      if (!deletedCharacter) {
        const error = new Error('Character not found');
        error.statusCode = 404;
        error.message = 'No Character found with that ID';
        return next(error);
      }
  
      return res.json({ message: 'Character deleted successfully' });
    } catch (err) {
      const error = new Error('Error deleting character');
      error.statusCode = 500;
      error.message = err.message;
      return next(error);
    }
  });



  module.exports = router;