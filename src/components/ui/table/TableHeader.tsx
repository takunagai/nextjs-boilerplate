"use client"; // Potentially, if it uses hooks or context related to Table state.
// For now, it only maps props, so it might not be strictly necessary
// unless TableHead becomes interactive in a way that requires client context.

import * as React from "react";
import { cn } from "@/lib/utils";
import type { TableHeaderProps as BaseHeaderProps, ColumnDef } from "./types";
import { TableRow } from "./TableRow"; // Assuming TableRow might be used for the header row
import { TableHead } from "./TableHead"; // The actual header cell component

// Update TableHeaderProps to be generic
export type TableHeaderProps<TData> = BaseHeaderProps<TData>;

export const TableHeader = <TData,>({
	className,
	// children, // Children will be derived from columns
	columns,
	sortConfig,
	requestSort,
	...props
}: TableHeaderProps<TData>) => {
	return (
		<thead
			className={cn("bg-muted/50 [&_th]:text-muted-foreground", className)}
			{...props}
		>
			{/* Assuming a single header row for now. Multi-row headers would need more complex logic. */}
			<TableRow>
				{columns.map((column, index) => (
					<TableHead<TData>
						key={(column.accessorKey as string) || index} // Ensure key is string
						column={column}
						sortConfig={sortConfig}
						requestSort={requestSort}
						// className={column.className} // If you add className to ColumnDef
					/>
				))}
			</TableRow>
		</thead>
	);
};
TableHeader.displayName = "TableHeader";
