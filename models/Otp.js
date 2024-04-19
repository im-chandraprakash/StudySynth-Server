const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const otpSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 4,
    },
});

async function sendVarificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Varification Email",
            `<h1> Please confirm your OTP </h1>
             <p> Here is your OTP code : ${otp}`
        );

        console.log("Email sent Successfully", mailResponse);
    } catch (error) {
        console.log("Error occur while sending mail", error);
        throw error;
    }
}

otpSchema.pre("save", async function (next) {
    if (this.isNew) {
        await sendVarificationEmail(this.email, this.otp);
    }
    next();
});

// implement post middleware which will confirm a user successful registration.

module.exports = mongoose.model("otp", otpSchema);
