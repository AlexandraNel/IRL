const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
    name: {
        type: String,
        maxLength: 50,
        required: true
    },
    description: {
        type: String,
        maxLength: 100
    },
    dateRange: {
        startDate: {
            type: Date,
            
        endDate: {
            type: Date,
            
        }
    }
}});


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;