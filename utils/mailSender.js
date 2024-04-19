const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        // const transporter = nodemailer.createTransport({
        //     host: "",
        //     auth: {
        //         user: "",
        //         pass: "",
        //     },
        // });

        let transportor = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            // port: 587,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.USER_PASS,
            },
        });

        let info = await transportor.sendMail({
            from: "Studysynth || by - Chandraprakash sahu",
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email info : ", info);

        return info;
    } catch (error) {
        console.log(error);
    }
};

module.exports = mailSender;
