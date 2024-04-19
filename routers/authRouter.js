const router = require("express").Router();
const authController = require("../controllers/Auth");
const { requireUser } = require("../middlewares/Auth");

router.post("/login", authController.loginController);
router.post("/signUp", authController.signupController);
router.post("/sendotp", authController.generateOTP);
router.post("/resetPassword", requireUser, authController.resetPassword);

module.exports = router;
