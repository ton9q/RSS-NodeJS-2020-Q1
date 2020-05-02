const router = require('express').Router();
const { getAll, getById, add, updateById, deleteById } = require('./user.controller');
const { unsetUser } = require('../task/task.middleware');

router
  .route('/')
  .get(getAll)
  .post(add);

router
  .route('/:id')
  .get(getById)
  .put(updateById)
  .delete(unsetUser, deleteById);

module.exports = router;
