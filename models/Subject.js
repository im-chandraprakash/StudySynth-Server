const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        key: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        semester: {
            type: String,
            required: true,
        },
        unit1: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Content",
            },
        ],
        unit2: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Content",
            },
        ],
        unit3: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Content",
            },
        ],
        unit4: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Content",
            },
        ],
        unit5: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Content",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Subject", subjectSchema);
