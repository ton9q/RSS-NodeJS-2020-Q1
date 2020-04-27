const router = require('express').Router();
const asyncWrapper = require('../../utils/async-wrapper');
const taskController = require('./task.controller');

router
  .route('/:boardId/tasks')
  .get(asyncWrapper(taskController.getAllByBoardId))
  .post(asyncWrapper(taskController.add));

router
  .route('/:boardId/tasks/:taskId')
  .get(asyncWrapper(taskController.getById))
  .put(asyncWrapper(taskController.updateById))
  .delete(asyncWrapper(taskController.deleteById));

module.exports = router;
