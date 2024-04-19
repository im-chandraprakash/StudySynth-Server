const { response } = require("express");
const Content = require("../models/Content");
const Subject = require("../models/Subject");
const { Errors, Success } = require("../utils/wrapper");

exports.createContent = async (req, res) => {
    try {
        const {
            title,
            content,
            yearOfAppearance,
            createdBy,
            contentType,
            subjectId,
            isImp,
            unitName,
            accuracy,
        } = req.body;

        console.log("body : ", req.body);

        if (
            !title ||
            !content ||
            !contentType ||
            !subjectId ||
            !unitName ||
            !accuracy
        ) {
            return res.send(Errors(400, "All fields Are required"));
        }

        // check already createdy this topic

        const isTopicCreated = await Content.findOne({ title: title });

        if (isTopicCreated) {
            return res.send(Errors(400, "This Content is already created"));
        }

        const subject = await Subject.findById(subjectId);

        if (!subject) {
            return res.send(Errors(404, "Subject does not found"));
        }

        const yor = yearOfAppearance.split(",");

        const contentData = await Content.create({
            title: title,
            content: content,
            yearOfRepeatition: yor,
            contentType: contentType,
            subjectId: subjectId,
            accuracy: accuracy,
        });

        const updateObject = {};
        updateObject[unitName] = contentData._id;

        await Subject.findByIdAndUpdate(
            subjectId,
            { $push: updateObject },
            { new: true }
        );

        return res.send(
            Success(200, "Content Created Successfully", contentData)
        );
    } catch (e) {
        return res.send(Errors(500, e.message));
    }
};

exports.getAllContents = async (req, res) => {
    try {
        const allData = await Content.find().populate("subjectId").exec();
        return res.send(Success(200, "Here is All Fetched Contents", allData));
    } catch (e) {
        return res.send(Errors(500, e.message));
    }
};

exports.getSingleContent = async (req, res) => {
    try {
        const { contentId } = req.body;
        const content = await Content.findById(contentId);
        return res.send(Success(200, "Succesfully fetched", content));
    } catch (error) {
        return res.send(Errors(500, error.message));
    }
};
