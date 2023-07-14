const Admin = require("../Models/Admin");
const ClassSchedule = require("../Models/ClassSchedule");

exports.addClassScheduleService = async (data) => {
  const classSchedule = await ClassSchedule.create(data);
  const { _id: scheduleId, admin } = classSchedule;
  const findAdmin = await Admin.exists({ _id: admin.id });
  if (findAdmin) {
    findAdmin.classSchedules.push(scheduleId);
    await findAdmin.save();
  }
  return classSchedule;
};

exports.getClassSchedulesService = async () => {
  const result = await ClassSchedule.find({});
  return result;
};
