const StudentAttendance = require("../Models/StudentAttendance");
const Teacher = require("../Models/Teacher");

exports.addAdvisedStudentAttendanceService = async (data) => {
  const attendanceData = await StudentAttendance.create(data);
  const { _id: studentAttendanceId, classTeacher } = attendanceData;

  const findTeacher = await Teacher.findById({ _id: classTeacher.id });
  if (findTeacher) {
    findTeacher.advisedStudentsAttendances.push(studentAttendanceId);
    await findTeacher.save();
  }
  return attendanceData;
};

exports.getAllAdvisedStudentAttendanceService = () => {
  const advisedStudentAttendance = StudentAttendance.find({});
  return advisedStudentAttendance;
};

exports.filterGetAttendanceService = async (teacherId) => {
  // Find the admin by ID and populate the 'teachers' field
  const teacher = await Teacher.findById(teacherId).populate("advisedStudents");
  // Filter advisedStudents
  const advisedStudents = teacher.advisedStudents;
  return advisedStudents;
};
