const Admin = require("../Models/Admin");
const Teacher = require("../Models/Teacher");

exports.addTeacherService = async (data) => {
  const teacher = await Teacher.create(data);
  //step-1 get {_id,admin}
  const { _id: teacherId, admin } = teacher;

  // update admin
  const result = await Admin.updateOne(
    {
      _id: admin.id,
    },
    { $push: { teachers: teacherId } }
  );

  return teacher;
};

exports.getTeachersService = async () => {
  const result = await Teacher.find({});
  return result;
};
