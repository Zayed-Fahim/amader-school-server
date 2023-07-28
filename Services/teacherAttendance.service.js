const Admin = require("../Models/Admin");
const TeacherAttendance = require("../Models/TeacherAttendance");

exports.addTeacherAttendanceService = async (data) => {
  const attendanceData = await TeacherAttendance.create(data);
  const { _id: teacherAttendanceId, admin } = attendanceData;

  const findAdmin = await Admin.findById({ _id: admin.id });
  if (findAdmin) {
    findAdmin.teachersAttendances.push(teacherAttendanceId);
    await findAdmin.save();
  }
  return attendanceData;
};

exports.getAllTeacherAttendanceService = () => {
  const teacherAttendance = TeacherAttendance.find({});
  return teacherAttendance;
};

exports.filterGetTeachersByShiftService = async (adminId, shift) => {
  // Find the admin by ID and populate the 'teachers' field
  const admin = await Admin.findById(adminId).populate("teachers");
  // Filter teachers based on the shift
  const filteredTeachers = admin.teachers.filter(
    (teacher) => teacher.shift === shift
  );
  return filteredTeachers;
};
