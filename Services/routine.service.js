const Admin = require("../Models/Admin");
const Routine = require("../Models/Routine");

exports.addRoutineService = async (data) => {
  const routine = await Routine.create(data);
  const { _id: routineId, assignedClass, shift, group, admin } = routine;

  const findAdmin = await Admin.findById(admin.id).populate("students");
  if (findAdmin) {
    findAdmin.routines.push(routineId);

    const matchedStudents = findAdmin.students.filter((student) => {
      return (
        student.assignedClass === assignedClass &&
        student.section === section &&
        student.group === group &&
        student.shift === shift
      );
    });

    if (matchedStudents.length > 0) {
      for (const student of matchedStudents) {
        student.routines.push(routineId);
        await student.save();
      }
    }

    await findAdmin.save();
  }

  return routine;
};

exports.getRoutinesService = async () => {
  const routines = await Routine.find({});

  return routines;
};
