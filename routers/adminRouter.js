const router = require("express").Router();
const contentController = require("../controllers/ContentController");
const BranchAndSubjectController = require("../controllers/BranchAndSubject");
const { requireUser, requireAdmin } = require("../middlewares/Auth");

router.post(
    "/createContent",
    requireUser,
    requireAdmin,
    contentController.createContent
);
router.post(
    "/createSubject",
    requireUser,
    requireAdmin,
    BranchAndSubjectController.createSubject
);
router.post(
    "/getfilteredSubjects",
    BranchAndSubjectController.getFilteredSubjects
);
router.post(
    "/createBranch",
    requireUser,
    requireAdmin,
    BranchAndSubjectController.createBranch
);
router.post(
    "/addSyllabus",
    requireUser,
    requireAdmin,
    BranchAndSubjectController.uploadSyllabus
);

router.get(
    "/getAllBranchs",

    BranchAndSubjectController.getAllBranches
);
router.get(
    "/getAllSubjects",

    BranchAndSubjectController.getAllSubjects
);
router.get(
    "/showContents",
    requireUser,
    requireAdmin,
    contentController.getAllContents
);

module.exports = router;
