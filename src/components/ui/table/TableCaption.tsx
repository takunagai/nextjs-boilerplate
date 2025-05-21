import * as React from "react";
import { cn } from "@/lib/utils";
import type { TableCaptionProps } from "./types";

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, children, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "text-sm text-muted-foreground text-left pb-1 font-bold [&>svg]:inline-block [&>svg]:mr-1",
      className
    )}
    {...props}
  >
    {children}
  </caption>
));
TableCaption.displayName = "TableCaption";
