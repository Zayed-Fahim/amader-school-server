const Admin = require("../Models/Admin");
const TeacherAttendance = require("../Models/TeacherAttendance");

exports.addTeacherAttendanceService = async (data) => {
  const attendanceData = await TeacherAttendance.create(data);
  const { _id: teacherAttendanceId, admin } = attendanceData;
  const result = await Admin.updateOne(
    {
      _id: admin.id,
    },
    { $push: { teacherAttendance: teacherAttendanceId } }
  );

  return attendanceData;
};

exports.getAllTeacherAttendanceService = () => {
  const teacherAttendance = TeacherAttendance.fine({});
  return teacherAttendance;
};
