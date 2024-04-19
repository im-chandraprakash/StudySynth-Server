const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema({
    name: String,
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Subject" }],
});

const branchSchema = mongoose.Schema(
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
        image: {
            type: String,
            // required: true,
        },
        semesters: [semesterSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Branch", branchSchema);
