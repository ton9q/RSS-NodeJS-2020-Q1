const Task = require('./task.model');

const getAllByBoardId = async boardId => {
  const tasks = await Task.find({ boardId });
  return tasks;
};

const getAllByUserId = async userId => {
  const tasks = await Task.find({ userId });
  return tasks;
};

const getById = async (boardId, taskId) => {
  const task = await Task.findOne({
    _id: taskId,
    boardId
  });
  return task;
};

const add = async (boardId, newTaskData) => {
  const newTask = await Task.create({
    ...newTaskData,
    boardId
  });
  return newTask;
};

const updateById = async (boardId, taskId, taskData) => {
  const updatedTask = await Task.updateOne({ _id: taskId, boardId }, taskData);
  return updatedTask;
};

const deleteById = async (boardId, taskId) => {
  const deletedTask = await Task.deleteOne({ _id: taskId, boardId });
  return deletedTask;
};

const deleteByBoardId = async boardId => {
  const deletedTask = await Task.deleteMany({ boardId });
  return deletedTask;
};

const unsetUser = async userId => {
  await Task.updateMany({ userId }, { userId: null });
  return true;
};

module.exports = {
  getAllByBoardId,
  getAllByUserId,
  getById,
  add,
  updateById,
  deleteById,
  deleteByBoardId,
  unsetUser
};
