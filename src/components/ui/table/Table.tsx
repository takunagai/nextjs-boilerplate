"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { TableCaption } from "./TableCaption";
import { TableHeader as OriginalTableHeader } from "./TableHeader"; // Renamed to avoid conflict
import { TableBody as OriginalTableBody } from "./TableBody"; // Renamed to avoid conflict
import { TableFooter } from "./TableFooter";
import { TableRow } from "./TableRow";
import { TableHead } from "./TableHead";
import { TableCell } from "./TableCell";
import type {
  TableComponents,
  TableProps as NewTableProps, // Renamed to avoid conflict
  ColumnDef,
  Row,
  SortDirection,
} from "./types";

// テーブル本体のバリエーション定義
export const tableVariants = cva(
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
        vertical: "[&_th]:border-r [&_td]:border-r", // 垂直罫線のみ
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
  }
);

// Combine original TableProps (variant props) with new data-driven props
export type TableProps<TData> = VariantProps<typeof tableVariants> & NewTableProps<TData> & Omit<HTMLAttributes<HTMLTableElement>, 'children' | 'data'>;


// メインとなるTableコンポーネント
const BaseTable = <TData,>({
  className,
  variant,
  borderedCells,
  striped,
  size,
  captionPosition,
  align,
  data,
  columns,
  ...props
}: TableProps<TData>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TData | (string & {});
    direction: SortDirection;
  } | null>(null);

  const requestSort = (key: keyof TData | (string & {})) => {
    let direction: SortDirection = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    } else if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "desc"
    ) {
      direction = "none";
    }
    setSortConfig(direction === "none" ? null : { key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig || sortConfig.direction === "none") {
      return data;
    }
    const { key, direction } = sortConfig;
    return [...data].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue === null || aValue === undefined) return direction === "asc" ? -1 : 1;
      if (bValue === null || bValue === undefined) return direction === "asc" ? 1 : -1;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === "asc" ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      // Add more type comparisons if needed (e.g., dates)
      return 0;
    });
  }, [data, sortConfig]);

  const rows: Row<TData>[] = useMemo(() => sortedData.map(item => ({ original: item })), [sortedData]);

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
          })
        )}
        {...props}
      >
        {/* Render children if provided (for manual structure), or render based on data/columns */}
        {/* For now, prioritizing data/columns rendering */}
        <OriginalTableHeader columns={columns as ColumnDef<TData>[]} sortConfig={sortConfig} requestSort={requestSort} />
        <OriginalTableBody rows={rows} columns={columns as ColumnDef<TData>[]} />
        {/* Footer might also need columns if it renders aggregates, but keeping it simple for now */}
        {/* <TableFooter /> */}
      </table>
    </div>
  );
};

// Attach sub-components for the nested API
// Note: These sub-components are not generic yet, which might be an issue if they need TData directly.
// This setup assumes they are used within a generic Table instance context.
(BaseTable as TableComponents<any>).Caption = TableCaption;
(BaseTable as TableComponents<any>).Header = OriginalTableHeader;
(BaseTable as TableComponents<any>).Body = OriginalTableBody;
(BaseTable as TableComponents<any>).Footer = TableFooter;
(BaseTable as TableComponents<any>).Row = TableRow;
(BaseTable as TableComponents<any>).Head = TableHead;
(BaseTable as TableComponents<any>).Cell = TableCell;

export const Table = BaseTable as typeof BaseTable & TableComponents<any>;
