"use client"; // Became a client component due to interactive sorting button

import * as React from "react";
import { cn } from "@/lib/utils";
import type { TableHeadProps as BaseTableHeadProps } from "./types";
import { Button } from "@/components/ui/button"; // Assuming a Button component is available
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa"; // Using react-icons

// Update TableHeadProps to be generic
export type TableHeadProps<TData> = BaseTableHeadProps<TData>;

export const TableHead = <TData,>({
  className,
  children, // Will be overridden by column.header if column is provided
  column,
  sortConfig,
  requestSort,
  scope = "col",
  ...props
}: TableHeadProps<TData>) => {
  const isSorted = sortConfig && sortConfig.key === column.accessorKey;
  const sortIcon =
    !column.enableSorting ? null : isSorted ? (
      sortConfig?.direction === "asc" ? (
        <FaSortUp className="ml-2 h-4 w-4" />
      ) : sortConfig?.direction === "desc" ? (
        <FaSortDown className="ml-2 h-4 w-4" />
      ) : (
        <FaSort className="ml-2 h-4 w-4" /> // None or unsorted
      )
    ) : (
      <FaSort className="ml-2 h-4 w-4 opacity-50" /> // Sortable but not sorted
    );

  const headerContent =
    typeof column.header === "function"
      ? column.header({ column } as any) // Cast needed if Column<TData> type isn't perfectly aligned yet
      : column.header;

  return (
    <th
      scope={scope}
      className={cn(
        "bg-muted/50 dark:bg-muted/30 text-left align-middle font-medium text-muted-foreground", // Base styles from shadcn/ui
        // Ensure padding is applied here if not globally by tableVariants size
        // Example: "px-4 py-2", but this should ideally be handled by tableVariants.size
        className
      )}
      {...props}
    >
      {column.enableSorting ? (
        <Button
          variant="ghost"
          onClick={() => requestSort(column.accessorKey)}
          className="p-0 hover:bg-transparent flex items-center" // Minimal styling for button
        >
          {headerContent}
          {sortIcon}
        </Button>
      ) : (
        headerContent
      )}
    </th>
  );
};
TableHead.displayName = "TableHead";
