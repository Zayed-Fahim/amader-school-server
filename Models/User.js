const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["Student", "Teacher", "Admin", "Super Admin"],
        message:
          "Role can't be {VALUE}, must be student/teacher/admin/super-admin.",
      },
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    password: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
