const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');
const taskService = require('../tasks/task.service');

const filterFields = ({ title, columns }) => {
  return { title, columns };
};

const getAll = async () => {
  const boards = await boardsRepo.getAll();
  return boards;
};

const getById = async id => {
  const board = await boardsRepo.getById(id);
  return board || null;
};

const add = async board => {
  const newBoard = await boardsRepo.add(new Board(filterFields(board)));
  return newBoard;
};

const updateById = async (id, data) => {
  const updatedBoard = await boardsRepo.updateById(id, filterFields(data));
  return updatedBoard;
};

const deleteById = async id => {
  const board = await boardsRepo.deleteById(id);
  await taskService.deleteByBoardId(id);
  return board;
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
};
