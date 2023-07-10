const express = require("express");
const router = express.Router();

const classScheduleController = require("../Controllers/classSchedule.controller");

router
  .route("/")
  .post(classScheduleController.addClassSchedule)
  .get(classScheduleController.getClassSchedules);

module.exports = router;
