import { Router } from 'express';
import { getAll, getById, add, updateById, deleteById } from './board.controller';
import { deleteByBoardId } from '../task/task.middleware';

const router = Router();

router
  .route('/')
  .get(getAll)
  .post(add);

router
  .route('/:id')
  .get(getById)
  .put(updateById)
  .delete(deleteByBoardId, deleteById);

export { router };
