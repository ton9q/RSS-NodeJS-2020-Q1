import { filterFields } from '../../utils/object';
import Column from '../column/column';

const fieldsToInclude = ['title', 'columns'];

export interface IBoard {
  title: string;
  columns?: Column[];
}

class Board {
  title: string;

  columns?: Column[];

  constructor({ title, columns }: IBoard) {
    this.title = title;
    this.columns = columns;
  }

  static filterFields(data: Partial<IBoard>) {
    return filterFields(data, fieldsToInclude);
  }
}

export default Board;
