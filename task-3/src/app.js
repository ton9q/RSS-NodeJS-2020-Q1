const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const { finished } = require('stream');
const YAML = require('yamljs');
const { NotFound } = require('http-errors');
const logger = require('./logger')(module, { label: 'App' });
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

process.on('uncaughtException', err => {
  logger.error(`[Uncaught Exception] ${err.name}: ${err.message}`);
  logger.info('Shutting down...');
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error(`[Unhandled Rejection] ${reason}`);
});

app.use((req, res, next) => {
  const start = Date.now();
  const { method, url, body, query } = req;
  next();

  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    logger.info(
      `method=${method} url=${url} query=${JSON.stringify(query)} ` +
        `body=${JSON.stringify(body)} status=${statusCode} [${ms}ms]`
    );
  });
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use((req, res, next) => {
  next(NotFound('This page not found.'));
});

app.use(async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Unknown Error';
  const response = {
    status: err.status,
    statusCode: err.status,
    message: err.message
    // stack: err.stack
  };
  logger.error(`${err.name}: ${err.message}`);
  res.status(err.statusCode).json(response);
});

// throw Error('Uncaught error');
// Promise.reject(Error('Oops, promise rejected!'));

module.exports = app;
