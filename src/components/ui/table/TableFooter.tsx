import * as React from "react";
import { cn } from "@/lib/utils";
import type { TableFooterProps } from "./types";

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, children, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("bg-muted/50", className)}
    {...props}
  >
    {children}
  </tfoot>
));
TableFooter.displayName = "TableFooter";
