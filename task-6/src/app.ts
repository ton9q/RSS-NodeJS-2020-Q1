import express, { Request, Response, NextFunction } from 'express';
import swaggerUI from 'swagger-ui-express';
import { join } from 'path';
import YAML from 'yamljs';
import { NotFound } from 'http-errors';
import { logUncaughtErrors } from './utils/log-uncaught-errors';
import { logRequestHandler } from './handlers/log-request.handler';
import { errorHandler } from './handlers/error.handler';
import { ensureAuthorization } from './modules/auth/auth.middleware';
import { router as authRouter } from './modules/auth/auth.router';
import { router as userRouter } from './modules/user/user.router';
import { router as boardRouter } from './modules/board/board.router';
import { router as taskRouter } from './modules/task/task.router';

logUncaughtErrors();

const app = express();
const swaggerDocument = YAML.load(join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logRequestHandler);

app.use('/', (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/', authRouter);
app.use('/users', ensureAuthorization, userRouter);
app.use('/boards', ensureAuthorization, boardRouter);
app.use('/boards', ensureAuthorization, taskRouter);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFound('This page not found.'));
});

app.use(errorHandler);

export { app };
