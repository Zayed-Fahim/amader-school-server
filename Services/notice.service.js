const Notice = require("../Models/Notice");
const Admin = require("../Models/Admin");
const Teacher = require("../Models/Teacher");
const Student = require("../Models/Student");
const { ObjectId } = require("mongoose").Types;

exports.addNoticeService = async (data) => {
  const notice = await Notice.create(data);
  const { _id: noticeId, admin } = notice; // Assuming the admin ID is provided as data.admin
  // Make sure the admin ID is a valid ObjectId
  if (admin.id && !ObjectId.isValid(admin.id)) {
    throw new Error("Invalid admin ID");
  }
  const findAdmin = await Admin.findById(admin.id);
  if (findAdmin) {
    const teacherIds = findAdmin.teachers.map((teacher) => teacher._id);
    const studentIds = findAdmin.students.map((student) => student._id);

    // Loop through each teacher and add noticeId to their notices array
    for (const teacherId of teacherIds) {
      const teacher = await Teacher.findById(teacherId);
      if (teacher) {
        teacher.notices.push(noticeId);
        await teacher.save();
      }
    }

    // Loop through each student and add noticeId to their notices array
    for (const studentId of studentIds) {
      const student = await Student.findById(studentId);
      if (student) {
        student.notices.push(noticeId);
        await student.save();
      }
    }

    // Add the noticeId to the admin's notices array
    findAdmin.notices.push(noticeId);
    await findAdmin.save();
  }

  return notice;
};
