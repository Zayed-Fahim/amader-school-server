const express = require("express");
const router = express.Router();
const verifyAdminToken = require("../Middleware/verifyAdminToken");

const loginAdminController = require("../Controllers/adminLogin.controller");

router.route("/").post(loginAdminController.loginAdminByEmail);
router
  .route("/verify-admin")
  .get(verifyAdminToken, loginAdminController.verifyAdmin);

module.exports = router;
