const { createLogger, format, transports } = require('winston');
const getModulePath = require('./get_module_path');
const formatLog = require('./format_log');

const getFormatConfig = ({ label, toFile = false } = {}) => {
  return format.combine(
    toFile ? format.uncolorize() : format.colorize(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.label({ label }),
    format.printf(formatLog)
  );
};

module.exports = (module, { label = getModulePath(module) } = {}) => {
  return createLogger({
    level: 'silly',
    format: getFormatConfig({ label }),
    transports: [
      /*
       - Write all logs to Console and `logs/all.log`.
       - Write all logs error to `logs/error.log`.
      */
      new transports.Console({
        level: 'silly'
      }),
      new transports.File({
        filename: 'logs/all.log',
        level: 'silly',
        format: getFormatConfig({ label, toFile: true })
      }),
      new transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: getFormatConfig({ label, toFile: true })
      })
    ]
  });
};
