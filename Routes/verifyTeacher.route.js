const express = require("express");
const router = express.Router();
const verifyTeacherToken = require("../Middleware/verifyTeacherToken");

const verifyTeacherController = require("../Controllers/verifyTeacher.controller");

router
  .route("/verify-teacher")
  .get(verifyTeacherToken, verifyTeacherController.verifyTeacher);

module.exports = router;
