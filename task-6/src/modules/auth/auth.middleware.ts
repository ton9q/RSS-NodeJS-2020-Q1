import { Request, Response, NextFunction } from 'express';
import { Unauthorized } from 'http-errors';
import jwt from 'jsonwebtoken';
import config from '../../common/config';
import { asyncWrapper } from '../../utils/async-wrapper';
import { AuthToken } from './auth.utils';

const { JWT_SECRET_KEY } = config;

export const ensureAuthorization = asyncWrapper(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.headers.authorization as AuthToken;

    if (!token) {
      throw new Unauthorized('User is not authorized');
    }

    const tokenBody = token.split(' ')[1] as string;
    jwt.verify(tokenBody, JWT_SECRET_KEY);

    next();
  },
);
