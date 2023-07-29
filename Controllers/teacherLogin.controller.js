const createJSONWebToken = require("../Hook/jsonwebtoken");
const bcrypt = require("bcrypt");
const Teacher = require("../Models/Teacher");

exports.loginTeacherById = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const teacherExists = await Teacher.exists({ id: id });
    if (!teacherExists) {
      return res.status(409).json({
        message: "No Teacher found for this id.Please Sign up.",
      });
    }
    const teacher = await Teacher.findOne({ id: id });
    if (teacher) {
      return bcrypt.compare(password, teacher.password, (err, result) => {
        if (result === true) {
          const teacherInfo = {
            role: teacher.role,
            id: teacher.id,
          };
          const secretKey = process.env.ACCESS_TOKEN_SECRET;

          const token = createJSONWebToken(teacherInfo, secretKey, "1d");
          return res
            .status(200)
            .json({ payload: { teacher, token: `${token}` } });
        } else if (err) {
          return res.status(403).json({
            message: "Unauthorized",
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get the Teacher.",
      error: error.message,
    });
  }
  next();
};

exports.verifyTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ id: req.teacher?.id }).populate({
      path: "advisedStudents notices events results advisedStudentsAttendances attendances classSchedules",
      options: { sort: { _id: -1 } },
      strictPopulate: false,
    });

    console.log("from teacher", teacher);
    res.status(200).json({
      message: "Success",
      payload: { teacher },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get the Teacher.",
      error: error.message,
    });
  }
};
