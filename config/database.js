const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const url = process.env.DATABASE_URL;
const connect = () => {
    mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((e) => {
            console.log("database connection failed", e);
            process.exit(1);
        });
};

module.exports = { connect };
