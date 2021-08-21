const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    location: { type: String, required: true },
    weather: { type: String, required: true }
});

module.exports = mongoose.model('Event', eventSchema);
