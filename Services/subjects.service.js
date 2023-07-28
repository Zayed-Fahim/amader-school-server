const Admin = require("../Models/Admin");
const Subject = require("../Models/Subject");

exports.addSubjectService = async (data) => {
  const subject = await Subject.create(data);
  const { _id: subjectId, admin } = subject;
  const findAdmin = await Admin.findById({ _id: admin.id });
  if (findAdmin) {
    findAdmin.subjects.push(subjectId);
    await findAdmin.save();
  }
  return subject;
};

exports.getSubjectsService = async () => {
  const result = await Subject.find({});
  return result;
};
