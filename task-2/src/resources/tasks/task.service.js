const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const filterFields = ({ title, order, description, userId, boardId, columnId }) => {
  return { title, order, description, userId, boardId, columnId };
};

const getAllByBoardId = async boardId => {
  const tasks = await tasksRepo.getAllByBoardId(boardId);
  return tasks;
};

const getById = async (boardId, taskId) => {
  const task = await tasksRepo.getById(boardId, taskId);
  return task || null;
};

const add = async (boardId, task) => {
  const newTask = await tasksRepo.add(boardId, new Task(filterFields(task)));
  return newTask;
};

const updateById = async (boardId, taskId, data) => {
  const updatedUser = await tasksRepo.updateById(boardId, taskId, filterFields(data));
  return updatedUser;
};

const deleteById = async (boardId, taskId) => {
  const task = await tasksRepo.deleteById(boardId, taskId);
  return task;
};

const deleteByBoardId = async boardId => {
  const tasks = await getAllByBoardId(boardId);
  const deletedTasksPromise = tasks.map(async ({ id }) => {
    const task = await deleteById(boardId, id);
    return task;
  });
  const deletedTasks = await Promise.all(deletedTasksPromise);
  return deletedTasks;
};

const unsetUser = async userId => {
  const tasks = await tasksRepo.unsetUser(userId);
  return tasks;
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
