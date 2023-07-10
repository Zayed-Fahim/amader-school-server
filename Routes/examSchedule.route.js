const express = require("express");
const router = express.Router();

const examScheduleController = require("../Controllers/examSchedule.controller");

router
  .route("/")
  .post(examScheduleController.createExamSchedule)
  .get(examScheduleController.getExamsSchedule);

module.exports = router;
