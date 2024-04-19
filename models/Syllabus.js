const mongoose = require("mongoose");

const syllabusSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        fileUrl: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Syllabus", syllabusSchema);
