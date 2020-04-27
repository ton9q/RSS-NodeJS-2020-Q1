const User = require('./user.model');

const getAll = async () => {
  const users = await User.find({});
  return users;
};

const getById = async id => {
  const user = await User.findById(id);
  return user;
};

const add = async newUserData => {
  const newUser = await User.create(newUserData);
  return newUser;
};

const updateById = async (id, userData) => {
  const updatedUser = await User.updateOne({ _id: id }, userData);
  return updatedUser;
};

const deleteById = async id => {
  const deletedUser = await User.deleteOne({ _id: id });
  return deletedUser;
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
};
