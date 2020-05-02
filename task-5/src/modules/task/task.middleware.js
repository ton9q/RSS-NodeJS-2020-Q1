const taskRepo = require('./task.db.repository');
const asyncWrapper = require('../../utils/async-wrapper');

const deleteByBoardId = asyncWrapper(async (req, res, next) => {
  const boardId = req.params.id;
  await taskRepo.deleteByBoardId(boardId);
  next();
});

const unsetUser = asyncWrapper(async (req, res, next) => {
  const userId = req.params.id;
  await taskRepo.unsetUser(userId);
  next();
});

module.exports = {
  deleteByBoardId,
  unsetUser
};
