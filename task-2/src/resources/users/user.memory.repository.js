const users = {};

const getAll = () => {
  return Object.values(users);
};

const getById = id => {
  return users[id];
};

const add = newUser => {
  users[newUser.id] = newUser;
  return users[newUser.id];
};

const updateById = (id, userData) => {
  users[id] = {
    ...users[id],
    ...userData
  };
  return users[id];
};

const deleteById = id => {
  const user = users[id];
  delete users[id];
  return user;
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
};
