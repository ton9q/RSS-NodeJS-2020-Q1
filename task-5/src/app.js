const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { NotFound } = require('http-errors');
require('./utils/log-uncaught-errors')();
const logRequestHandler = require('./handlers/log-request.handler');
const errorHandler = require('./handlers/error.handler');
const asyncWrapper = require('./utils/async-wrapper');
const { ensureAuthorization } = require('./modules/authentication/authentication.controller');
const authenticationRouter = require('./modules/authentication/authentication.router');
const userRouter = require('./modules/user/user.router');
const boardRouter = require('./modules/board/board.router');
const taskRouter = require('./modules/task/task.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logRequestHandler);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/', authenticationRouter);
app.use('/users', asyncWrapper(ensureAuthorization), userRouter);
app.use('/boards', asyncWrapper(ensureAuthorization), boardRouter);
app.use('/boards', asyncWrapper(ensureAuthorization), taskRouter);

app.use((req, res, next) => {
  next(NotFound('This page not found.'));
});

app.use(errorHandler);

module.exports = app;
