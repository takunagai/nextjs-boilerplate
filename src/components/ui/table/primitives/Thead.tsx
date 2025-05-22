import * as React from "react";
import { cn } from "@/lib/utils";

export interface TheadProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
}

export const Thead = React.forwardRef<HTMLTableSectionElement, TheadProps>(
  ({ className, children, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn("[&_tr]:border-b", className)}
      {...props}
    >
      {children}
    </thead>
  )
);

Thead.displayName = "Thead";
