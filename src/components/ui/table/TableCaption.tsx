"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { type TableCaptionProps } from "./types";

/**
 * テーブルのキャプションコンポーネント
 */
export const TableCaption = React.forwardRef<
	HTMLTableCaptionElement,
	TableCaptionProps
>(({ className, children, ...props }, ref) => (
	<caption
		ref={ref}
		className={cn("mt-4 text-sm text-muted-foreground", className)}
		{...props}
	>
		{children}
	</caption>
));

TableCaption.displayName = "TableCaption";
