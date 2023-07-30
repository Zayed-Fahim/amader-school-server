const Admin = require("../Models/Admin");
const TeacherAttendance = require("../Models/TeacherAttendance");

exports.addTeacherAttendanceService = async (data) => {
  const attendanceData = await TeacherAttendance.create(data);
  const {
    _id: attendanceId,
    admin,
    date,
    teachersAttendances,
  } = attendanceData;

  try {
    const findAdmin = await Admin.findById(admin.id).populate("teachers");

    if (findAdmin) {
      for (const teacher of findAdmin.teachers) {
        const { _id, shift, id } = teacher;
        const teacherAttendanceRecord = teachersAttendances.find(
          (teacherAttendance) =>
            teacherAttendance.teacher_Id === _id.toString() &&
            teacherAttendance.teacherId === id.toString() &&
            teacherAttendance.teacherShift === shift
        );

        if (teacherAttendanceRecord) {
          // Create a new teacher attendance object
          const newTeacherAttendance = {
            _id: attendanceData._id,
            date: date,
            attendanceStatus: teacherAttendanceRecord.attendanceStatus,
          };

          // Push the new teacher attendance to the attendances array
          teacher.attendances.push(newTeacherAttendance);
        }
      }

      findAdmin.teachersAttendances.push(attendanceId);
      await Promise.all([
        findAdmin.save(),
        ...findAdmin.teachers.map((teacher) => teacher.save()),
      ]);
    }

    return attendanceData;
  } catch (error) {
    console.error(error);
    // Handle error appropriately
    throw new Error("Failed to add teacher attendance.");
  }
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
