const router = require('express').Router();
const asyncWrapper = require('../../utils/async-wrapper');
const userController = require('./user.controller');
const taskController = require('../task/task.controller');

router
  .route('/')
  .get(asyncWrapper(userController.getAll))
  .post(asyncWrapper(userController.add));

router
  .route('/:id')
  .get(asyncWrapper(userController.getById))
  .put(asyncWrapper(userController.updateById))
  .delete(asyncWrapper(taskController.unsetUser), asyncWrapper(userController.deleteById));

module.exports = router;
