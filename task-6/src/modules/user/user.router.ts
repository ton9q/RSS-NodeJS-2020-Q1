import { Router } from 'express';
import { getAll, getById, add, updateById, deleteById } from './user.controller';
import { unsetUser } from '../task/task.middleware';
import { validateUser } from '../../middleware/validation.middleware';

const router = Router();

router
  .route('/')
  .get(getAll)
  .post(validateUser, add);

router
  .route('/:id')
  .get(getById)
  .put(updateById)
  .delete(unsetUser, deleteById);

export { router };
