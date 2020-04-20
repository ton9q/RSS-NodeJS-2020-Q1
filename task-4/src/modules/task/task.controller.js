const taskRepo = require('./task.db.repository');

const filterFields = ({ title, order, description, userId, boardId, columnId }) => {
  return { title, order, description, userId, boardId, columnId };
};

const getAllByBoardId = async (req, res) => {
  const boardId = req.params.boardId;
  const tasks = await taskRepo.getAllByBoardId(boardId);
  res.json(tasks);
};

const getById = async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await taskRepo.getById(boardId, taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send({ message: `Task[id="${taskId}"] for Board[id="${boardId}"] not found` });
  }
};

const add = async (req, res) => {
  const boardId = req.params.boardId;
  const taskData = req.body;
  const newTask = await taskRepo.add(boardId, filterFields(taskData));
  res.json(newTask);
};

const updateById = async (req, res) => {
  const { boardId, taskId } = req.params;
  const taskData = req.body;
  const updatedTask = await taskRepo.updateById(boardId, taskId, filterFields(taskData));
  res.json(updatedTask);
};

const deleteById = async (req, res) => {
  const { boardId, taskId } = req.params;
  const deletedTask = await taskRepo.deleteById(boardId, taskId);
  if (deletedTask) {
    res
      .status(204)
      .json({ message: `Task[id="${taskId}"] for Board[id="${boardId}"] was deleted` });
  } else {
    res.status(404).send({ message: `Task[id="${taskId}"] for Board[id="${boardId}"] not found` });
  }
};

const deleteByBoardId = async (req, res, next) => {
  const boardId = req.params.id;
  const tasks = await taskRepo.getAllByBoardId(boardId);
  await Promise.all(
    tasks.map(async task => {
      await task.remove();
    })
  );
  next();
};

const unsetUser = async (req, res, next) => {
  const userId = req.params.id;
  const tasks = await taskRepo.getAllByUserId(userId);
  await Promise.all(
    tasks.map(async task => {
      task.userId = null;
      await task.save();
    })
  );
  next();
};

module.exports = {
  getAllByBoardId,
  getById,
  add,
  updateById,
  deleteById,
  deleteByBoardId,
  unsetUser
};
