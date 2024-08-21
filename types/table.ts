export interface Column {
  key: string;
  label: string;
  isNumeric?: boolean;
}

export interface DataRow {
  [key: string]: string | number;
}

export interface CustomTableProps {
  columns: Column[];
  data: DataRow[];
  title : string
  createUrl:string
}
