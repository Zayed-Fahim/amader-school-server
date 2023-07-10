const express = require("express");
const router = express.Router();

const teacherController = require("../Controllers/teacher.controller");

router
  .route("/")
  .post(teacherController.addTeacher)
  .get(teacherController.getTeachers);


module.exports = router;
