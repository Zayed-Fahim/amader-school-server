const {
  addTeacherAttendanceService,
} = require("../Services/teacherAttendance.service");

exports.addTeacherAttendance = async (req, res) => {
  try {
    const result = await addTeacherAttendanceService(req.body);
    
    res.status(201).json({ message: "Attendance data added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error occurred while adding attendance data" });
  }
};

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
