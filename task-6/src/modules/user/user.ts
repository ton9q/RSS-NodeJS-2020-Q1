/**
 * Module for User class.
 * @module User
 */

import { filterFields } from '../../utils/object';

/** @type {string[]} array of allowed fields for user */
const fieldsToInclude = ['name', 'login', 'password'];

/**
 * Interface for User class.
 *
 * @interface
 */
export interface IUser {
  name: string;
  login: string;
  password: string;
}

/**
 * Class representing a user.
 * @class
 * @constructor
 * @public
 */
class User {
  /**
   * @public
   * @property name {string} Name of a user
   */
  name: string;

  /**
   * @public
   * @property login {string} login of a user
   */
  login: string;

  /**
   * @public
   * @property password {string} password of a user
   */
  password: string;

  /**
   * Create a user.
   * @param {IUser} user - object with user fields
   */
  constructor({ name, login, password }: IUser) {
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Get user with public fields.
   * @static
   * @param {User} user - user object
   * @return Object contains public user fields.
   */
  static toResponse(user: User) {
    const { name, login } = user;
    return { name, login };
  }

  /**
   * Filter user fields and store only allowed.
   * @static
   * @param {Partial<IUser>} data - user data that should be filtered
   * @return {User} filtered user
   */
  static filterFields(data: Partial<IUser>) {
    return filterFields(data, fieldsToInclude);
  }
}

export default User;
