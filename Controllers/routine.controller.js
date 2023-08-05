const Routine = require("../Models/Routine");
const {
  addRoutineService,
  getRoutinesService,
} = require("../Services/routine.service");

exports.addRoutine = async (req, res, next) => {
  try {
    const { shift, group, routineVersion, assignedClass } = req.body;
    const routineAlreadyExists = await Routine.exists({
      $and: [
        { shift: shift },
        { group: group },
        { assignedClass: assignedClass },
        { routineVersion: routineVersion },
      ],
    });
    if (routineAlreadyExists) {
      return res.status(409).json({
        message: "This version of Routine is already assigned for class",
      });
    }
    const result = await addRoutineService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Routine Assigned Successfully",
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

exports.getRoutines = async (req, res) => {
  const routines = await getRoutinesService();
  res.status(200).json({ payload: routines });
};
