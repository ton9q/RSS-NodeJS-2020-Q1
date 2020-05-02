const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, JWT_ACCESS_TOKEN_EXPIRES } = require('../../common/config');

const generateAccessToken = user => {
  return jwt.sign({ userId: user.id, login: user.login }, JWT_SECRET_KEY, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRES
  });
};

const decodeBase64 = data => {
  return new Buffer(data, 'base64').toString(); // eslint-disable-line node/no-deprecated-api
};

const decodeTokenPayload = token => {
  const tokenPayload = token.split('.')[1];
  return JSON.parse(decodeBase64(tokenPayload));
};

module.exports = {
  generateAccessToken,
  decodeTokenPayload
};
