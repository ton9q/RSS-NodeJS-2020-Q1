import { NotFound } from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import * as taskRepo from './task.db.repository';
import { asyncWrapper } from '../../utils/async-wrapper';

export const deleteByBoardId = asyncWrapper(
  async (req: Request, _res: Response, next: NextFunction) => {
    const boardId = req.params['id'];
    if (!boardId) {
      throw new NotFound('"boardId" is empty');
    }

    await taskRepo.deleteByBoardId(boardId);

    next();
  },
);

export const unsetUser = asyncWrapper(async (req: Request, _res: Response, next: NextFunction) => {
  const userId = req.params['id'];
  if (!userId) {
    throw new NotFound('"userId" is empty');
  }

  await taskRepo.unsetUser(userId);

  next();
});
