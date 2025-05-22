import * as React from "react";
import { cn } from "@/lib/utils";

export interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children?: React.ReactNode;
}

export const Tr = React.forwardRef<HTMLTableRowElement, TrProps>(
  ({ className, children, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  )
);

Tr.displayName = "Tr";
