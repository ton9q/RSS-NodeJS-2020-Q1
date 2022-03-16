import { Schema, model, Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { addToJsonOption } from '../../utils/mongoose';
import { columnSchema } from '../column/column.model';
import Board from './board';

export interface IBoardDocument extends Board, Document {
  _id?: string;
  __v?: number;
}

const boardSchema = new Schema({
  _id: {
    type: String,
    required: true,
    default: uuid,
  },
  title: {
    type: String,
    required: true,
  },
  columns: {
    type: [columnSchema],
  },
});

addToJsonOption(boardSchema);

const BoardModel = model<IBoardDocument>('Board', boardSchema);

export default BoardModel;
