const { Errors, Success } = require("../utils/wrapper");
const User = require("../models/User");

exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate("additionalDetails");

        if (!user) {
            return res.send(Errors(404, "User not found"));
        }

        return res.send(Success(200, "user data fetched", user));
    } catch (error) {
        return res.send(Errors(500, error.message));
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, dob, contactNumber, gender, about } =
            req.body;

        const userId = req.user._id;

        const user = await User.findById(userId).populate("additionalDetails");

        if (!user) {
            return res.send(Errors(400, "User does not exist"));
        }

        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
        if (about) {
            user.about = about;
        }
        if (dob) {
            user.dob = dob;
        }
        if (contactNumber) {
            user.contactNumber = contactNumber;
        }
        if (gender) {
            user.gender = gender;
        }

        await user.save();

        const userUpdatedData = await User.findById(userId).populate(
            "additionalDetails"
        );

        return res.send(
            Success(200, "user updated Successfully", userUpdatedData)
        );
    } catch (error) {
        return res.send(Errors(500, error.message));
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.send(Errors(400, "User not found "));
        }

        // delete operatio is crucial
        // learn about crone job
        // delete use r profile as well

        
    } catch (error) {
        return res.send(Errors(500, error.message));
    }
};
