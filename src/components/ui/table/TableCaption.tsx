"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { TableCaptionProps } from "./types";

/**
 * テーブルのキャプションコンポーネント
 * テーブルの説明や補足を表示するために使用
 */
export const TableCaption = React.forwardRef<
	HTMLTableCaptionElement,
	TableCaptionProps
>(({ className, children, ...props }, ref) => (
	<caption
		ref={ref}
		className={cn(
			"text-sm text-muted-foreground pb-2 pt-2 font-medium [&>svg]:mr-2 [&>svg]:inline-block",
			className,
		)}
		{...props}
	>
		{children}
	</caption>
));

TableCaption.displayName = "TableCaption";
