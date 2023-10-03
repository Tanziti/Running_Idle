const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validateColor = (value) => {
  const allowedColors = ['red', 'yellow', 'green'];
  return allowedColors.includes(value);
};
  
  const characterSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    heart: {
      type: Number,
      required: true,
      min: 0,
      max: 1000
    },
    legs: {
      type: Number,
      required: true,
      min: 0,
      max: 1000
    },
    arms: {
      type: Number,
      required: true,
      min: 0,
      max: 1000
    },
    points: {
      type: Number,
      required: true,
      min: 0,
      max: 9999 
    },
    outfit: {
      type: String,
      required: true,
      validate: {
        validator: validateColor,
        message: 'Invalid color in outfit.'
      }
    },
    shoes: {
      type: String,
      required: true,
      validate: {
        validator: validateColor,
        message: 'Invalid color in shoes.'
      }
    }
  });

 

module.exports = mongoose.model('Character', characterSchema);