import * as React from "react";
import { cn } from "@/lib/utils";

export interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
	children?: React.ReactNode;
}

export const Th = React.forwardRef<HTMLTableCellElement, ThProps>(
	({ className, children, ...props }, ref) => (
		<th
			ref={ref}
			className={cn(
				"h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
				className,
			)}
			{...props}
		>
			{children}
		</th>
	),
);

Th.displayName = "Th";
