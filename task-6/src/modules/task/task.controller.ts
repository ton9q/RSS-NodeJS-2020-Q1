import { Request, Response } from 'express';
import { NotFound } from 'http-errors';
import { NO_CONTENT } from 'http-status-codes';
import * as taskRepo from './task.db.repository';
import { asyncWrapper } from '../../utils/async-wrapper';
import Task from './task';

export const getAllByBoardId = asyncWrapper(async (req: Request, res: Response) => {
  const { boardId } = req.params;
  if (!boardId) {
    throw new NotFound('"boardId" is empty');
  }

  const tasks = await taskRepo.getAllByBoardId(boardId);
  res.json(tasks);
});

export const getById = asyncWrapper(async (req: Request, res: Response) => {
  const { boardId, taskId } = req.params;
  if (!boardId) {
    throw new NotFound('"boardId" is empty');
  }
  if (!taskId) {
    throw new NotFound('"taskId" is empty');
  }

  const task = await taskRepo.getById(boardId, taskId);

  if (!task) {
    throw new NotFound(`Task[id="${taskId}"] for Board[id="${boardId}"] not found`);
  }

  res.json(task);
});

export const add = asyncWrapper(async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const taskData = req.body;

  if (!boardId) {
    throw new NotFound('"boardId" is empty');
  }

  const task = new Task(taskData);
  const newTask = await taskRepo.add(boardId, task);

  res.json(newTask);
});

export const updateById = asyncWrapper(async (req: Request, res: Response) => {
  const { boardId, taskId } = req.params;
  const taskData = req.body;

  if (!boardId) {
    throw new NotFound('"boardId" is empty');
  }
  if (!taskId) {
    throw new NotFound('"taskId" is empty');
  }

  const updatedTask = await taskRepo.updateById(boardId, taskId, Task.filterFields(taskData));
  res.json(updatedTask);
});

export const deleteById = asyncWrapper(async (req: Request, res: Response) => {
  const { boardId, taskId } = req.params;
  if (!boardId) {
    throw new NotFound('"boardId" is empty');
  }
  if (!taskId) {
    throw new NotFound('"taskId" is empty');
  }

  const deletedTask = await taskRepo.deleteById(boardId, taskId);

  if (!deletedTask) {
    throw new NotFound(`Task[id="${taskId}"] for Board[id="${boardId}"] not found`);
  }

  res
    .status(NO_CONTENT)
    .json({ message: `Task[id="${taskId}"] for Board[id="${boardId}"] was deleted` });
});
