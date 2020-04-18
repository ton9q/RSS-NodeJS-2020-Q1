const Board = require('./board.model');

const getAll = async () => {
  const tasks = await Board.find({});
  return tasks;
};

const getById = async id => {
  const task = await Board.findOne({ _id: id });
  return task;
};

const add = async newBoardData => {
  const newBoard = await Board.create(newBoardData);
  return newBoard;
};

const updateById = async (id, boardData) => {
  const updatedBoard = await Board.updateOne({ _id: id }, boardData);
  return updatedBoard;
};

const deleteById = async id => {
  const deletedBoard = await Board.deleteOne({ _id: id });
  return deletedBoard;
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
};
