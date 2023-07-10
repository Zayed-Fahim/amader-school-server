const express = require("express");
const router = express.Router();

const viewRoutineController = require("../Controllers/viewRoutine.controller");

router
  .route("/")
  .post(viewRoutineController.getRoutine)
  

module.exports = router;
