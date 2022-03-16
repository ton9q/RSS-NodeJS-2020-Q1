import Task from './task';
import TaskModel, { ITaskDocument } from './task.model';

export const getAllByBoardId = async (boardId: string): Promise<ITaskDocument[]> => {
  const tasks = await TaskModel.find({ boardId });
  return tasks;
};

export const getAllByUserId = async (userId: string): Promise<ITaskDocument[]> => {
  const tasks = await TaskModel.find({ userId });
  return tasks;
};

export const getById = async (boardId: string, taskId: string): Promise<ITaskDocument | null> => {
  const task = await TaskModel.findOne({
    _id: taskId,
    boardId,
  });
  return task;
};

export const add = async (boardId: string, newTaskData: Task): Promise<ITaskDocument> => {
  const newTask = await TaskModel.create({
    ...newTaskData,
    boardId,
  });
  return newTask;
};

export const updateById = async (
  boardId: string,
  taskId: string,
  taskData: Partial<Task>,
): Promise<ITaskDocument> => {
  const updatedTask = await TaskModel.updateOne({ _id: taskId, boardId }, taskData);
  return updatedTask;
};

export const deleteById = async (
  boardId: string,
  taskId: string,
): Promise<ITaskDocument | null> => {
  const deletedTask = await TaskModel.deleteOne({ _id: taskId, boardId });
  return deletedTask;
};

export const deleteByBoardId = async (boardId: string): Promise<ITaskDocument | null> => {
  const deletedTask = await TaskModel.deleteMany({ boardId });
  return deletedTask;
};

export const unsetUser = async (userId: string): Promise<boolean> => {
  await TaskModel.updateMany({ userId }, { userId: null });
  return true;
};
