import { Document, Schema } from 'mongoose';

export interface IDocument extends Document {
  _id?: string;
  __v?: number;
}

export const addToJsonOption = (scheme: Schema): void => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  scheme.options.toJSON = {
    transform(_doc: unknown, ret: IDocument) {
      if (ret._id) {
        ret.id = ret._id;
        delete ret._id;
      }

      if (ret.__v || typeof ret.__v === 'number') {
        delete ret.__v;
      }
    },
  };
};
