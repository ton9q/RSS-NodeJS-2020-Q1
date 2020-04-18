const logger = require('../logger')(module, { label: 'App' });

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Unknown Error';
  const response = {
    status: err.status,
    statusCode: err.status,
    message: err.message
    // stack: err.stack
  };
  logger.error(`${err.name}: ${err.message}`);
  res.status(err.statusCode).json(response);
};
