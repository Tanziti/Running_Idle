const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tweet = mongoose.model('Character');
const { requireUser } = require('../../config/passport');
const validateTweetInput = require('../../validations/tweets');