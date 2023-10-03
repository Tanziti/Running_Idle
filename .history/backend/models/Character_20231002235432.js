const mongoose = require('mongoose');
const Schema = mongoose.Schema;


  
  const characterSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    heart: {
      type: Number,
      required: true,
      min: 1,
      max: 6
    },
    legs: {
      type: Number,
      min: 1,
      max: 6
    },
    arms: {
      type: Number,
      min: 1,
      max: 6
    },
    outfit: {
      type: String, // Single string (color)
      validate: {
        validator: validateColor,
        message: 'Invalid color in outfit.'
      }
    },
    shoes: {
      type: String, // Single string (color)
      validate: {
        validator: validateColor,
        message: 'Invalid color in shoes.'
      }
    }
  });

 

module.exports = mongoose.model('Character', characterSchema);