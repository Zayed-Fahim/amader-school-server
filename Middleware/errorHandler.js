const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // set status code based on error type
  const statusCode = err.status || 500;

  // send error response
  res.status(statusCode).json({
    status: "Error",
    message: err.message,
  });
};

module.exports = errorHandler;
