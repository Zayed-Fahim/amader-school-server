const Routine = require("../Models/Routine");

exports.addRoutineService = async (data) => {
  const result = await Routine.create(data);
  return result;
};


