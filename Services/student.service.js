const Admin = require("../Models/Admin");
const Student = require("../Models/Student");
const Teacher = require("../Models/Teacher");

exports.addStudentService = async (data) => {
  const student = await Student.create(data);
  const { _id: studentId, classTeacher, schoolAuthority } = student;

  const findTeacher = await Teacher.findOne({ _id: classTeacher.id });
  if (findTeacher) {
    findTeacher.advisedStudents.push(studentId);
    await findTeacher.save();
  }
  const findAdmin = await Admin.findOne({ _id: schoolAuthority.id });
  if (findAdmin) {
    findAdmin.students.push(studentId);
    await findAdmin.save();
  }
};

exports.getStudentsService = async () => {
  const result = await Student.find({});
  return result;
};
exports.getStudentByIdService = async (id) => {
  const student = await Student.find({ id: id });
  return student;
};
