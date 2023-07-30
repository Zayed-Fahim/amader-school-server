const StudentAttendance = require("../Models/StudentAttendance");
const Teacher = require("../Models/Teacher");

exports.addAdvisedStudentAttendanceService = async (data) => {
  try {
    const attendanceData = await StudentAttendance.create(data);
    const {
      _id: studentAttendanceId,
      classTeacher,
      date,
      advisedStudentsAttendances,
    } = attendanceData;

    const findTeacher = await Teacher.findById(classTeacher.id).populate(
      "advisedStudents"
    );
    if (!findTeacher) {
      throw new Error("Teacher not found.");
    }

    for (const advisedStudent of findTeacher.advisedStudents) {
      const { _id, shift, id, assignedClass, section } = advisedStudent;
      const advisedStudentAttendanceRecord = advisedStudentsAttendances.find(
        (advisedStudentAttendance) =>
          advisedStudentAttendance.advisedStudent_Id === _id.toString() &&
          advisedStudentAttendance.advisedStudentId === id.toString() &&
          advisedStudentAttendance.advisedStudentShift === shift &&
          advisedStudentAttendance.advisedStudentClass === assignedClass &&
          advisedStudentAttendance.advisedStudentSection === section
      );

      if (advisedStudentAttendanceRecord) {
        // Create a new advised student attendance object
        const newAdvisedStudentAttendance = {
          _id: attendanceData._id,
          date: date,
          attendanceStatus: advisedStudentAttendanceRecord.attendanceStatus,
        };

        // Push the new advised student attendance to the attendances array
        advisedStudent.attendances.push(newAdvisedStudentAttendance);
      }
    }

    findTeacher.advisedStudentsAttendances.push(studentAttendanceId);

    await Promise.all([
      findTeacher.save(),
      ...findTeacher.advisedStudents.map((advisedStudent) =>
        advisedStudent.save()
      ),
    ]);

    return attendanceData;
  } catch (error) {
    console.error(error);

    // Handle specific types of errors
    if (error.name === "ValidationError") {
      throw new Error("Validation error occurred.");
    } else if (error.name === "MongoError" && error.code === 11000) {
      throw new Error("Duplicate key error occurred.");
    } else {
      throw new Error("Failed to add teacher attendance.");
    }
  }
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
