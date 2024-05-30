const router = require("express").Router();

const contentController = require("../controllers/ContentController");

router.get("/getRecentArticles", contentController.getRecentArticles);

module.exports = router;
