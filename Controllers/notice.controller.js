const { addNoticeService } = require("../Services/notice.service");

exports.addNotice = async (req, res) => {
  try {
    const notice = await addNoticeService(req.body);
    res.status(200).json({ status: "Success", message: "Notice Added" });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Couldn't added this Notice.",
      error: error.message,
    });
  }
};
