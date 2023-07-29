const express = require("express");
const router = express.Router();

const studentAttendanceController = require("../Controllers/studentAttendance.controller");

router
  .route("/")
  .post(studentAttendanceController.addAdvisedStudentsAttendances)
  .get(studentAttendanceController.getAllAdvisedStudentsAttendance);

router
  .route("/teachers/:teacherId/advisedStudents")
  .get(studentAttendanceController.filterGetAdvisedStudents);

module.exports = router;
