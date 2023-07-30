const express = require("express");
const router = express.Router();

const resultController = require("../Controllers/result.controller");

router.route("/").post(resultController.addResult);

module.exports = router;
