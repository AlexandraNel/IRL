const mongoose = require('mongoose');

const { Schema } = mongoose;

const matchSchema = new Schema({
   eventId: {
        type: Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    posterId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    responderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

const Match = mongoose.model('Match', matchSchema);

module.exports = Match;