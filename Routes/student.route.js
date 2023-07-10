const express = require("express");
const router = express.Router();

const studentController = require("../Controllers/student.controller");

router
  .route("/")
  .post(studentController.addStudent)
  .get(studentController.getStudent);

module.exports = router;
