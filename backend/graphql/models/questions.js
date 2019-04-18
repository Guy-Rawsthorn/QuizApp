const mongoose = require('mongoose');

const questionsSchema = mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        value: false
    }
});

module.exports = mongoose.model('Questions', questionsSchema);