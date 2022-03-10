const { Forbidden, Unauthorized } = require('http-errors');
const { NO_CONTENT } = require('http-status-codes');
const { uid } = require('rand-token');
const userRepo = require('../user/user.db.repository');
const asyncWrapper = require('../../utils/async-wrapper');
const { generateAccessToken, decodeTokenPayload } = require('./auth.utils');

const refreshTokens = {};

const signIn = asyncWrapper(async (req, res) => {
  console.log('refreshTokens', refreshTokens);

  const { login, password } = req.body;
  const user = await userRepo.getByLogin(login);

  if (!user) {
    throw new Forbidden('Wrong login');
  }

  const isSamePassword = await user.checkPassword(password);
  if (!isSamePassword) {
    throw new Forbidden('Wrong password');
  }

  const token = generateAccessToken(user);
  const refreshToken = uid(256);

  refreshTokens[refreshToken] = user.id; // eslint-disable-line require-atomic-updates

  res.json({ token, refreshToken });
});

const signOut = asyncWrapper(async (req, res) => {
  console.log('refreshTokens', refreshTokens);
  const token = req.headers.authorization;
  const login = decodeTokenPayload(token).login;
  const user = await userRepo.getByLogin(login);

  if (!user) {
    throw new Forbidden('Wrong login');
  }

  Object.entries(refreshTokens).map(([refreshToken, userId]) => {
    if (userId === user.id) {
      delete refreshTokens[refreshToken];
    }
  });

  res.status(NO_CONTENT).json({ message: `User with id="${user.id}" was logout` });
});

const getNewAccessToken = asyncWrapper(async (req, res) => {
  const token = req.headers.authorization;
  const login = decodeTokenPayload(token).login;
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

const deleteRefreshToken = asyncWrapper(async (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken];
  }

  res.status(NO_CONTENT).json({ message: `RefreshToken="${refreshToken}" was deleted` });
});

module.exports = {
  signIn,
  signOut,
  getNewAccessToken,
  deleteRefreshToken
};
