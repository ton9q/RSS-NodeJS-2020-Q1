import Board from './board';
import BoardModel, { IBoardDocument } from './board.model';

export const getAll = async (): Promise<IBoardDocument[]> => {
  const tasks = await BoardModel.find({});
  return tasks;
};

export const getById = async (id: string): Promise<IBoardDocument | null> => {
  const task = await BoardModel.findOne({ _id: id });
  return task;
};

export const add = async (newBoardData: Board): Promise<IBoardDocument> => {
  const newBoard = await BoardModel.create(newBoardData);
  return newBoard;
};

export const updateById = async (
  id: string,
  boardData: Partial<Board>,
): Promise<IBoardDocument> => {
  const updatedBoard = await BoardModel.updateOne({ _id: id }, boardData);
  return updatedBoard;
};

export const deleteById = async (id: string): Promise<IBoardDocument | null> => {
  const deletedBoard = await BoardModel.deleteOne({ _id: id });
  return deletedBoard;
};
