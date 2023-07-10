const express = require("express");
const router = express.Router();

const addRoutineController = require("../Controllers/addRoutine.controller");

router.route("/").post(addRoutineController.addRoutine);

module.exports = router;
