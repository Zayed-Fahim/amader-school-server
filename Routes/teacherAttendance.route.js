const express = require("express");
const router = express.Router();

const teacherAttendanceController = require("../Controllers/teacherAttendance.controller");

router
  .route("/")
  .post(teacherAttendanceController.addTeacherAttendance)
  .get(teacherAttendanceController.getAllTeacherAttendance);
router
  .route("/admins/:adminId/teachers")
  .get(teacherAttendanceController.filterGetTeachersByShift);

module.exports = router;
