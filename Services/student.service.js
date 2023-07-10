const Admin = require("../Models/Admin");
const Student = require("../Models/Student");

exports.addStudentService = async (data) => {
  const student = await Student.create(data);
  //step-1 get {_id,admin}
  const { _id: studentId } = student;

  // update admin
  const result = await Admin.updateOne({ $push: { students: studentId } });
  return student;
};

exports.getStudentsService = async () => {
  const result = await Student.find({});
  return result;
};
exports.getStudentByIdService = async (id) => {
  const student = await Student.find({ id: id });
  return student;
};
