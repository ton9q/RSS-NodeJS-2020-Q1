/**
 * Module for all User DB related functions.
 * @module UserDBRepository
 */

import User from './user';
import UserModel, { IUserDocument } from './user.model';

/**
 * Get Array of all users
 * @returns {Promise<IUserDocument[]>} array of user documents
 */
export const getAll = async (): Promise<IUserDocument[]> => {
  const users = await UserModel.find({});
  return users;
};

/**
 * Get User by login field
 * @param {string} login - user login
 * @returns {Promise<IUserDocument | null>} user document
 */
export const getByLogin = async (login: string): Promise<IUserDocument | null> => {
  const user = await UserModel.findOne({ login });
  return user;
};

/**
 * Get User by id field
 * @param {string} id - user id
 * @returns {Promise<IUserDocument | null>} user document
 */
export const getById = async (id: string): Promise<IUserDocument | null> => {
  const user = await UserModel.findById(id);
  return user;
};

/**
 * Add user to DB
 * @param {User} newUserData - instance of user
 * @returns {Promise<IUserDocument>} user documents
 */
export const add = async (newUserData: User): Promise<IUserDocument> => {
  const newUser = await UserModel.create(newUserData);
  return newUser;
};

/**
 * Update user by id
 * @param {string} id - user id
 * @param {Partial<User>} userData - user data to update
 * @returns {Promise<IUserDocument>} updated user document
 */
export const updateById = async (id: string, userData: Partial<User>): Promise<IUserDocument> => {
  const updatedUser = await UserModel.updateOne({ _id: id }, userData);
  return updatedUser;
};

/**
 * Delete user by id
 * @param {string} id - user id
 * @returns {Promise<IUserDocument | null>} data of deleted user
 */
export const deleteById = async (id: string): Promise<IUserDocument | null> => {
  const deletedUser = await UserModel.deleteOne({ _id: id });
  return deletedUser;
};
