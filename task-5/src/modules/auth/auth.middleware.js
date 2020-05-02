const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');
const asyncWrapper = require('../../utils/async-wrapper');

const ensureAuthorization = asyncWrapper(async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new Unauthorized('User is not authorized');
  }

  const tokenBody = token.replace('Bearer ', '');
  jwt.verify(tokenBody, JWT_SECRET_KEY);

  next();
});

module.exports = {
  ensureAuthorization
};
