const Event = require("../Models/Event");
const Student = require("../Models/Student");
const Teacher = require("../Models/Teacher");

exports.addEventService = async (data) => {
  try {
    const event = await Event.create(data);
    const { _id: eventId, assignedClass, shift, eventCreator } = event;
    const matchedStudents = await Student.find({
      $and: [
        { assignedClass: assignedClass },
        { shift: shift },
        { schoolTag: eventCreator.schoolTag },
      ],
    });

    if (matchedStudents) {
      await Promise.all(
        matchedStudents.map(async (matchedStudent) => {
          matchedStudent.events.push(eventId);
          return await matchedStudent.save();
        })
      );
    }

    const findTeacher = await Teacher.findById(eventCreator.id);
    if (findTeacher) {
      findTeacher.events.push(eventId);
      await findTeacher.save();
    }
    return event;
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error adding event:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};
