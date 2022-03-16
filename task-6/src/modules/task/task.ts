import { IBoardDocument } from '../board/board.model';
import { IUserDocument } from '../user/user.model';
import { IColumnDocument } from '../column/column.model';
import { filterFields } from '../../utils/object';

const fieldsToInclude = ['title', 'order', 'description', 'userId', 'boardId', 'columnId'];

export interface ITask {
  title: string;
  order: number;
  description: string;
  userId?: IUserDocument['_id'] | null;
  boardId?: IBoardDocument['_id'];
  columnId?: IColumnDocument['_id'];
}

class Task implements ITask {
  title: string;

  order: number;

  description: string;

  userId?: IUserDocument['_id'] | null;

  boardId?: IBoardDocument['_id'];

  columnId?: IColumnDocument['_id'];

  constructor({ title, order, description, userId, boardId, columnId }: ITask) {
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static filterFields(data: Partial<ITask>) {
    return filterFields(data, fieldsToInclude);
  }
}

export default Task;
