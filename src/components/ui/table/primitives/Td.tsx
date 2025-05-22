import * as React from "react";
import { cn } from "@/lib/utils";

export interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
}

export const Td = React.forwardRef<HTMLTableCellElement, TdProps>(
  ({ className, children, ...props }, ref) => (
    <td
      ref={ref}
      className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
      {...props}
    >
      {children}
    </td>
  )
);

Td.displayName = "Td";
