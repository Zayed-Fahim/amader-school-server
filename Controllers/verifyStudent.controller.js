const Student = require("../Models/Student");

exports.verifyStudent = async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.student?.id });
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
