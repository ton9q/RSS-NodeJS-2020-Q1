const boards = {};

const getAll = () => {
  return Object.values(boards);
};

const getById = id => {
  return boards[id];
};

const add = newBoard => {
  boards[newBoard.id] = newBoard;
  return boards[newBoard.id];
};

const updateById = (id, boardData) => {
  boards[id] = {
    ...boards[id],
    ...boardData
  };
  return boards[id];
};

const deleteById = id => {
  const board = boards[id];
  delete boards[id];
  return board;
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
};
