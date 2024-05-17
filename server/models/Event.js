const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const { Schema } = mongoose;

const eventSchema = new Schema({
    name: {
        type: String,
        required: 'You need to have a name!',
        maxLength: 50,
        trim: true,
    },

    description: {
        type: String,
        maxLength: 250,
        required: 'You need to have a description!',
        trim: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    dateRange: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;