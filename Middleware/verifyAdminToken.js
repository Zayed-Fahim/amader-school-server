const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;

    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "You are not logged in.",
      });
    }

    const decode = await promisify(jwt.verify)(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.admin = decode;

    next();
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: "Invalid Token",
      error: error.message,
    });
  }
};
