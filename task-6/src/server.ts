import config from './common/config';
import { getModuleLogger } from './logger';
import { connectToDB } from './db/client';
import { app } from './app';

const logger = getModuleLogger(module, { label: 'Server' });
const { PORT } = config;

connectToDB(() => {
  app.listen(PORT, () => {
    logger.info(`Web server listening at: http://localhost:${PORT}`);
    logger.info(`Browse your REST API at: http://localhost:${PORT}/doc`);
  });
});
