const express = require("express");
const router = express.Router();

const routineController = require("../Controllers/routine.controller");

router.route("/").post(routineController.addRoutine).get(routineController.getRoutines);

module.exports = router;
