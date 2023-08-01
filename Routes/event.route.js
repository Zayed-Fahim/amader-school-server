const express = require("express");
const router = express.Router();

const eventController = require("../Controllers/event.controller");

router.route("/").post(eventController.addEvent);
module.exports = router;
