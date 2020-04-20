const { finished } = require('stream');
const logger = require('../logger')(module, { label: 'App' });

module.exports = (req, res, next) => {
  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    logger.info(
      `method=${method} url=${url} query=${JSON.stringify(query)} ` +
        `body=${JSON.stringify(body)} status=${statusCode} [${ms}ms]`
    );
  });

  const start = Date.now();
  const { method, url, body, query } = req;
  next();
};
