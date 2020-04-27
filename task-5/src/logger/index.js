const createLogger = require('./create_logger');

module.exports = (...args) => {
  return createLogger(...args);
};
