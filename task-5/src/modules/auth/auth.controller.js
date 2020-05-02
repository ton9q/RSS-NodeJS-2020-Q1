const { Forbidden } = require('http-errors');
const jwt = require('jsonwebtoken');
const userRepo = require('../user/user.db.repository');
const { JWT_SECRET_KEY, JWT_EXPIRES } = require('../../common/config');
const asyncWrapper = require('../../utils/async-wrapper');

const signIn = asyncWrapper(async (req, res) => {
  const { login, password } = req.body;
  const user = await userRepo.getByLogin(login);

  if (!user) {
    throw new Forbidden('Wrong login');
  }

  const isSamePassword = await user.checkPassword(password);
  if (!isSamePassword) {
    throw new Forbidden('Wrong password');
  }

  const token = jwt.sign({ userId: user.id, login: user.login }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES
  });

  res.json({ token });
});

module.exports = {
  signIn
};
