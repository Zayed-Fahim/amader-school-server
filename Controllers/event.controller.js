const { addEventService } = require("../Services/event.service");

exports.addEvent = async (req, res) => {
  try {
    const event = await addEventService(req.body);
    res.status(200).json({
      status: "Success",
      message: "Event Added Done",
    });
  } catch (error) {
    res.status(200).json({
      status: "Success",
      message: "Event Added Done",
      error: error.message,
    });
  }
};
