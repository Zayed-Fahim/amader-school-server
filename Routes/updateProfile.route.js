const express = require("express");
const router = express.Router();

const updateProfileController = require("../Controllers/updateProfile.controller");

router
  .route("/update-admin-info")
  .patch(updateProfileController.updateAdminInfo);
router
  .route("/update-teacher-info")
  .patch(updateProfileController.updateTeacherInfo);
router
  .route("/update-student-info")
  .patch(updateProfileController.updateStudentInfo);

module.exports = router;
