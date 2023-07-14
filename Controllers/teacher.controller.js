const Teacher = require("../Models/Teacher");
const {
  addTeacherService,
  getTeachersService,
} = require("../Services/teacher.service");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.addTeacher = async (req, res, next) => {
  try {
    const {
      id,
      email,
      fullName,
      userName,
      gender,
      role,
      fatherName,
      motherName,
      dateOfBirth,
      religion,
      phoneNumber,
      password,
      schoolTag,
      classTeacher,
      teacherOfClass,
      sectionOfClass,
      teacherOfGroup,
      subjectName,
      photo,
      address,
      shortBio,
      shift,
      admin,
    } = req.body;

    const teacherExists = await Teacher.exists({
      $and: [{ email: email }, { id: id }],
    });

    if (teacherExists) {
      return res.status(409).json({
        message: "Teacher with this email or id is already exist.",
      });
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const teacher = {
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
        classTeacher,
        teacherOfClass,
        sectionOfClass,
        teacherOfGroup,
        subjectName,
        id,
        photo,
        address,
        shortBio,
        shift,
        admin,
      };

      const result = await addTeacherService(teacher);
      res.status(200).json({
        status: "Success",
        message: "Teacher added successfully",
        payload: { result },
      });
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't add this teacher.",
      error: error.message,
    });
  }
};

exports.getTeachers = async (req, res, next) => {
  try {
    const result = await getTeachersService();

    res.status(200).json({
      status: "Success",
      message: "Successfully get all teachers details",
      payload: { result },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get all teachers details.",
      error: error.message,
    });
  }
};
