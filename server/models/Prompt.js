const mongoose = require('mongoose');

const { Schema } = mongoose;

const promptSchema = new Schema ({
    promptText: {
        type: String,
        required: true,
        maxLength: 100
    },
    answer: {
        type: String,
        required: true,
        maxLength: 100
    }
})

const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;