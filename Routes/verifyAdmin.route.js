const express = require("express");
const router = express.Router();
const verifyAdminToken = require("../Middleware/verifyAdminToken");

const verifyAdminController = require("../Controllers/verifyAdmin.controller");

router
  .route("/verify-admin")
  .get(verifyAdminToken, verifyAdminController.verifyAdmin);

module.exports = router;
