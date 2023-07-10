// 1.check if token exist
// 2.if not token then res
//  3.decode then token
// 4.if token res
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers?.authorization;
    
    if (!token) {
      return res.status(401).json({
        status: "Failed",
        message: "Your are not Logged in.",
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
