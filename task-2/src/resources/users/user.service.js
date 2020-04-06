const usersRepo = require('./user.memory.repository');
const User = require('./user.model');
const taskService = require('../tasks/task.service');

const filterFields = ({ name, login, password }) => {
  return { name, login, password };
};

const getAll = async () => {
  const users = await usersRepo.getAll();
  return users.map(User.toResponse);
};

const getById = async id => {
  const user = await usersRepo.getById(id);
  return user ? User.toResponse(user) : null;
};

const add = async user => {
  const newUser = await usersRepo.add(new User(filterFields(user)));
  return User.toResponse(newUser);
};

const updateById = async (id, data) => {
  const updatedUser = await usersRepo.updateById(id, filterFields(data));
  return User.toResponse(updatedUser);
};

const deleteById = async id => {
  const user = await usersRepo.deleteById(id);
  await taskService.unsetUser(id);
  return user;
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
};
