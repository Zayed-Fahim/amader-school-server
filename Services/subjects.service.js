const Subject = require("../Models/Subject");

exports.addSubjectService = async (data) => {
  const result = await Subject.create(data);
  return result;
};

exports.getSubjectsService = async () => {
  const result = await Subject.find({});
  return result;
};
