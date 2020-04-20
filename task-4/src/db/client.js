const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const logger = require('../logger')(module);
// const User = require('../modules/user/user.model');

// const user = new User({ name: 'name', login: 'login', password: 'password' });

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
    // await User.create(user);

    cb();
  });
};

module.exports = {
  connectToDB
};
