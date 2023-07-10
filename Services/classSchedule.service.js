const ClassSchedule = require("../Models/ClassSchedule");

exports.addClassScheduleService = async (data) => {
  const result = await ClassSchedule.create(data);
  return result;
};

exports.getClassSchedulesService = async () => {
  const result = await ClassSchedule.find({});
  return result;
};
