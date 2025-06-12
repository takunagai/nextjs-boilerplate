"use client"; // Potentially, if TableRow or TableCell become client components
// or if TableBody itself needs client-side logic later.
// For now, it just maps props, so it's borderline.

import * as React from "react";
import { cn } from "@/lib/utils";
import { TableRow } from "./TableRow"; // The actual row component
import type {
	TableBodyProps as BaseTableBodyProps,
	ColumnDef,
	Row,
} from "./types";

// Update TableBodyProps to be generic
export type TableBodyProps<TData> = BaseTableBodyProps<TData>;

export const TableBody = <TData,>({
	className,
	// children, // Children will be derived from rows and columns
	rows,
	columns,
	...props
}: TableBodyProps<TData>) => {
	return (
		<tbody className={cn("[&_tr:last-child]:border-0", className)} {...props}>
			{rows.map((row, rowIndex) => (
				<TableRow<TData>
					key={rowIndex} // Ideally, rows would have a unique ID: row.id
					row={row}
					columns={columns}
				/>
			))}
		</tbody>
	);
};
TableBody.displayName = "TableBody";
