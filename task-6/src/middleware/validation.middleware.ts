import { Request, Response, NextFunction } from 'express';
import { UnprocessableEntity, Forbidden } from 'http-errors';
import { asyncWrapper } from '../utils/async-wrapper';
import UserModel from '../modules/user/user.model';
import User from '../modules/user/user';

const MESSAGE_NOT_ALL_FIELDS = 'Not all fields were passed!';

export const validateUser = asyncWrapper(
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const { name, login, password } = req.body as User;

    const isExistedUser = await UserModel.findOne({ login });
    if (isExistedUser) {
      throw new Forbidden('Login should be uniq');
    }

    if (!name || !login || !password) {
      throw new UnprocessableEntity(MESSAGE_NOT_ALL_FIELDS);
    }

    next();
  },
);
