const { NotFound } = require('http-errors');
const { NO_CONTENT } = require('http-status-codes');
const taskRepo = require('./task.db.repository');
const asyncWrapper = require('../../utils/async-wrapper');

const filterFields = ({ title, order, description, userId, boardId, columnId }) => {
  return { title, order, description, userId, boardId, columnId };
};

const getAllByBoardId = asyncWrapper(async (req, res) => {
  const boardId = req.params.boardId;
  const tasks = await taskRepo.getAllByBoardId(boardId);
  res.json(tasks);
});

const getById = asyncWrapper(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await taskRepo.getById(boardId, taskId);

  if (!task) {
    throw new NotFound(`Task[id="${taskId}"] for Board[id="${boardId}"] not found`);
  }

  res.json(task);
});

const add = asyncWrapper(async (req, res) => {
  const boardId = req.params.boardId;
  const taskData = req.body;
  const newTask = await taskRepo.add(boardId, filterFields(taskData));
  res.json(newTask);
});

const updateById = asyncWrapper(async (req, res) => {
  const { boardId, taskId } = req.params;
  const taskData = req.body;
  const updatedTask = await taskRepo.updateById(boardId, taskId, filterFields(taskData));
  res.json(updatedTask);
});

const deleteById = asyncWrapper(async (req, res) => {
  const { boardId, taskId } = req.params;
  const deletedTask = await taskRepo.deleteById(boardId, taskId);

  if (!deletedTask) {
    throw new NotFound(`Task[id="${taskId}"] for Board[id="${boardId}"] not found`);
  }

  res
    .status(NO_CONTENT)
    .json({ message: `Task[id="${taskId}"] for Board[id="${boardId}"] was deleted` });
});

module.exports = {
  getAllByBoardId,
  getById,
  add,
  updateById,
  deleteById
};
