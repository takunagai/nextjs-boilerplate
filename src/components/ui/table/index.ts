/**
 * テーブルコンポーネントとそのサブコンポーネントをエクスポート
 *
 * このファイルは以下のテーブル関連コンポーネントと型をエクスポートします：
 * - メインのテーブルコンポーネント
 * - サブコンポーネント（TableHeader, TableBodyなど）
 * - HTMLネイティブ要素に対応するプリミティブコンポーネント
 * - 関連する型定義
 */

// メインのテーブルコンポーネントとその変数をインポート
import { Table as BaseTable, tableVariants } from "./Table";
export { tableVariants };
export type { TableProps } from "./Table";

import { Tbody } from "./primitives/Tbody";
import { Td } from "./primitives/Td";
import { Tfoot } from "./primitives/Tfoot";
import { Th } from "./primitives/Th";
import { Thead } from "./primitives/Thead";
// プリミティブコンポーネントのインポート
import { Tr } from "./primitives/Tr";
import { TableBody } from "./TableBody";
// サブコンポーネントのインポート
import { TableCaption } from "./TableCaption";
import { TableCell } from "./TableCell";
import { TableFooter } from "./TableFooter";
import { TableHead } from "./TableHead";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

// Tableコンポーネントに静的プロパティを追加してエクスポート
export const Table = Object.assign(BaseTable, {
	// 大文字バージョン (React 規約)
	Caption: TableCaption,
	Header: TableHeader,
	Body: TableBody,
	Footer: TableFooter,
	Head: TableHead,
	Row: TableRow,
	Cell: TableCell,

	// 小文字バージョン (HTML 互換)
	caption: TableCaption,
	thead: Thead,
	tbody: Tbody,
	tfoot: Tfoot,
	tr: Tr,
	th: Th,
	td: Td,
});

export { Tbody } from "./primitives/Tbody";
export { Td } from "./primitives/Td";
export { Tfoot } from "./primitives/Tfoot";
export { Th } from "./primitives/Th";
export { Thead } from "./primitives/Thead";
// HTMLネイティブ要素に対応するプリミティブコンポーネントをエクスポート
export { Tr } from "./primitives/Tr";
export { TableBody } from "./TableBody";
// サブコンポーネントをエクスポート
export { TableCaption } from "./TableCaption";
export { TableCell } from "./TableCell";
export { TableFooter } from "./TableFooter";
export { TableHead } from "./TableHead";
export { TableHeader } from "./TableHeader";
export { TableRow } from "./TableRow";

// 型定義をエクスポート
export type {
	ColumnDef,
	Row,
	SortConfig,
	SortDirection,
	TableBodyProps,
	TableCaptionProps,
	TableCellProps,
	TableChildProps,
	TableComponents,
	TableFooterProps,
	TableHeaderProps,
	TableHeadProps,
	TableRowProps,
} from "./types";
