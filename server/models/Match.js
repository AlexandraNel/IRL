const mongoose = require('mongoose');

const { Schema } = mongoose;

const matchSchema = new Schema({
    eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    matcherId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        default: 'available',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const Match = mongoose.model('Match', matchSchema)

module.exports = Match;