const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const runSchema = new Schema({
    character: {
        type: Schema.Types.ObjectId,
        ref: 'Character'
    },
    startTime: {
        type: Number,
        required: true
    },
    endTime: {
        type: Number
    },
    startPosition: {
        type: [Number],
        required: true,
      },
    endPosition: {
        type: [Number]
      },
    duration: {
        type: Number
    },
    distance: {
        type: Number 
    }
 });

 module.exports = mongoose.model('Run', runSchema);