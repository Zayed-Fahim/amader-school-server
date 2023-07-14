const {
  addTeacherAttendanceService,
  getAllTeacherAttendanceService,
  filterGetTeachersByShiftService,
} = require("../Services/teacherAttendance.service");

exports.addTeacherAttendance = async (req, res) => {
  try {
    const result = await addTeacherAttendanceService(req.body);
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

exports.getAllTeacherAttendance = async (req, res) => {
  try {
    const result = await getAllTeacherAttendanceService();
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while fetching attendance data" });
  }
};

exports.filterGetTeachersByShift = async (req, res) => {
  try {
    const { adminId } = req.params;
    const { shift } = req.query;
    const teachers = await filterGetTeachersByShiftService(adminId, shift);
    res.status(200).json({ status: "Success", payload: { teachers } });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch teachers." });
  }
};

