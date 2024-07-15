export type ColumnType = {
  id: number;
  name: string;
  column_number: number;
  board_id: number;
};

export type ColumnCreateType = {
  name: string;
};

export type ColumnEditType = {
  name: string;
  columnNumber: string;
};
