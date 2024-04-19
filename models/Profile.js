const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
    gender: {
        type: String,
        enum: ["male", "female", "other"],
    },
    dob: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    about: {
        type: String,
    },
});

module.exports = mongoose.model("profile", profileSchema);
