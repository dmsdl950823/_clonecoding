const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  const statusCode = res.status === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    // stack: error.stack, // hacker can see all the routes! 😑 DANGEROUS
    stack: process.env.NODE_ENV === 'production' ? '😎' : error.stack, // hacker can see all the routes! DANGEROUS

  });
};

module.exports = {
  notFound,
  errorHandler,
};
