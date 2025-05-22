import type { HTMLAttributes, ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";

/**
 * ソート方向を表す型
 */
export type SortDirection = "asc" | "desc" | "none";

/**
 * テーブルの行データを表す型
 */
export interface Row<TData> {
  original: TData;
}

/**
 * テーブル列の定義を表す型
 */
export interface ColumnDef<TData, TValue = unknown> {
  /** データへのアクセスキー */
  accessorKey: keyof TData | (string & {});
  /** ヘッダーの内容 */
  header: ReactNode | ((props: { column: ColumnDef<TData> }) => ReactNode);
  /** セルのカスタムレンダリング関数 */
  cell?: (props: { row: Row<TData>; value: TValue }) => ReactNode;
  /** ソート機能を有効にするかどうか */
  enableSorting?: boolean;
}

/**
 * ソート設定を表す型
 */
export interface SortConfig<TData> {
  key: keyof TData | (string & {});
  direction: SortDirection;
}

/**
 * メインのTableコンポーネントのProps
 */
export interface TableProps<TData> {
  /** テーブルデータ */
  data: TData[];
  /** 列定義 */
  columns: ColumnDef<TData>[];
  /** クラス名 */
  className?: string;
}

/**
 * 全てのテーブル関連コンポーネントの共通Props
 */
export type TableChildProps = {
  children?: ReactNode;
  className?: string;
};

/**
 * TableCaptionコンポーネントのProps
 */
export type TableCaptionProps = TableChildProps & HTMLAttributes<HTMLTableCaptionElement>;

/**
 * TableHeaderコンポーネントのProps
 */
export type TableHeaderProps<TData> = Omit<TableChildProps, 'children'> & HTMLAttributes<HTMLTableSectionElement> & {
  columns: ColumnDef<TData>[];
  sortConfig: SortConfig<TData> | null;
  requestSort: (key: keyof TData | (string & {})) => void;
};

/**
 * TableBodyコンポーネントのProps
 */
export type TableBodyProps<TData> = Omit<TableChildProps, 'children'> & HTMLAttributes<HTMLTableSectionElement> & {
  rows: Row<TData>[];
  columns: ColumnDef<TData>[];
};

/**
 * TableFooterコンポーネントのProps
 */
export type TableFooterProps = TableChildProps & HTMLAttributes<HTMLTableSectionElement>;

/**
 * TableRowコンポーネントのProps
 */
export type TableRowProps<TData> = Omit<TableChildProps, 'children'> & HTMLAttributes<HTMLTableRowElement> & {
  row: Row<TData>;
  columns: ColumnDef<TData>[];
};

/**
 * TableHeadコンポーネントのProps
 */
export type TableHeadProps<TData> = Omit<TableChildProps, 'children'> & ThHTMLAttributes<HTMLTableCellElement> & {
  column: ColumnDef<TData>;
  sortConfig: SortConfig<TData> | null;
  requestSort: (key: keyof TData | (string & {})) => void;
  scope?: "col" | "row";
};

/**
 * TableCellコンポーネントのProps
 */
export type TableCellProps<TData> = Omit<TableChildProps, 'children'> & TdHTMLAttributes<HTMLTableCellElement> & {
  row: Row<TData>;
  column: ColumnDef<TData>;
};

/**
 * テーブルコンポーネントの静的プロパティ（サブコンポーネント）のインターフェース
 */
export interface TableComponents<TData> {
  Caption: React.FC<TableCaptionProps>;
  Header: React.FC<TableHeaderProps<TData>>;
  Body: React.FC<TableBodyProps<TData>>;
  Footer: React.FC<TableFooterProps>;
  Row: React.FC<TableRowProps<TData>>;
  Head: React.FC<TableHeadProps<TData>>;
  Cell: React.FC<TableCellProps<TData>>;
  
  caption: React.FC<React.HTMLAttributes<HTMLTableCaptionElement>>;
  thead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
  tbody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
  tfoot: React.FC<React.HTMLAttributes<HTMLTableSectionElement>>;
  tr: React.FC<React.HTMLAttributes<HTMLTableRowElement>>;
  th: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>>;
  td: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>>;
}
