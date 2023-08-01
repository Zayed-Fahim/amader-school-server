const {
  updateAdminInfoService,
  updateTeacherInfoService,
  updateStudentInfoService,
} = require("../Services/updateProfile.service");

exports.updateAdminInfo = async (req, res) => {
  try {
    const updated = await updateAdminInfoService(req.body);
    res
      .status(200)
      .json({ status: "Successful", message: "Successfully updated!" });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Error updating profile",
      error: error.message,
    });
  }
};

exports.updateTeacherInfo = async (req, res) => {
  try {
    const updated = await updateTeacherInfoService(req.body);
    res
      .status(200)
      .json({ status: "Successful", message: "Successfully updated!" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", message: "Error updating profile" });
  }
};

exports.updateStudentInfo = async (req, res) => {
  try {
    const updated = await updateStudentInfoService(req.body);
    res
      .status(200)
      .json({ status: "Successful", message: "Successfully updated!" });
  } catch (error) {
    res
      .status(500)
      .json({ status: "Error", message: "Error updating profile" });
  }
};
