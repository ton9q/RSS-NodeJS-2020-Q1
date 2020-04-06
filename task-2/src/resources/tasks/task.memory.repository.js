const tasks = {};

const getAllByBoardId = boardId => {
  return Object.values(tasks).filter(task => task.boardId === boardId);
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

const unsetUser = userId => {
  const tasksForUnset = Object.values(tasks).filter(task => {
    return task.userId === userId;
  });
  tasksForUnset.map(task => {
    tasks[task.id].userId = null;
  });
  return tasks;
};

module.exports = {
  getAllByBoardId,
  getById,
  add,
  updateById,
  deleteById,
  unsetUser
};
