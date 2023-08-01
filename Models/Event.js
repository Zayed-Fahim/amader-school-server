const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const eventSchema = mongoose.Schema(
  {
    eventCreator: {
      id: {
        type: ObjectId,
        ref: "Teacher",
      },
      name: {
        type: String,
        required: true,
      },
      schoolTag: {
        type: String,
        required: true,
      },
    },
    eventType: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
      trim: true,
    },
    description: {
      required: true,
      type: String,
      trim: true,
    },
    assignedClass: {
      required: true,
      type: String,
    },
    group: {
      type: String,
    },
    shift: {
      required: true,
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
