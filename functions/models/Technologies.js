const mongoose = require("mongoose");

const Technologies = mongoose.model("technologies", {
    title: {
        type: String,
        required: true
    },
    content: {
        type: [String],
        required: true
    },
    references: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date(Date.now())
    }
})

module.exports = Technologies;