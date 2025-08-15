"use client"; // Potentially, if it uses hooks or context related to Table state.
// For now, it only maps props, so it might not be strictly necessary
// unless TableHead becomes interactive in a way that requires client context.

import { cn } from "@/lib/utils";
// TableRow requires row data, so we'll use primitive tr for header
import { TableHead } from "./TableHead"; // The actual header cell component
import type { TableHeaderProps as BaseHeaderProps } from "./types";

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
			<tr className="transition-colors hover:bg-muted/50 border-b">
				{columns.map((column, index) => (
					<TableHead<TData>
						key={(column.accessorKey as string) || index} // Ensure key is string
						column={column}
						sortConfig={sortConfig}
						requestSort={requestSort}
						// className={column.className} // If you add className to ColumnDef
					/>
				))}
			</tr>
		</thead>
	);
};
TableHeader.displayName = "TableHeader";
