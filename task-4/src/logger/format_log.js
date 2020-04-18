module.exports = info => {
  const { timestamp, level, message } = info;
  const label = info.label ? `[${info.label}] ` : '';

  return `${timestamp} ${label}${level}: ${message}`;
};
