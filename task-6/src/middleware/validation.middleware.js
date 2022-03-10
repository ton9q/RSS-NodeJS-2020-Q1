const { UnprocessableEntity, Forbidden } = require('http-errors');
const asyncWrapper = require('../utils/async-wrapper');
const User = require('../modules/user/user.model');

const MESSAGE_NOT_ALL_FIELDS = 'Not all fields were passed!';

const validateUser = asyncWrapper(async (req, res, next) => {
  const { name, login, password } = req.body;

  const isExistedUser = await User.findOne({ login });
  if (isExistedUser) {
    throw new Forbidden('Login should be uniq');
  }

  if (!name || !login || !password) {
    throw new UnprocessableEntity(MESSAGE_NOT_ALL_FIELDS);
  }

  next();
});

module.exports = {
  validateUser
};
