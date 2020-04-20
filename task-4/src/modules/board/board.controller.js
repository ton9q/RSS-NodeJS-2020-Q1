const boardRepo = require('./board.db.repository');

const filterFields = ({ title, columns }) => {
  return { title, columns };
};

const getAll = async (req, res) => {
  const boards = await boardRepo.getAll();
  res.json(boards);
};

const getById = async (req, res) => {
  const boardId = req.params.id;
  const board = await boardRepo.getById(boardId);
  if (board) {
    res.json(board);
  } else {
    res.status(404).send({ message: `Board[id="${boardId}"] not found` });
  }
};

const add = async (req, res) => {
  const boardData = req.body;
  const newBoard = await boardRepo.add(filterFields(boardData));
  res.json(newBoard);
};

const updateById = async (req, res) => {
  const boardId = req.params.id;
  const boardData = req.body;
  const updatedBoard = await boardRepo.updateById(boardId, filterFields(boardData));
  res.json(updatedBoard);
};

const deleteById = async (req, res) => {
  const boardId = req.params.id;
  const deletedBoard = await boardRepo.deleteById(boardId);
  if (deletedBoard) {
    res.status(204).json({ message: `Board[id="${boardId}"] was deleted` });
  } else {
    res.status(404).send({ message: `Board[id="${boardId}"] not found` });
  }
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
};
