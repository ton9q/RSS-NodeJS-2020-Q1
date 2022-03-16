import { Request, Response } from 'express';
import { Forbidden, Unauthorized } from 'http-errors';
import { NO_CONTENT } from 'http-status-codes';
import { uid } from 'rand-token';
import * as userRepo from '../user/user.db.repository';
import { asyncWrapper } from '../../utils/async-wrapper';
import { generateAccessToken, decodeTokenPayload, JwtToken } from './auth.utils';
import { ObjectType } from '../../utils/object';

const refreshTokens = {} as ObjectType;

export const signIn = asyncWrapper(async (req: Request, res: Response) => {
  console.log('refreshTokens', refreshTokens);

  const { login, password } = req.body;
  const user = await userRepo.getByLogin(login);

  if (!user) {
    throw new Forbidden('Wrong login');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const isSamePassword = await user.checkPassword(password);
  if (!isSamePassword) {
    throw new Forbidden('Wrong password');
  }

  const token = generateAccessToken(user);
  const refreshToken = uid(256);

  refreshTokens[refreshToken] = user.id; // eslint-disable-line require-atomic-updates

  res.json({ token, refreshToken });
});

export const signOut = asyncWrapper(async (req: Request, res: Response) => {
  console.log('refreshTokens', refreshTokens);
  const token = req.headers.authorization as JwtToken;
  const { login } = decodeTokenPayload(token);
  const user = await userRepo.getByLogin(login);

  if (!user) {
    throw new Forbidden('Wrong login');
  }

  Object.entries(refreshTokens).forEach(([refreshToken, userId]) => {
    if (userId === user.id) {
      delete refreshTokens[refreshToken];
    }
  });

  res.status(NO_CONTENT).json({ message: `User with id="${user.id}" was logout` });
});

export const getNewAccessToken = asyncWrapper(async (req: Request, res: Response) => {
  const token = req.headers.authorization as JwtToken;
  const { login } = decodeTokenPayload(token);
  const { refreshToken } = req.body;

  const user = await userRepo.getByLogin(login);

  if (!user) {
    throw new Forbidden('Wrong login');
  }

  const isValidRefreshToken = refreshTokens[refreshToken] === user.id;

  if (!isValidRefreshToken) {
    throw new Unauthorized('Invalid refreshToken');
  }

  const newToken = generateAccessToken(user);

  res.json({ token: newToken });
});

export const deleteRefreshToken = asyncWrapper(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken];
  }

  res.status(NO_CONTENT).json({ message: `RefreshToken="${refreshToken}" was deleted` });
});
