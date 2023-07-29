const Admin = require("../Models/Admin");
const Teacher = require("../Models/Teacher");

exports.addTeacherService = async (data) => {
  const teacher = await Teacher.create(data);
  //step-1 get {_id,admin}
  const { _id: teacherId, admin } = teacher;

  // update admin
  const findAdmin = await Admin.findOne({ _id: admin.id });
  if (findAdmin) {
    findAdmin.teachers.push(teacherId);
    await findAdmin.save();
  }
  return teacher;
};

exports.getTeachersService = async () => {
  const result = await Teacher.find({});
  return result;
};

exports.viewAttendancesDataFilterByDateService = async (teacherId, date) => {
  try {
    // Find the teacher with the given ID and populate the "advisedStudentsAttendances" field
    const teacher = await Teacher.findById(teacherId).populate(
      "advisedStudentsAttendances"
    );

    // Filter the attendanceData based on the selected date
    const attendanceData = teacher.advisedStudentsAttendances.filter(
      (attendance) => attendance.date === date
    );

    return attendanceData;
  } catch (error) {
    throw new Error("Failed to fetch attendance data.");
  }
};
