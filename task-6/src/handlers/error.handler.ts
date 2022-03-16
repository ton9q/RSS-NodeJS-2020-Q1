import { ErrorRequestHandler } from 'express';
import { getModuleLogger } from '../logger';

const logger = getModuleLogger(module, { label: 'App' });

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next0): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Unknown Error';
  const response = {
    status: err.status,
    statusCode: err.status,
    message: err.message,
    // stack: err.stack
  };
  logger.error(`${err.name}: ${err.message}`);
  res.status(err.statusCode).json(response);
};
