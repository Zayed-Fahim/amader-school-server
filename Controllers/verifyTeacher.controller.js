const Teacher = require("../Models/Teacher");

exports.verifyTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ id: req.teacher?.id });
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
