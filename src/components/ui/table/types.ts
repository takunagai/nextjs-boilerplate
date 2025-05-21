import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";

// Sorting direction
export type SortDirection = "asc" | "desc" | "none";

// Internal representation of a column, extending ColumnDef with runtime properties
export interface Column<TData> extends ColumnDef<TData> {
  // Potentially add internal state for columns if needed later
}

// Representation of a row, containing the original data and potentially other row-specific state
export interface Row<TData> {
  original: TData;
  // id: string; // Unique row ID, can be derived or provided
  // getCells: () => Cell[]; // Function to get all cells for this row
}

// Definition for a table column
export interface ColumnDef<TData, TValue = any> {
  accessorKey: keyof TData | (string & {}); // Key for data access (e.g., 'email' or 'user.firstName')
  header: ReactNode | ((props: { column: Column<TData> }) => ReactNode); // Header content or render function
  cell?: (props: { row: Row<TData>; value: TValue }) => ReactNode; // Custom cell render function
  enableSorting?: boolean;
  // id?: string; // Optional unique ID for the column
}

// Props for the main Table component, now generic for type safety
export interface TableProps<TData> extends Omit<HTMLAttributes<HTMLTableElement>, 'children'> {
  data: TData[];
  columns: ColumnDef<TData>[];
  className?: string;
  // caption?: ReactNode; // Optional caption, can be direct or via Table.Caption
  // variant, borderedCells, etc., are from tableVariants, will be merged in Table.tsx
}


// 各サブコンポーネントの共通Props型
export type TableChildProps = {
  children: ReactNode;
  className?: string;
};

// Specific props for TableCaption if they differ beyond TableChildProps
export type TableCaptionProps = TableChildProps & HTMLAttributes<HTMLTableCaptionElement>;

// Specific props for TableHeader (Thead) - will need columns and sort state
export type TableHeaderProps<TData> = TableChildProps & HTMLAttributes<HTMLTableSectionElement> & {
  columns: ColumnDef<TData>[];
  sortConfig: { key: keyof TData | (string & {}); direction: SortDirection } | null;
  requestSort: (key: keyof TData | (string & {})) => void;
};

// Specific props for TableBody (Tbody) - will need columns and data
export type TableBodyProps<TData> = TableChildProps & HTMLAttributes<HTMLTableSectionElement> & {
  rows: Row<TData>[]; // Expecting rows to be pre-processed (e.g., sorted)
  columns: ColumnDef<TData>[];
};

// Specific props for TableFooter (Tfoot)
export type TableFooterProps = TableChildProps & HTMLAttributes<HTMLTableSectionElement>;

// Specific props for TableRow (Tr) - will need row data and columns
export type TableRowProps<TData> = TableChildProps & HTMLAttributes<HTMLTableRowElement> & {
  row: Row<TData>;
  columns: ColumnDef<TData>[];
};

// Specific props for TableHead (Th) - will need column definition and sort state
export type TableHeadProps<TData> = TableChildProps & ThHTMLAttributes<HTMLTableCellElement> & {
  column: ColumnDef<TData>;
  sortConfig: { key: keyof TData | (string & {}); direction: SortDirection } | null;
  requestSort: (key: keyof TData | (string & {})) => void;
  scope?: "col" | "row";
};

// Specific props for TableCell (Td) - will need row data and column definition
export type TableCellProps<TData> = TableChildProps & TdHTMLAttributes<HTMLTableCellElement> & {
  row: Row<TData>;
  column: ColumnDef<TData>;
};

// Interface for the main Table component's static properties (sub-components)
// This helps with type checking for the nested API
// Note: These might need to be generic if they directly use TData, but typically
// they are used within the context of a generic Table instance.
export interface TableComponents<TData = any> {
  Caption: React.FC<TableCaptionProps>;
  Header: React.FC<TableHeaderProps<TData>>;
  Body: React.FC<TableBodyProps<TData>>;
  Footer: React.FC<TableFooterProps>;
  Row: React.FC<TableRowProps<TData>>;
  Head: React.FC<TableHeadProps<TData>>;
  Cell: React.FC<TableCellProps<TData>>;
}
