const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true],
        minlength: [3]
    },
    description: {
        type: String,
        required: [true],
        minlength: [3]
    },
    date: {
        type: String,
        required: [true],
    },
    where: {
        type: String,
        required: [true]
    },
    User_Id: {
        type: String,
        required: [true]
    },
    User_Name: {
        type: String,
        required: [true]
    },
    createdAt: {
        type: String,
        required: [true]
    }
});

const Events = mongoose.model('Events', EventSchema);

module.exports = Events