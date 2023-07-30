const Admin = require("../Models/Admin");
const Result = require("../Models/Result");
const Teacher = require("../Models/Teacher");

exports.addResultService = async (data) => {
  try {
    // Validate data here if needed

    const result = await Result.create(data);
    const {
      _id: resultId,
      admin,
      studentId,
      rollNumber: studentRollNumber,
      studentClass,
      classTeacher,
      section: studentSection,
    } = result;

    const findAdmin = await Admin.findById(admin.id);
    if (findAdmin) {
      findAdmin.results.push(resultId);
      await findAdmin.save();
    }

    const findTeacher = await Teacher.findById(classTeacher.id).populate(
      "advisedStudents"
    );
    if (findTeacher) {
      for (const advisedStudent of findTeacher.advisedStudents) {
        const { id, rollNumber, assignedClass, section } = advisedStudent;
        if (
          studentId === id.toString() &&
          studentRollNumber === rollNumber &&
          studentClass === assignedClass &&
          studentSection === section
        ) {
          advisedStudent.results.push(resultId);
          await advisedStudent.save();
        }
      }
    }

    findTeacher.results.push(resultId);
    await findTeacher.save();

    return result;
  } catch (error) {
    console.error(error);
    // Handle the error appropriately (e.g., return an error response or throw an error)
    throw new Error("Failed to add result.");
  }
};
