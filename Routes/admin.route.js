const express = require("express");
const router = express.Router();

const adminController = require("../Controllers/admin.controller");

router
  .route("/")
  .post(adminController.createAdmin)
  .get(adminController.getAdmins);
router
  .route("/:adminId/teachersAttendances")
  .get(adminController.viewAttendancesDataFilterByDateAndShift);
module.exports = router;
