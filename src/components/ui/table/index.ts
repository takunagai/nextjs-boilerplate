/**
 * テーブルコンポーネントとそのサブコンポーネントをエクスポート
 *
 * このファイルは以下のテーブル関連コンポーネントと型をエクスポートします：
 * - メインのテーブルコンポーネント
 * - サブコンポーネント（TableHeader, TableBodyなど）
 * - HTMLネイティブ要素に対応するプリミティブコンポーネント
 * - 関連する型定義
 */

// メインのテーブルコンポーネントとその変数をエクスポート
export { Table, tableVariants } from "./Table";
export type { TableProps } from "./Table";

// サブコンポーネントをエクスポート
export { TableCaption } from "./TableCaption";
export { TableHeader } from "./TableHeader";
export { TableBody } from "./TableBody";
export { TableFooter } from "./TableFooter";
export { TableHead } from "./TableHead";
export { TableRow } from "./TableRow";
export { TableCell } from "./TableCell";

// HTMLネイティブ要素に対応するプリミティブコンポーネントをエクスポート
export { Tr } from "./primitives/Tr";
export { Th } from "./primitives/Th";
export { Td } from "./primitives/Td";
export { Thead } from "./primitives/Thead";
export { Tbody } from "./primitives/Tbody";
export { Tfoot } from "./primitives/Tfoot";

// 型定義をエクスポート
export type {
	TableChildProps,
	TableCaptionProps,
	TableHeaderProps,
	TableBodyProps,
	TableFooterProps,
	TableRowProps,
	TableHeadProps,
	TableCellProps,
	ColumnDef,
	Row,
	SortDirection,
	SortConfig,
	TableComponents,
} from "./types";
