"use client"; // Potentially, if a custom cell renderer uses client-side hooks/logic.
// For now, it's borderline as it depends on the `column.cell` implementation.

import * as React from "react";
import { cn } from "@/lib/utils";
import type {
	TableCellProps as BaseTableCellProps,
	ColumnDef,
	Row,
} from "./types";

// Update TableCellProps to be generic
export type TableCellProps<TData> = BaseTableCellProps<TData>;

export const TableCell = <TData,>({
	className,
	// children, // Children will be derived from row data and column definition
	row,
	column,
	...props
}: TableCellProps<TData>) => {
	const value = row.original[column.accessorKey as keyof TData];

	const content = column.cell
		? column.cell({ row, value })
		: (value as React.ReactNode); // Directly render the value, assuming it's a ReactNode

	return (
		<td
			className={cn(
				"align-middle", // Base styles from original
				// Ensure padding is applied here if not globally by tableVariants size
				// Example: "px-4 py-2", but this should ideally be handled by tableVariants.size
				className,
			)}
			{...props}
		>
			{content}
		</td>
	);
};
TableCell.displayName = "TableCell";
