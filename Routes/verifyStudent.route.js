const express = require("express");
const router = express.Router();
const verifyStudentToken = require("../Middleware/verifyStudentToken");

const verifyStudentController = require("../Controllers/verifyStudent.controller");

router
  .route("/verify-student")
  .get(verifyStudentToken, verifyStudentController.verifyStudent);

module.exports = router;
