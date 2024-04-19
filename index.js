const express = require("express");
const dotenv = require("dotenv");
const connect = require("./config/database.js");
const morgan = require("morgan");
const cors = require("cors");
const { connectCloudinary } = require("./config/cloudinary.js");
const authRouter = require("./routers/authRouter.js");
const adminRoutes = require("./routers/adminRouter.js");
const subjectRouter = require("./routers/SubjectBranchRouter.js");
const fileUpload = require("express-fileupload");

dotenv.config();
const app = express();

app.use(express.json({ limit: "100mb" }));
app.use(morgan("common"));
app.use("/files", express.static("files"));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

connectCloudinary();

app.use("/auth", authRouter);
app.use("/admin", adminRoutes);
app.use("/subject", subjectRouter);
app.use("/", (req, res) => {
    return res.status(200).send("ok from server");
});

const Port = process.env.PORT || 4001;

connect.connect();
app.listen(Port, () => {
    console.log(`App is running on localhost ${Port}`);
});
