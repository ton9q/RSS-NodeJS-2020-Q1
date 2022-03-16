import { Schema, model, Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { addToJsonOption } from '../../utils/mongoose';
import Column from './column';

export interface IColumnDocument extends Column, Document {
  _id?: string;
  __v?: number;
}

export const columnSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: uuid,
  },
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

addToJsonOption(columnSchema);

const ColumnModel = model<IColumnDocument>('Column', columnSchema);

export default ColumnModel;
