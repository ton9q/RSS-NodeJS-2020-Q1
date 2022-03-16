import User from './user';
import UserModel, { IUserDocument } from './user.model';

export const getAll = async () => {
  const users = await UserModel.find({});
  return users;
};

export const getByLogin = async (login: string): Promise<IUserDocument | null> => {
  const user = await UserModel.findOne({ login });
  return user;
};

export const getById = async (id: string): Promise<IUserDocument | null> => {
  const user = await UserModel.findById(id);
  return user;
};

export const add = async (newUserData: User): Promise<IUserDocument> => {
  const newUser = await UserModel.create(newUserData);
  return newUser;
};

export const updateById = async (id: string, userData: Partial<User>): Promise<IUserDocument> => {
  const updatedUser = await UserModel.updateOne({ _id: id }, userData);
  return updatedUser;
};

export const deleteById = async (id: string): Promise<IUserDocument | null> => {
  const deletedUser = await UserModel.deleteOne({ _id: id });
  return deletedUser;
};
