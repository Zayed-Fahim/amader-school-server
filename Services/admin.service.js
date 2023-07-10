const Admin = require("../Models/Admin");

exports.createAdminService = async (data) => {
  const result = await Admin.create(data);
  return result;
};

exports.getAdminsService = async () => {
  const result = await Admin.find({}).populate("students").populate("teachers");
  return result;
};

