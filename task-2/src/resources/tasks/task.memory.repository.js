const tasks = {};

const getAllByBoardId = boardId => {
  return Object.values(tasks).filter(task => task.boardId === boardId);
};

const getAllByUserId = userId => {
  return Object.values(tasks).filter(task => task.userId === userId);
};

const getById = (boardId, taskId) => {
  const task = tasks[taskId];
  return task;
};

const add = (boardId, newTask) => {
  tasks[newTask.id] = { ...newTask, boardId };
  return tasks[newTask.id];
};

const updateById = (boardId, taskId, taskData) => {
  tasks[taskId] = {
    ...tasks[taskId],
    ...taskData,
    boardId
  };
  return tasks[taskId];
};

const deleteById = (boardId, taskId) => {
  const task = tasks[taskId];
  delete tasks[taskId];
  return task;
};

module.exports = {
  getAllByBoardId,
  getAllByUserId,
  getById,
  add,
  updateById,
  deleteById
};
