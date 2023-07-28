const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const noticeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    images: {
      type: [String],
    },
    postedBy: {
      type: String,
      required: true,
    },
    postedDate: {
      type: String,
      required: true,
    },
    admin: {
      id: {
        type: ObjectId,
        required: true,
        ref: "Admin",
      },
    },
  },
  { timeStamps: true }
);

const Notice = mongoose.model("Notice", noticeSchema);
module.exports = Notice;
