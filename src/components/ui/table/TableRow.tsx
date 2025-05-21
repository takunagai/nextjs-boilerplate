"use client"; // Potentially, if TableCell becomes a client component or if row-specific
              // interactions are added later. For now, it just maps props.

import * as React from "react";
import { cn } from "@/lib/utils";
import type { TableRowProps as BaseTableRowProps, Row, ColumnDef } from "./types";
import { TableCell } from "./TableCell"; // The actual cell component

// Update TableRowProps to be generic
export type TableRowProps<TData> = BaseTableRowProps<TData>;

export const TableRow = <TData,>({
  className,
  // children, // Children will be derived from row data and columns
  row,
  columns,
  ...props
}: TableRowProps<TData>) => {
  return (
    <tr
      className={cn("transition-colors hover:bg-muted/50 border-b", className)} // Added border-b for default horizontal lines
      {...props}
    >
      {columns.map((column, cellIndex) => (
        <TableCell<TData>
          key={(column.accessorKey as string) || cellIndex} // Ensure key is string
          row={row}
          column={column}
        />
      ))}
    </tr>
  );
};
TableRow.displayName = "TableRow";
