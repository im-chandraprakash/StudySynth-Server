const mongoose = require("mongoose");

// Add Frequently Asked doubts in specific topic :

const contentSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trime: true,
        },
        content: {
            type: String,
            required: true,
        },
        yearOfRepeatition: [
            {
                type: String,
                trim: true,
            },
        ],
        contentType: {
            type: String,
            enum: ["Article", "Topic"],
            required: true,
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
        },
        isImp: {
            type: String,
        },
        accuracy: {
            type: String,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Content", contentSchema);
