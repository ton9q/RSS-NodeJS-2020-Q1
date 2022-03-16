import { Schema, model, Document, HookNextFunction, Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { addToJsonOption } from '../../utils/mongoose';
import User from './user';

const SALT_WORK_FACTOR = 10;

export interface IUserDocument extends User, Document {
  _id?: string;
  __v?: number;
  checkPassword?(password: string): Promise<boolean>;
}

export interface IUserJson extends User {
  id: string;
}

export interface IUserModel extends Model<IUserDocument> {
  toResponse: (user: IUserDocument) => string;
}

const userSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: uuid,
  },
  name: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

addToJsonOption(userSchema);

userSchema.static('toResponse', function toResponse(user: IUserDocument) {
  const { id, name, login } = user;
  return { id, name, login };
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
userSchema.methods.checkPassword = async function checkPassword(
  password: string,
): Promise<boolean> {
  const user = this as IUserDocument;

  return bcrypt.compare(password, user.password).catch(() => false);
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
userSchema.pre('save', async function hashPassword(next: HookNextFunction) {
  const user = this as IUserDocument;
  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, prettier/prettier
  } catch (err: any) {
    return next(err);
  }
});

const UserModel = model<IUserDocument, IUserModel>('User', userSchema);

export default UserModel;
