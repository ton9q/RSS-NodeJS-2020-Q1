import { filterFields } from '../../utils/object';

const fieldsToInclude = ['name', 'login', 'password'];

export interface IUser {
  name: string;
  login: string;
  password: string;
}

class User {
  name: string;

  login: string;

  password: string;

  constructor({ name, login, password }: IUser) {
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User) {
    const { name, login } = user;
    return { name, login };
  }

  static filterFields(data: Partial<IUser>) {
    return filterFields(data, fieldsToInclude);
  }
}

export default User;
