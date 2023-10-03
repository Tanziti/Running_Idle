const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tweet = mongoose.model('Charact');
const { requireUser } = require('../../config/passport');
const validateTweetInput = require('../../validations/tweets');