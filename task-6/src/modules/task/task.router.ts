import { Router } from 'express';
import { getAllByBoardId, getById, add, updateById, deleteById } from './task.controller';

const router = Router();

router
  .route('/:boardId/tasks')
  .get(getAllByBoardId)
  .post(add);

router
  .route('/:boardId/tasks/:taskId')
  .get(getById)
  .put(updateById)
  .delete(deleteById);

export { router };
