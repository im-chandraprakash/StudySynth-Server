const Subject = require("../models/Subject");
const Branch = require("../models/Branch");
const uploadImages = require("../utils/uploadImages");

const { Errors, Success } = require("../utils/wrapper");

exports.createBranch = async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req?.files?.image;

        if (!name || !description || !image) {
            return res.send(Errors(404, "All fields are required"));
        }

        const isBranch = await Branch.findOne({ name: name });

        if (isBranch) {
            return res.send(Errors(400, "Branch is already created"));
        }

        const uploadedImage = await uploadImages(image, "BranchImages");

        const key = name.toLowerCase().split(" ").join("-");

        const newBranch = await Branch.create({
            name: name,
            description: description,
            image: uploadedImage.secure_url,
            key,
        });

        console.log("this is new Branch", newBranch);

        return res.send(
            Success(200, "new Branch Created Successfully", newBranch)
        );
    } catch (e) {
        return res.send(Errors(500, e.message));
    }
};

exports.getAllBranches = async (req, res) => {
    try {
        const allBranch = await Branch.find(
            {},
            {
                name: true,
                description: true,
                image: true,
                key: true,
                semesters: true,
            }
        ).populate();

        return res.send(Success(200, "fetched all Branches", allBranch));
    } catch (e) {
        return res.send(Errors(500, e.message));
    }
};

//semester

// Subjects ------------->

exports.createSubject = async (req, res) => {
    try {
        const { name, description, semesterName, branchName, key } = req.body;

        const image = req?.files?.image;

        if (
            !name ||
            !description ||
            !semesterName ||
            !branchName ||
            !image ||
            !key
        ) {
            return res.send(Errors(404, "All fields is required"));
        }

        // check in subjects Collection
        const subject = await Subject.findOne({ name: name });

        //check in branch Semester's subject Collection

        if (subject) {
            return res.send(Errors(400, "Subject is already created"));
        }

        const branchData = await Branch.findOne({ name: branchName });

        if (!branchData) {
            return res.send(Errors(404, "branch Name is not found"));
        }

        let semesterIndex = branchData?.semesters.findIndex(
            (sem) => sem.name === semesterName
        );

        if (semesterIndex === -1) {
            const newSemester = {
                name: semesterName,
                subjects: [],
            };
            branchData.semesters = [...branchData.semesters, newSemester];

            console.log("branchdata : ");
        }

        semesterIndex = branchData?.semesters.findIndex(
            (sem) => sem.name === semesterName
        );

        const uploadedImage = uploadImages(image, "BranchImages");

        const newSubject = await Subject.create({
            name: name,
            description: description,
            semester: semesterName,
            image: uploadedImage.secure_url,
            key,
        });

        branchData.semesters[semesterIndex]?.subjects.push(newSubject._id);

        await branchData.save();

        return res.send(
            Success(200, "Subject Created Successfully", {
                "data1 ": newSubject,
                data2: branchData,
            })
        );
    } catch (e) {
        return res.send(Errors(500, e.message));
    }
};

exports.getFilteredSubjects = async (req, res) => {
    try {
        const { branchName, semester } = req.body;

        console.log("get filtered subject", req.body);
        const branch = await Branch.findOne({ name: branchName })
            .populate({
                path: "semesters.subjects",
            })
            .exec();

        console.log("branch data : ", branch);

        if (!branch) {
            return res.send(Errors(404, "Branch not found"));
        }

        const semSubjects = branch.semesters.findIndex(
            (sem) => sem.name == semester
        );

        if (semSubjects === -1) {
            return res.send(Errors(404, "semester not found"));
        }

        const subjects = branch.semesters[semSubjects].subjects;

        return res.send(Success(200, "filtered subjects ", subjects));
    } catch (e) {
        console.log(Errors(500, e.message));
    }
};

exports.getInfoAboutSubject = async (req, res) => {
    try {
        const { subjectKey } = req.body;
        const subjectInfo = await Subject.findOne({ key: subjectKey })
            .populate({
                path: "unit1",
                select: "title _id",
            })
            .exec();

        return res.send(Success(200, "All information is here", subjectInfo));
    } catch (error) {
        return res.send(Errors(500, error.message));
    }
};
exports.getAllSubjects = async (req, res) => {
    try {
        const allSubjects = await Subject.find();

        return res.send(Success(200, "fetched All subjects", allSubjects));
    } catch (e) {
        return res.send(Errors(500, e.message));
    }
};

exports.uploadSyllabus = async (req, res) => {
    try {
        const { fileName } = req.body.fileName;
        const syllabusFile = req.files.file;

        const uploadedFile = await uploadImages(syllabusFile, "Syllabus");

        console.log(uploadedFile);
    } catch (e) {
        return res.send(Errors(500, e.message));
    }
};

exports.getAllAboutBranch = async (req, res) => {
    try {
        const { branchKey } = req.body;

        const branchInfo = await Branch.findOne({ key: branchKey }).populate({
            path: "semesters",
            populate: {
                path: "subjects",
            },
        });

        return res.send(Success(200, "data fetched Successfully", branchInfo));
    } catch (error) {
        return res.send(Errors(500, error.message));
    }
};
