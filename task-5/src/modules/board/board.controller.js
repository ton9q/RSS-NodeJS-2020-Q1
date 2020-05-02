const { NotFound } = require('http-errors');
const { NO_CONTENT } = require('http-status-codes');
const boardRepo = require('./board.db.repository');
const asyncWrapper = require('../../utils/async-wrapper');

const filterFields = ({ title, columns }) => {
  return { title, columns };
};

const getAll = asyncWrapper(async (req, res) => {
  const boards = await boardRepo.getAll();
  res.json(boards);
});

const getById = asyncWrapper(async (req, res) => {
  const boardId = req.params.id;
  const board = await boardRepo.getById(boardId);

  if (!board) {
    throw new NotFound(`Board[id="${boardId}"] not found`);
  }

  res.json(board);
});

const add = asyncWrapper(async (req, res) => {
  const boardData = req.body;
  const newBoard = await boardRepo.add(filterFields(boardData));
  res.json(newBoard);
});

const updateById = asyncWrapper(async (req, res) => {
  const boardId = req.params.id;
  const boardData = req.body;
  const updatedBoard = await boardRepo.updateById(boardId, filterFields(boardData));
  res.json(updatedBoard);
});

const deleteById = asyncWrapper(async (req, res) => {
  const boardId = req.params.id;
  const deletedBoard = await boardRepo.deleteById(boardId);

  if (!deletedBoard) {
    throw new NotFound(`Board[id="${boardId}"] not found`);
  }

  res.status(NO_CONTENT).json({ message: `Board[id="${boardId}"] was deleted` });
});

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
};
