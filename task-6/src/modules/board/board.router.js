const router = require('express').Router();
const { getAll, getById, add, updateById, deleteById } = require('./board.controller');
const { deleteByBoardId } = require('../task/task.middleware');

router
  .route('/')
  .get(getAll)
  .post(add);

router
  .route('/:id')
  .get(getById)
  .put(updateById)
  .delete(deleteByBoardId, deleteById);

module.exports = router;
