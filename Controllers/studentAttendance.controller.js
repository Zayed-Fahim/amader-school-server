const {
  filterGetAttendanceService,
  getAllAdvisedStudentAttendanceService,
  addAdvisedStudentAttendanceService,
} = require("../Services/studentAttendance.service");

exports.addAdvisedStudentsAttendances = async (req, res) => {
  try {
    const result = await addAdvisedStudentAttendanceService(req.body);
    res.status(201).json({
      status: "Success",
      message: "Attendance data added successfully",
      payload: { result },
    });
  } catch (error) {
    res.status(500).json({ message: `${error.message}` });
  }
};
// "Error occurred while adding attendance data"

exports.getAllAdvisedStudentsAttendance = async (req, res) => {
  try {
    const result = await getAllAdvisedStudentAttendanceService();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while fetching attendance data" });
  }
};

exports.filterGetAdvisedStudents = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const advisedStudents = await filterGetAttendanceService(teacherId);
    res.status(200).json({ status: "Success", payload: { advisedStudents } });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch advisedStudents." });
  }
};
