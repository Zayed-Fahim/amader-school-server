const express = require("express");
const router = express.Router();

const noticeController = require("../Controllers/notice.controller");

router.route("/").post(noticeController.addNotice);

module.exports = router;
