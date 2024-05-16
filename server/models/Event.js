const mongoose = require('mongoose');
const User = require('./User');

const { Schema } = mongoose;

const eventSchema = new Schema({
    name: {
        type: String,
        maxLength: 50,
        required: true
    },
    description: {
        type: String,
        maxLength: 250
    },
    dateRange: {
        type: String,
        // enum: ["This Week", "This Weekend", "Next Weekend", "This Month", "Next Month", "Whenever", "Let's Make A Plan"],
        trim: true,
    },
    creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            
    },
    matches: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],

    finalMatch: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],  

});


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;