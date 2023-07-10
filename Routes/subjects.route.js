const express = require("express");
const router = express.Router();

const subjectsController = require("../Controllers/subjects.controller");

router
  .route("/")
  .post(subjectsController.addSubject)
  .get(subjectsController.getSubjects);

module.exports = router;
