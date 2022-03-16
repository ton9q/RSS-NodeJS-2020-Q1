import { Request, Response } from 'express';
import { NotFound } from 'http-errors';
import { NO_CONTENT } from 'http-status-codes';
import * as userRepo from './user.db.repository';
import UserModel from './user.model';
import User from './user';
import { asyncWrapper } from '../../utils/async-wrapper';

export const getAll = asyncWrapper(async (_req: Request, res: Response) => {
  const users = await userRepo.getAll();
  res.json(users.map(UserModel.toResponse));
});

export const getById = asyncWrapper(async (req: Request, res: Response) => {
  const userId = req.params['id'];
  if (!userId) {
    throw new NotFound('"userId" is empty');
  }

  const user = await userRepo.getById(userId);
  if (!user) {
    throw new NotFound(`User[id="${userId}"] not found`);
  }

  res.json(UserModel.toResponse(user));
});

export const add = asyncWrapper(async (req: Request, res: Response) => {
  const userData = req.body;

  const user = new User(userData);
  const newUser = await userRepo.add(user);

  res.json(UserModel.toResponse(newUser));
});

export const updateById = asyncWrapper(async (req: Request, res: Response) => {
  const userId = req.params['id'];
  if (!userId) {
    throw new NotFound('"userId" is empty');
  }

  const userData = req.body;
  const updatedUser = await userRepo.updateById(userId, User.filterFields(userData));

  res.json(UserModel.toResponse(updatedUser));
});

export const deleteById = asyncWrapper(async (req: Request, res: Response) => {
  const userId = req.params['id'];
  if (!userId) {
    throw new NotFound('"userId" is empty');
  }

  const deletedUser = await userRepo.deleteById(userId);
  if (!deletedUser) {
    throw new NotFound(`User[id="${userId}"] not found`);
  }

  res.status(NO_CONTENT).json({ message: `User[id="${userId}"] was deleted` });
});
