const express = require("express");
const router = express.Router();

const teacherController = require("../Controllers/teacher.controller");

router
  .route("/")
  .post(teacherController.addTeacher)
  .get(teacherController.getTeachers);

router
  .route("/:teacherId/advisedStudentsAttendances")
  .get(teacherController.viewAttendancesDataFilterByDate);
  
module.exports = router;
