const express = require("express");
const router = express.Router();
const verifyTeacherToken = require("../Middleware/verifyTeacherToken");

const loginTeacherController = require("../Controllers/teacherLogin.controller");

router.route("/").post(loginTeacherController.loginTeacherById);
router
  .route("/verify-teacher")
  .get(verifyTeacherToken, loginTeacherController.verifyTeacher);

module.exports = router;
