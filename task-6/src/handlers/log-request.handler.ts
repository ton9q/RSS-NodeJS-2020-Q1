import { Request, Response, NextFunction } from 'express';
import { finished } from 'stream';
import { getModuleLogger } from '../logger';

const logger = getModuleLogger(module, { label: 'App' });

export const logRequestHandler = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const { method, url, body, query } = req;

  finished(res, () => {
    const ms = Date.now() - start;
    const { statusCode } = res;
    logger.info(
      `method=${method} url=${url} query=${JSON.stringify(query)} ` +
        `body=${JSON.stringify(body)} status=${statusCode} [${ms}ms]`,
    );
  });

  next();
};
