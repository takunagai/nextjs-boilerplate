"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import * as React from "react";
import { cn } from "@/lib/utils";
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

// 型定義のインポート
import type { ColumnDef, Row, SortConfig, TableComponents } from "./types";

/**
 * 型安全なソート関数
 */
function sortValues(
	aValue: unknown,
	bValue: unknown,
	direction: "asc" | "desc",
): number {
	// 同じ値の場合
	if (aValue === bValue) return 0;

	// null/undefined の処理
	if (aValue === null || aValue === undefined) return 1;
	if (bValue === null || bValue === undefined) return -1;

	// 文字列の比較
	if (typeof aValue === "string" && typeof bValue === "string") {
		const result = aValue.localeCompare(bValue);
		return direction === "asc" ? result : -result;
	}

	// 数値の比較
	if (typeof aValue === "number" && typeof bValue === "number") {
		const result = aValue - bValue;
		return direction === "asc" ? result : -result;
	}

	// 日付の比較
	if (aValue instanceof Date && bValue instanceof Date) {
		const result = aValue.getTime() - bValue.getTime();
		return direction === "asc" ? result : -result;
	}

	// ブール値の比較
	if (typeof aValue === "boolean" && typeof bValue === "boolean") {
		const result = aValue === bValue ? 0 : aValue ? 1 : -1;
		return direction === "asc" ? result : -result;
	}

	// その他の型の場合は文字列に変換して比較
	const aStr = String(aValue);
	const bStr = String(bValue);
	const result = aStr.localeCompare(bStr);
	return direction === "asc" ? result : -result;
}

/**
 * テーブルコンポーネントのバリアント定義
 */
const tableVariants = cva(
	"w-full caption-bottom border-collapse overflow-auto",
	{
		variants: {
			variant: {
				default: "",
				bordered: "border border-border",
				card: "border rounded-md shadow-sm",
			},
			size: {
				xs: "text-xs [&_th]:p-1 [&_td]:p-1",
				sm: "text-sm [&_th]:p-2 [&_td]:p-2",
				default: "text-sm [&_th]:p-3 [&_td]:p-3",
				md: "text-sm [&_th]:p-4 [&_td]:p-4",
				lg: "text-base [&_th]:p-6 [&_td]:p-6",
			},
			align: {
				default: "",
				center: "text-center",
				left: "text-left",
				right: "text-right",
			},
			borderedCells: {
				true: "[&_th]:border [&_td]:border [&_th]:border-border [&_td]:border-border",
				false: "",
				none: "",
				all: "[&_th]:border [&_td]:border [&_th]:border-border [&_td]:border-border",
				horizontal: "[&_tr]:border-b [&_tr]:border-border",
				vertical:
					"[&_th]:border-r [&_td]:border-r [&_th]:border-border [&_td]:border-border",
			},
			striped: {
				true: "[&_tbody_tr:nth-child(odd)]:bg-muted/50",
				false: "",
			},
			captionPosition: {
				top: "caption-top",
				bottom: "caption-bottom",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			align: "default",
			borderedCells: false,
			striped: false,
			captionPosition: "bottom",
		},
	},
);

/**
 * テーブルコンポーネントのProps型
 */
type TableProps<TData = Record<string, unknown>> =
	HTMLAttributes<HTMLTableElement> &
		VariantProps<typeof tableVariants> & {
			data?: TData[];
			columns?: ColumnDef<TData>[];
		};

/**
 * テーブル基本コンポーネント
 */
function BaseTable<TData = Record<string, unknown>>({
	className,
	variant,
	borderedCells,
	striped,
	size,
	captionPosition,
	align,
	data = [],
	columns = [],
	...props
}: TableProps<TData>) {
	// ソート状態
	const [sortConfig, setSortConfig] = React.useState<SortConfig<TData> | null>(
		null,
	);

	// ソートリクエスト処理
	const requestSort = React.useCallback((key: keyof TData | (string & {})) => {
		setSortConfig((prevSortConfig) => {
			if (
				prevSortConfig &&
				prevSortConfig.key === key &&
				prevSortConfig.direction === "asc"
			) {
				return { key, direction: "desc" };
			}
			if (
				prevSortConfig &&
				prevSortConfig.key === key &&
				prevSortConfig.direction === "desc"
			) {
				return null; // 3回目のクリックでソートを解除
			}
			return { key, direction: "asc" };
		});
	}, []);

	// ソート済みデータの計算（メモ化）
	const sortedData = React.useMemo(() => {
		if (!sortConfig || !data.length) return data;

		return [...data].sort((a, b) => {
			const aValue = a[sortConfig.key as keyof TData];
			const bValue = b[sortConfig.key as keyof TData];

			return sortValues(aValue, bValue, sortConfig.direction as "asc" | "desc");
		});
	}, [data, sortConfig]);

	// 行データの生成（メモ化）
	const rows: Row<TData>[] = React.useMemo(
		() => sortedData.map((item) => ({ original: item })),
		[sortedData],
	);

	return (
		<table
			className={cn(
				tableVariants({
					variant,
					borderedCells,
					striped,
					size,
					captionPosition,
					align,
				}),
				className,
			)}
			{...props}
		>
			{props.children
				? props.children
				: columns &&
					columns.length > 0 && (
						<>
							<TableHeader
								columns={columns}
								sortConfig={sortConfig}
								requestSort={requestSort}
							/>
							<TableBody rows={rows} columns={columns} />
						</>
					)}
		</table>
	);
}

// コンポーネント合成パターンを実装したテーブルコンポーネント
type TableType = typeof BaseTable & TableComponents<unknown>;
const Table = BaseTable as TableType;

// 大文字バージョン (React 規約)
Table.Caption = TableCaption;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Footer = TableFooter;
Table.Head = TableHead;
Table.Row = TableRow;
Table.Cell = TableCell;

// 小文字バージョン (HTML 互換)
// プリミティブコンポーネントを直接使用
Table.caption = TableCaption;
Table.thead = Thead;
Table.tbody = Tbody;
Table.tfoot = Tfoot;
Table.tr = Tr;
Table.th = Th;
Table.td = Td;

export { Table, tableVariants };
export type { TableProps };
