import mongoose from 'mongoose';
import UserModel from '../modules/user/user.model';
import User from '../modules/user/user';
import config from '../common/config';
import { getModuleLogger } from '../logger';

const logger = getModuleLogger(module);
const { MONGO_CONNECTION_STRING } = config;

const users = [new User({ name: 'admin', login: 'admin', password: 'admin' })];

export const connectToDB = (cb: () => void) => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', err => {
    logger.error(`Connection error: ${err}`);
    process.exitCode = 1;
  });

  db.once('open', async () => {
    logger.info('Connected to db');

    await db.dropDatabase(() => {
      logger.info('DB dropped');
    });
    await UserModel.create(users);

    cb();
  });
};
