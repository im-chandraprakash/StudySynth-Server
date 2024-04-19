const router = require("express").Router();
const subjeBranchController = require("../controllers/BranchAndSubject");
const contentController = require("../controllers/ContentController");

router.post("/getInfoAboutSubject", subjeBranchController.getInfoAboutSubject);
router.post("/getSingleArticle", contentController.getSingleContent);
router.post("/getAllAboutBranch", subjeBranchController.getAllAboutBranch);
module.exports = router;
