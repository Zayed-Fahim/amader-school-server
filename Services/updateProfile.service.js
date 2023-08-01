const Admin = require("../Models/Admin");
const Student = require("../Models/Student");
const Teacher = require("../Models/Teacher");

exports.updateAdminInfoService = async (data) => {
  const admin = await Admin.findOne({ _id: data.id });
  // Update the admin's profile information
  admin.fullName = data.fullName;
  admin.userName = data.userName;
  admin.photo = data.photo;

  // Save the updated admin data to the database
  await admin.save();
  return admin;
};
exports.updateTeacherInfoService = async (data) => {
  const teacher = await Teacher.findOne({ _id: data.id });
  // Update the teacher's profile information
  teacher.fullName = data.fullName;
  teacher.userName = data.userName;
  teacher.photo = data.photo;
  teacher.fatherName = data.fatherName;
  teacher.motherName = data.motherName;
  teacher.email = data.email;
  teacher.phoneNumber = data.phoneNumber;
  teacher.address = data.address;
  teacher.shortBio = data.shortBio;

  // Save the updated teacher data to the database
  await teacher.save();
  return teacher;
};

exports.updateStudentInfoService = async (data) => {
  const student = await Student.findOne({ _id: data.id });
  // Update the student's profile information
  student.fullName = data.fullName;
  student.userName = data.userName;
  student.photo = data.photo;
  student.fatherName = data.fatherName;
  student.motherName = data.motherName;
  student.email = data.email;
  student.phoneNumber = data.phoneNumber;
  student.address = data.address;
  student.shortBio = data.shortBio;

  // Save the updated student data to the database
  await student.save();
  return student;
};
