import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type {
	HTMLAttributes,
	ReactNode,
	TdHTMLAttributes,
	ThHTMLAttributes,
} from "react";

// テーブル本体のバリエーション定義
const tableVariants = cva(
	// ベースクラス
	"w-full text-sm overflow-x-auto border-collapse",
	{
		variants: {
			// テーブルの見た目バリエーション
			variant: {
				default: "",
				bordered: "border",
				card: "border rounded-sm shadow-xs",
			},
			// 罫線タイプ
			borderedCells: {
				none: "", // 罫線なし
				all: "[&_th]:border [&_td]:border", // 全セル罫線
				horizontal: "[&_tr]:border-b", // 水平罫線のみ
				vertical:
					"[&_th]:border-r [&_td]:border-r", // 垂直罫線のみ
			},
			// 偶数行のストライプ
			striped: {
				true: "[&>tbody>tr:nth-child(even)]:bg-muted/30",
				false: "",
			},
			// サイズバリエーション（パディング調整）
			size: {
				xs: "[&_th]:px-1 [&_td]:px-1 [&_th]:py-0.5 [&_td]:py-0.5 text-xs",
				sm: "[&_th]:px-2 [&_td]:px-2 [&_th]:py-1.5 [&_td]:py-1.5 text-xs",
				md: "[&_th]:px-4 [&_td]:px-4 [&_th]:py-2 [&_td]:py-2 text-sm",
				lg: "[&_th]:px-6 [&_td]:px-6 [&_th]:py-3 [&_td]:py-3 text-base",
			},
			// キャプションの位置
			captionPosition: {
				top: "caption-top",
				bottom: "caption-bottom",
			},
			// テーブルの配置
			align: {
				left: "text-left",
				center: "text-center",
				right: "text-right",
			},
		},
		defaultVariants: {
			variant: "default",
			borderedCells: "all",
			striped: false,
			size: "md",
			captionPosition: "top",
			align: "center",
		},
	},
);

// テーブル本体のProps型定義
export type TableProps = {
	children: ReactNode;
	className?: string;
} & VariantProps<typeof tableVariants> &
	HTMLAttributes<HTMLTableElement>;

// メインとなるTableコンポーネント
export function Table({
	children,
	className,
	variant,
	borderedCells,
	striped,
	size,
	captionPosition,
	align,
	...props
}: TableProps) {
	return (
		<div className="w-full overflow-x-auto">
			<table
				className={cn(
					tableVariants({
						variant,
						borderedCells,
						striped,
						size,
						captionPosition,
						align,
						className,
					}),
				)}
				{...props}
			>
				{children}
			</table>
		</div>
	);
}

// 各サブコンポーネントの共通Props型
type TableChildProps = {
	children: ReactNode;
	className?: string;
};

// Captionコンポーネント
function Caption({
	children,
	className,
	...props
}: TableChildProps & HTMLAttributes<HTMLTableCaptionElement>) {
	return (
		<caption
			className={cn(
				"text-sm text-muted-foreground text-left pb-1 font-bold [&>svg]:inline-block [&>svg]:mr-1",
				className,
			)}
			{...props}
		>
			{children}
		</caption>
	);
}

// Theadコンポーネント
function Thead({
	children,
	className,
	...props
}: TableChildProps & HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<thead
			className={cn("bg-muted/50 [&_th]:text-muted-foreground", className)}
			{...props}
		>
			{children}
		</thead>
	);
}

// Tbodyコンポーネント
function Tbody({
	children,
	className,
	...props
}: TableChildProps & HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<tbody className={cn("[&_tr:last-child]:border-0", className)} {...props}>
			{children}
		</tbody>
	);
}

// Tfootコンポーネント
function Tfoot({
	children,
	className,
	...props
}: TableChildProps & HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<tfoot className={cn("bg-muted/50", className)} {...props}>
			{children}
		</tfoot>
	);
}

// Trコンポーネント
function Tr({
	children,
	className,
	...props
}: TableChildProps & HTMLAttributes<HTMLTableRowElement>) {
	return (
		<tr
			className={cn("transition-colors hover:bg-muted/50", className)}
			{...props}
		>
			{children}
		</tr>
	);
}

// Thコンポーネント
function Th({
	children,
	className,
	scope = "col",
	...props
}: TableChildProps &
	ThHTMLAttributes<HTMLTableCellElement> & { scope?: "col" | "row" }) {
	return (
		<th
			scope={scope}
			className={cn("bg-muted/50 dark:bg-muted/30", className)}
			{...props}
		>
			{children}
		</th>
	);
}

// Tdコンポーネント
function Td({
	children,
	className,
	...props
}: TableChildProps & TdHTMLAttributes<HTMLTableCellElement>) {
	return (
		<td className={cn("align-middle", className)} {...props}>
			{children}
		</td>
	);
}

// ネスト型APIの実現（staticプロパティとして各サブコンポーネントをTableに追加）
Table.caption = Caption;
Table.thead = Thead;
Table.tbody = Tbody;
Table.tfoot = Tfoot;
Table.tr = Tr;
Table.th = Th;
Table.td = Td;

// 型定義のエクスポート - IDE補完のためのもの
export interface TableComponents {
	caption: typeof Caption;
	thead: typeof Thead;
	tbody: typeof Tbody;
	tfoot: typeof Tfoot;
	tr: typeof Tr;
	th: typeof Th;
	td: typeof Td;
}
