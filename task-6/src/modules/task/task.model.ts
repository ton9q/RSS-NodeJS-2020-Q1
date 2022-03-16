import { Schema, model, Document } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { addToJsonOption } from '../../utils/mongoose';
import Task from './task';

export interface ITaskDocument extends Task, Document {
  _id?: string;
  __v?: number;
}

const taskSchema = new Schema({
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
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  boardId: {
    type: String,
  },
  columnId: {
    type: String,
  },
});

addToJsonOption(taskSchema);

const TaskModel = model<ITaskDocument>('Task', taskSchema);

export default TaskModel;
