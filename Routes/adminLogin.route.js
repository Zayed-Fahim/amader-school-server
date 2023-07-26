const express = require("express");
const router = express.Router();
const verifyAdminToken = require("../Middleware/verifyAdminToken");
const loginAdminController = require("../Controllers/adminLogin.controller");

router.post("/", loginAdminController.loginAdminByEmail);
router.get("/verify-admin", verifyAdminToken, loginAdminController.verifyAdmin);

module.exports = router;
