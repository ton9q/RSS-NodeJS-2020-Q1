import jwt from 'jsonwebtoken';
import config from '../../common/config';
import { IUserJson } from '../user/user.model';

const { JWT_SECRET_KEY, JWT_ACCESS_TOKEN_EXPIRES } = config;

type TokenHeader = string;
type TokenPayload = string;
type TokenSignature = string;
// eslint-disable-next-line prettier/prettier
export type JwtToken = `${TokenHeader}.${TokenPayload}.${TokenSignature}`;
export type AuthToken = `Bearer ${JwtToken}`;

export const generateAccessToken = (user: IUserJson) => {
  return jwt.sign({ userId: user.id, login: user.login }, JWT_SECRET_KEY, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRES,
  });
};

const decodeBase64 = (data: string) => {
  return Buffer.from(data, 'base64').toString();
};

export const decodeTokenPayload = (token: JwtToken) => {
  const tokenPayload = token.split('.')[1] as string;
  return JSON.parse(decodeBase64(tokenPayload));
};
