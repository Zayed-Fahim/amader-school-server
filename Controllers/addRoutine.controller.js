const Routine = require("../Models/Routine");
const { addRoutineService } = require("../Services/addRoutine.service");

exports.addRoutine = async (req, res, next) => {
  try {
    const {
      day,
      shift,
      subject,
      section,
      group,
      teacherName,
      time,
      assignedClass,
    } = req.body;
    const routineAlreadyExists = await Routine.exists({
      $and: [
        { day: day },
        { shift: shift },
        { subject: subject },
        { section: section },
        { group: group },
        { teacherName: teacherName },
        { time: time },
        { assignedClass: assignedClass },
      ],
    });
    if (routineAlreadyExists) {
      return res.status(409).json({
        message: "Weekly Routine is already assigned!.",
      });
    }
    const result = await addRoutineService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Routine Assigned Successfully",
      payload: { result },
    });
  } catch (error) {
    res.status(444).json({
      status: "Failed",
      message: "Ops! Something Wrong!.",
      error: error.message,
    });
  }
  next();
};
