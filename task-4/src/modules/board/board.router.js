const router = require('express').Router();
const asyncWrapper = require('../../utils/async-wrapper');
const boardController = require('./board.controller');
const taskController = require('../task/task.controller');

router
  .route('/')
  .get(asyncWrapper(boardController.getAll))
  .post(asyncWrapper(boardController.add));

router
  .route('/:id')
  .get(asyncWrapper(boardController.getById))
  .put(asyncWrapper(boardController.updateById))
  .delete(asyncWrapper(taskController.deleteByBoardId), asyncWrapper(boardController.deleteById));

module.exports = router;
