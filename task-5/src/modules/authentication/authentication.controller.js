const jwt = require('jsonwebtoken');
const userRepo = require('../user/user.db.repository');
const { JWT_SECRET_KEY, JWT_EXPIRES } = require('../../common/config');

const signIn = async (req, res) => {
  const { login, password } = req.body;
  const user = await userRepo.getByLogin(login);

  if (!user) {
    res.status(403).send({ message: 'Wrong login' });
    return;
  }

  const isSamePassword = await user.checkPassword(password);
  if (!isSamePassword) {
    res.status(403).send({ message: 'Wrong password' });
    return;
  }

  const token = jwt.sign(
    { userId: user.id, login: user.login },
    JWT_SECRET_KEY
    // {
    //     expiresIn: JWT_EXPIRES
    // }
  );

  res.json({ token });
};

const ensureAuthorization = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).send({ message: 'User is not authorized' });
    return;
  }

  const tokenBody = token.replace('Bearer ', '');
  jwt.verify(tokenBody, JWT_SECRET_KEY);

  next();
};

module.exports = {
  signIn,
  ensureAuthorization
};
