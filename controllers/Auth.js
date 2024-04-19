const User = require("../models/User");
const Otp = require("../models/Otp");
const Profile = require("../models/Profile");
const { Success, Errors } = require("../utils/wrapper");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword } = req.body;
        const userId = req.user._id;

        if (!password || !confirmPassword) {
            return res.send(Errors(400, "All Fields are required"));
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.send(Errors(404, "user not found"));
        }

        console.log("Step -1 ");
        if (await bcrypt.compare(password, user.password)) {
            //1 Hash the new Password
            console.log("Step - 2");
            const hashedPassword = await bcrypt.hash(confirmPassword, 10);

            user.password = hashedPassword;
            await user.save();

            console.log("Last Step - 3");
            return res.send(
                Success(200, "Password Changed Successfully", user)
            );
        } else {
            return res.send(Errors(500, "User Password does not match"));
        }
    } catch (e) {
        return res.send(Errors(500, e.message));
    }
};
const generateOTP = async (req, res) => {
    try {
        // const userId = req?.user._id;

        // const user = await User.findById(userId);

        // if (user) {
        //     return res.send(Errors(404, "User exist Already"));
        // }

        // generateOTP

        const { email } = req.body;

        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let result = await Otp.findOne({ otp });

        while (result) {
            const otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            result = await Otp.findOne({ otp });
        }

        const otpPayload = { email, otp };

        const otpBody = await Otp.create(otpPayload);

        return res.send(Success(200, "Otp Generated Successfully", otpBody));
    } catch (e) {
        return res.send(Errors(500, e.message));
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.send(Errors(400, "All fields are required"));
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.send(Errors(400, "User not Exists"));
        }

        if (await bcrypt.compare(password, user.password)) {
            const options = {
                _id: user._id,
            };

            // create access token

            const accessToken = jwt.sign(
                options,
                process.env.ACCESS_TOKEN_SIGNATURE,
                {
                    expiresIn: "2d",
                }
            );

            const refreshToken = jwt.sign(
                options,
                process.env.REFRESH_TOKEN_SIGNATURE,
                {
                    expiresIn: "1y",
                }
            );

            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
            });

            return res.send(
                Success(200, "User Logged in successfully", accessToken)
            );
            // create refresh token
        }
    } catch (e) {
        return res.send(Errors(500, e.message));
    }
};

const signupController = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, otp } =
            req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !confirmPassword ||
            !otp
        ) {
            return res.send(Errors(404, "All fields are required"));
        }

        if (password !== confirmPassword) {
            return res.send(
                Errors(400, "password and confirmPassword doesn't match")
            );
        }

        const otpResponse = await Otp.find({ otp: otp })
            .sort({ createdAt: -1 })
            .limit(1);

        // console.log(otpResponse);
        if (!otpResponse.length === 0 || otp !== otpResponse[0].otp) {
            return res.send(Errors(400, "Otp is not valid"));
        }

        const userProfile = await Profile.create({});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            additionalDetails: userProfile._id,
            image: `https://api.dicebear.com/5.x/initials/svg/seed=${firstName} ${lastName}`,
        });

        return res.send(Success(200, "User created Successfully", user));
    } catch (e) {
        console.log(e);
        return res.send(Errors(500, e.message));
    }
};

module.exports = {
    generateOTP,
    loginController,
    signupController,
    resetPassword,
};
