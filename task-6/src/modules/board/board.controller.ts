import { Request, Response } from 'express';
import { NotFound } from 'http-errors';
import { NO_CONTENT } from 'http-status-codes';
import * as boardRepo from './board.db.repository';
import { asyncWrapper } from '../../utils/async-wrapper';
import Board from './board';

export const getAll = asyncWrapper(async (_req: Request, res: Response) => {
  const boards = await boardRepo.getAll();
  res.json(boards);
});

export const getById = asyncWrapper(async (req: Request, res: Response) => {
  const boardId = req.params['id'];
  if (!boardId) {
    throw new NotFound('"boardId" is empty');
  }

  const board = await boardRepo.getById(boardId);

  if (!board) {
    throw new NotFound(`Board[id="${boardId}"] not found`);
  }

  res.json(board);
});

export const add = asyncWrapper(async (req: Request, res: Response) => {
  const boardData = req.body;

  const board = new Board(boardData);
  const newBoard = await boardRepo.add(board);

  res.json(newBoard);
});

export const updateById = asyncWrapper(async (req: Request, res: Response) => {
  const boardId = req.params['id'];
  if (!boardId) {
    throw new NotFound('"boardId" is empty');
  }

  const boardData = req.body;
  const updatedBoard = await boardRepo.updateById(boardId, Board.filterFields(boardData));

  res.json(updatedBoard);
});

export const deleteById = asyncWrapper(async (req: Request, res: Response) => {
  const boardId = req.params['id'];
  if (!boardId) {
    throw new NotFound('"boardId" is empty');
  }

  const deletedBoard = await boardRepo.deleteById(boardId);

  if (!deletedBoard) {
    throw new NotFound(`Board[id="${boardId}"] not found`);
  }

  res.status(NO_CONTENT).json({ message: `Board[id="${boardId}"] was deleted` });
});
