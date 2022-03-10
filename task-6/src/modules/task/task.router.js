const router = require('express').Router();
const { getAllByBoardId, getById, add, updateById, deleteById } = require('./task.controller');

router
  .route('/:boardId/tasks')
  .get(getAllByBoardId)
  .post(add);

router
  .route('/:boardId/tasks/:taskId')
  .get(getById)
  .put(updateById)
  .delete(deleteById);

module.exports = router;
