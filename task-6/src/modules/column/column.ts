export interface IColumn {
  title: string;
  order: number;
}

class Column {
  title: string;

  order: number;

  constructor({ title, order }: IColumn) {
    this.title = title;
    this.order = order;
  }
}

export default Column;
