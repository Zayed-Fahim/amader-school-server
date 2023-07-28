const Admin = require("../Models/Admin");

exports.updateAdminInfoService = async (data) => {
  const admin = await Admin.findOne({ _id: data.id });
  // Update the admin's profile information
  admin.fullName = data.fullName;
  admin.userName = data.userName;
  admin.photo = data.photo;

  // Save the updated admin data to the database
  return await admin.save();
};
// exports.updateTeacherInfoService = (data) => {};
// exports.updateStudentInfoService = (data) => {};
