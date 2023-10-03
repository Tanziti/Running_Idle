const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
// const Character = mongoose.model('Character');
const { requireUser } = require('../../config/passport');
// const validateCharacterInput = require('../../validations/characters');





// "Post '/' route "