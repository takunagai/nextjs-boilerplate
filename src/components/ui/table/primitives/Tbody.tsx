import * as React from "react";
import { cn } from "@/lib/utils";

export interface TbodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
}

export const Tbody = React.forwardRef<HTMLTableSectionElement, TbodyProps>(
  ({ className, children, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    >
      {children}
    </tbody>
  )
);

Tbody.displayName = "Tbody";
