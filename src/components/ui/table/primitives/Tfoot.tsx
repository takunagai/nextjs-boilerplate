import * as React from "react";
import { cn } from "@/lib/utils";

export interface TfootProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
}

export const Tfoot = React.forwardRef<HTMLTableSectionElement, TfootProps>(
  ({ className, children, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn("bg-muted/50 font-medium", className)}
      {...props}
    >
      {children}
    </tfoot>
  )
);

Tfoot.displayName = "Tfoot";
