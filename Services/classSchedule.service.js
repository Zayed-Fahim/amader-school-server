const Admin = require("../Models/Admin");
const ClassSchedule = require("../Models/ClassSchedule");
const Teacher = require("../Models/Teacher");

exports.addClassScheduleService = async (data) => {
  const classSchedule = await ClassSchedule.create(data);
  const {
    _id: scheduleId,
    admin,
    teacherID,
    teachingShift,
    teacherEmail,
  } = classSchedule;

  const findAdmin = await Admin.findById(admin.id);

  if (findAdmin) {
    findAdmin.classSchedules.push(scheduleId);
    await findAdmin.save();

    // Find the specific teacher using teacherID, teachingShift, and teacherEmail
    const foundTeacher = await Teacher.findOne({
      $and: [
        { id: teacherID },
        { shift: teachingShift },
        { email: teacherEmail },
        { schoolTag: admin.schoolTag },
      ],
    });

    if (foundTeacher) {
      foundTeacher?.classSchedules?.push(scheduleId);
      await foundTeacher.save();
    }
  }

  return classSchedule;
};

exports.getClassSchedulesService = async () => {
  const result = await ClassSchedule.find({});
  return result;
};
