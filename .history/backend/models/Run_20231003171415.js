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
        validate: {
          validator: function (value) {
            return Array.isArray(value) && value.length === 2;
          },
          message: 'Invalid coordinates format for startPosition.'
        }
      },
    endPosition: {
        type: [Number]
        // validate: {
        //   validator: function (value) {
        //     return Array.isArray(value) && value.length === 2;
        //   },
        //   message: 'Invalid coordinates format for endPosition.'
        // }
      },
    duration: {
        type: Number
    },
    distance: {
        type: Number 
    }
 });

 module.exports = mongoose.model('Run', runSchema);