const Routine = require("../Models/Routine");

exports.getRoutinesService = async (data) => {
  const result = await Routine.find({
    $and: [
      { assignedClass: data.assignedClass },
      { group: data.group },
      { section: data.section },
      { shift: data.shift },
    ],
  });
  return result;
};
