const express = require("express");
const router = express.Router();
const verifyStudentToken = require("../Middleware/verifyStudentToken");

const loginStudentController = require("../Controllers/studentLogin.controller");

router.route("/").post(loginStudentController.loginStudentById);
router
  .route("/verify-Student")
  .get(verifyStudentToken, loginStudentController.verifyStudent);

module.exports = router;
