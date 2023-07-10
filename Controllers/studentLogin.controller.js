const createJSONWebToken = require("../Hook/jsonwebtoken");
const bcrypt = require("bcrypt");
const Student = require("../Models/Student");

exports.loginStudentById = async (req, res, next) => {
  try {
    const { id, password } = req.body;
    const studentExists = await Student.exists({ id: id });
    if (!studentExists) {
      res.status(409).json({
        message: "No Student found for this id.Please Sign up.",
      });
    }
    const student = await Student.findOne({ id: id });
    if (student) {
      return bcrypt.compare(password, student.password, (err, result) => {
        if (result === true) {
          const studentInfo = {
            role: student.role,
            id: student.id,
          };
          const secretKey = process.env.ACCESS_TOKEN_SECRET;

          const token = createJSONWebToken(studentInfo, secretKey, "1d");
          return res
            .status(200)
            .json({ payload: { student, token: `${token}` } });
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
      message: "Couldn't get the Student.",
      error: error.message,
    });
  }
  next();
};

exports.verifyStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.student?.id });
    console.log("from student controller", student);
    res.status(200).json({
      message: "Success",
      payload: { student },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get the Student.",
      error: error.message,
    });
  }
};
