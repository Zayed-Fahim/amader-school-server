const express = require("express");
const router = express.Router();

const teacherAttendanceController = require("../Controllers/teacherAttendance.controller");

router
  .route("/")
  .post(teacherAttendanceController.addTeacherAttendance)
  .get(teacherAttendanceController.getAllTeacherAttendance);

module.exports = router;
