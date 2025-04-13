"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import type { ContentItem } from "./index";

// シンプルバリアント用のインターフェース
export interface ContentSimpleProps {
	item: ContentItem;
	isReversed?: boolean;
}

export function ContentSimple({ 
	item, 
	isReversed = false 
}: ContentSimpleProps) {
	return (
		<div className={cn(
			"flex items-start gap-4 p-4 rounded-md",
			isReversed && "bg-muted"
		)}>
			{item.icon && (
				<div className="text-primary flex-shrink-0 mt-1">
					{item.icon}
				</div>
			)}
			
			{item.imageUrl && (
				<div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
					<Image
						src={item.imageUrl}
						alt={`${item.title}の画像`}
						fill
						className="object-cover"
						sizes="64px"
					/>
				</div>
			)}
			
			<div className="flex-1 space-y-1.5">
				<h3 className="font-medium leading-none">
					{item.title}
				</h3>
				{item.description && (
					<p className="text-sm text-muted-foreground">
						{item.description}
					</p>
				)}
			</div>
		</div>
	);
}
