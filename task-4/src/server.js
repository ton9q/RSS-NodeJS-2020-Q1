const { PORT } = require('./common/config');
const logger = require('./logger')(module, { label: 'Server' });
const { connectToDB } = require('./db/client');
const app = require('./app');

connectToDB(() => {
  app.listen(PORT, () => {
    logger.info(`Web server listening at: http://localhost:${PORT}`);
    logger.info(`Browse your REST API at: http://localhost:${PORT}/doc`);
  });
});
