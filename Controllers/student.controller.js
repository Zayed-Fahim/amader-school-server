const Student = require("../Models/Student");
const {
  addStudentService,
  getStudentsService,
  getStudentByIdService,
} = require("../Services/student.service");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.addStudent = async (req, res, next) => {
  try {
    const {
      fullName,
      userName,
      gender,
      role,
      fatherName,
      motherName,
      dateOfBirth,
      religion,
      email,
      phoneNumber,
      password,
      schoolTag,
      assignedClass,
      group,
      section,
      rollNumber,
      id,
      photo,
      address,
      shortBio,
      shift,
    } = req.body;

    const studentExists = await Student.exists({ id: id });

    if (studentExists) {
      return res.status(409).json({
        message: "Student with this email or student id already exist.",
      });
    }
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const student = {
        fullName,
        userName,
        gender,
        role,
        fatherName,
        motherName,
        dateOfBirth,
        religion,
        email,
        phoneNumber,
        password: hash,
        schoolTag,
        assignedClass,
        group,
        section,
        rollNumber,
        id,
        photo,
        address,
        shortBio,
        shift,
      };
      const result = await addStudentService(student);
      res.status(200).json({
        status: "Success",
        message: "Student added successfully",
        payload: { result },
      });
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't add this student.",
      error: error.message,
    });
  }
};

exports.getStudent = async (req, res, next) => {
  try {
    const result = await getStudentsService();

    res.status(200).json({
      status: "Success",
      message: "Successfully get all students details",
      payload: { result },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get all student details.",
      error: error.message,
    });
  }
};
