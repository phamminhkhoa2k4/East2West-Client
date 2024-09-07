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
    data: DataRow[] ;
    title: string;
    createUrl: string;
    editUrl?: string;
    deleteUrl?: string;
    detailUrl?: string 
  }



  export interface StaffTableProps {
    columns: Column[];
    data: DataRow[];
    title: string;
  
  }