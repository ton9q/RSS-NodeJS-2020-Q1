const { PORT } = require('./common/config');
const logger = require('./logger')(module, { label: 'Server' });
const { connectToDB } = require('./db/client');
const app = require('./app');

connectToDB(() => {
  app.listen(PORT, () => {
    logger.info(`App is running on http://localhost:${PORT}`);
  });
});
