"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";

// サブコンポーネントのインポート
import { TableCaption } from "./TableCaption";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableFooter } from "./TableFooter";
import { TableHead } from "./TableHead";
import { TableRow } from "./TableRow";
import { TableCell } from "./TableCell";

// プリミティブコンポーネントのインポート
import { Tr } from "./primitives/Tr";
import { Th } from "./primitives/Th";
import { Td } from "./primitives/Td";
import { Thead } from "./primitives/Thead";
import { Tbody } from "./primitives/Tbody";
import { Tfoot } from "./primitives/Tfoot";

// 型定義のインポート
import type { ColumnDef, SortConfig, Row, TableComponents } from "./types";

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
			} else if (
				prevSortConfig &&
				prevSortConfig.key === key &&
				prevSortConfig.direction === "desc"
			) {
				return null; // 3回目のクリックでソートを解除
			} else {
				return { key, direction: "asc" };
			}
		});
	}, []);

	// ソート済みデータの計算
	const sortedData = React.useMemo(() => {
		if (!sortConfig || !data.length) return data;

		return [...data].sort((a, b) => {
			const aValue = a[sortConfig.key as keyof TData];
			const bValue = b[sortConfig.key as keyof TData];

			if (aValue === bValue) return 0;

			// 異なる型に対して適切に処理
			if (typeof aValue === "string" && typeof bValue === "string") {
				return sortConfig.direction === "asc"
					? aValue.localeCompare(bValue)
					: bValue.localeCompare(aValue);
			}

			if (aValue === null || aValue === undefined) return 1;
			if (bValue === null || bValue === undefined) return -1;

			return sortConfig.direction === "asc"
				? aValue > bValue
					? 1
					: -1
				: aValue < bValue
					? 1
					: -1;
		});
	}, [data, sortConfig]);

	// 行データの生成
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
			{props.children ? (
				props.children
			) : (
				<>
					{columns && columns.length > 0 && (
						<>
							<TableHeader
								columns={columns}
								sortConfig={sortConfig}
								requestSort={requestSort}
							/>
							<TableBody rows={rows} columns={columns} />
						</>
					)}
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
