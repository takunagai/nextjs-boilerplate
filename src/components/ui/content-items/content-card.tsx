"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ContentItem } from "./index";
import { contentCardVariants, imageVariants } from "./index";

// カードバリアント用のインターフェース
export interface ContentCardProps {
	item: ContentItem;
	aspectRatio: "square" | "portrait" | "landscape" | "auto";
	imagePosition?: "top" | "bottom" | "left" | "right";
	isReversed?: boolean;
}

export function ContentCard({
	item,
	aspectRatio,
	imagePosition = "top",
	isReversed = false,
}: ContentCardProps) {
	// カードのクラス名をCVAから取得
	const cardClassName = contentCardVariants({
		imagePosition,
		isReversed,
	});

	// 画像のクラス名をCVAから取得
	const imageClassName = imageVariants({
		aspectRatio,
		imagePosition,
	});

	return (
		<Card className={cn(cardClassName, "border h-full flex flex-col")}>
			{item.imageUrl && (
				<div className={imageClassName}>
					<AspectRatio
						ratio={
							aspectRatio === "square"
								? 1
								: aspectRatio === "portrait"
									? 2 / 3
									: aspectRatio === "landscape"
										? 16 / 9
										: undefined
						}
					>
						<Image
							src={item.imageUrl}
							alt={`${item.title}の画像`}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</AspectRatio>
				</div>
			)}

			<div className="flex-1 p-6 flex flex-col">
				<CardHeader className="p-0">
					<CardTitle className="text-xl font-bold tracking-tight">
						{item.title}
					</CardTitle>
				</CardHeader>

				{item.description && (
					<CardContent className="p-0 mt-2 flex-1">
						<p className="text-muted-foreground">{item.description}</p>
					</CardContent>
				)}
			</div>
		</Card>
	);
}
