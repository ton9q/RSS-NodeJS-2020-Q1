const userRepo = require('./user.db.repository');
const User = require('./user.model');

const filterFields = ({ name, login, password }) => {
  return { name, login, password };
};

const getAll = async (req, res) => {
  const users = await userRepo.getAll();
  res.json(users.map(User.toResponse));
};

const getById = async (req, res) => {
  const userId = req.params.id;
  const user = await userRepo.getById(userId);

  if (!user) {
    res.status(404).send({ message: `User[id="${userId}"] not found` });
    return;
  }

  res.json(User.toResponse(user));
};

const add = async (req, res) => {
  const userData = req.body;
  const newUser = await userRepo.add(filterFields(userData));
  res.json(User.toResponse(newUser));
};

const updateById = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  const updatedUser = await userRepo.updateById(userId, filterFields(userData));
  res.json(User.toResponse(updatedUser));
};

const deleteById = async (req, res) => {
  const userId = req.params.id;
  const deletedUser = await userRepo.deleteById(userId);

  if (!deletedUser) {
    res.status(404).send({ message: `User[id="${userId}"] not found` });
    return;
  }

  res.status(204).json({ message: `User[id="${userId}"] was deleted` });
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
};
