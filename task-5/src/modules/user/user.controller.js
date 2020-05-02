const { NotFound } = require('http-errors');
const { NO_CONTENT } = require('http-status-codes');
const userRepo = require('./user.db.repository');
const User = require('./user.model');
const asyncWrapper = require('../../utils/async-wrapper');

const filterFields = ({ name, login, password }) => {
  return { name, login, password };
};

const getAll = asyncWrapper(async (req, res) => {
  const users = await userRepo.getAll();
  res.json(users.map(User.toResponse));
});

const getById = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const user = await userRepo.getById(userId);

  if (!user) {
    throw new NotFound(`User[id="${userId}"] not found`);
  }

  res.json(User.toResponse(user));
});

const add = asyncWrapper(async (req, res) => {
  const userData = req.body;
  const newUser = await userRepo.add(filterFields(userData));
  res.json(User.toResponse(newUser));
});

const updateById = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const updatedUser = await userRepo.updateById(userId, filterFields(userData));
  res.json(User.toResponse(updatedUser));
});

const deleteById = asyncWrapper(async (req, res) => {
  const userId = req.params.id;
  const deletedUser = await userRepo.deleteById(userId);

  if (!deletedUser) {
    throw new NotFound(`User[id="${userId}"] not found`);
  }

  res.status(NO_CONTENT).json({ message: `User[id="${userId}"] was deleted` });
});

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
};
