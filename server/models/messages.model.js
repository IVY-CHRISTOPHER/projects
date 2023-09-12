const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: [true, "User is required"],
    },
    message: {
        type: String,
        required: [true, "Message is required"],
    },
}, { timestamps: true });

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;

