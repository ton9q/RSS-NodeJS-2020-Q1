const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const logger = require('../logger')(module);
const User = require('../modules/user/user.model');

const users = [{ name: 'admin', login: 'admin', password: 'admin' }];

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;

  db.on('error', err => {
    logger.error('Connection error: ', err);
    process.exitCode = 1;
  });

  db.once('open', async () => {
    logger.info('Connected to db');

    await db.dropDatabase(() => {
      logger.info('DB dropped');
    });
    await User.create(users);

    cb();
  });
};

module.exports = {
  connectToDB
};
