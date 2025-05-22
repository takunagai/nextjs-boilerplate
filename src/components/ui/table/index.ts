/**
 * テーブルコンポーネントとそのサブコンポーネントをエクスポート
 */
export { Table, tableVariants } from "./Table";
export type { TableProps } from "./Table";

// テーブルサブコンポーネント
// メインの要素
export { TableCaption } from "./TableCaption";
export { TableHeader } from "./TableHeader";
export { TableBody } from "./TableBody";
export { TableFooter } from "./TableFooter";
export { TableRow } from "./TableRow";
export { TableHead } from "./TableHead";
export { TableCell } from "./TableCell";

// HTMLネイティブ要素に対応するコンポーネント
export { Tr } from "@/components/ui/table/primitives/Tr";
export { Th } from "@/components/ui/table/primitives/Th";
export { Td } from "@/components/ui/table/primitives/Td";
export { Thead } from "@/components/ui/table/primitives/Thead";
export { Tbody } from "@/components/ui/table/primitives/Tbody";
export { Tfoot } from "@/components/ui/table/primitives/Tfoot";

// 型定義のエクスポート
export type {
  TableChildProps,
  TableCaptionProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableComponents,
  ColumnDef,
  Row,
  SortDirection,
  SortConfig,
} from "./types";
