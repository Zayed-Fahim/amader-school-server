const ClassSchedule = require("../Models/ClassSchedule");
const {
  addClassScheduleService,
  getClassSchedulesService,
} = require("../Services/classSchedule.service");

exports.addClassSchedule = async (req, res, next) => {
  try {
    const {
      teacherID,
      teachingClass,
      teachingSection,
      teachingGroup,
      subjectName,
      teachingShift,
      dateOfClass,
      classTime,
    } = req.body;
    const scheduleAlreadyExists = await ClassSchedule.exists({
      $and: [
        { teacherID: teacherID },
        { teachingClass: teachingClass },
        { teachingSection: teachingSection },
        { teachingGroup: teachingGroup },
        { subjectName: subjectName },
        { teachingShift: teachingShift },
        { dateOfClass: dateOfClass },
        { classTime: classTime },
      ],
    });
    if (scheduleAlreadyExists) {
      return res.status(409).json({
        message: "This Class Schedule is already assigned!.",
      });
    }
    const result = await addClassScheduleService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Class Schedule Assigned Successfully",
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

exports.getClassSchedules = async (req, res, next) => {
  try {
    const result = await getClassSchedulesService();
    res.status(200).json({
      status: "Success",
      message: "All class schedule is given below:",
      payload: { result },
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't get class schedules.",
      error: error.message,
    });
  }
  next();
};
