const Admin = require("../Models/Admin");

exports.createAdminService = async (data) => {
  const result = await Admin.create(data);
  return result;
};

exports.getAdminsService = async () => {
  const result = await Admin.find({});
  return result;
};

exports.viewAttendancesDataFilterByDateAndShiftService = async (
  adminId,
  shift,
  date
) => {
  const admin = await Admin.findById(adminId).populate("teachersAttendances");

  const attendanceData = admin.teachersAttendances.filter(
    (attendance) => attendance.shift === shift && attendance.date === date
  );
  return attendanceData;
};
