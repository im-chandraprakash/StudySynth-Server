const router = require("express").Router();
const contentController = require("../controllers/ContentController");
const BranchAndSubjectController = require("../controllers/BranchAndSubject");

router.post("/createContent", contentController.createContent);
router.post("/createSubject", BranchAndSubjectController.createSubject);
router.post(
    "/getfilteredSubjects",
    BranchAndSubjectController.getFilteredSubjects
);
router.post("/createBranch", BranchAndSubjectController.createBranch);
router.post("/addSyllabus", BranchAndSubjectController.uploadSyllabus);

router.get("/getAllBranchs", BranchAndSubjectController.getAllBranches);
router.get("/getAllSubjects", BranchAndSubjectController.getAllSubjects);
router.get("/showContents", contentController.getAllContents);

module.exports = router;
