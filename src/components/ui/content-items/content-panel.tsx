"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ContentItem } from "./index";
import { imageVariants } from "./index";

// パネルバリアント用のインターフェース
export interface ContentPanelProps {
	item: ContentItem;
	aspectRatio: "square" | "portrait" | "landscape" | "auto";
	isReversed?: boolean;
}

export function ContentPanel({
	item,
	aspectRatio,
	isReversed = false,
}: ContentPanelProps) {
	// アスペクト比のクラス名をCVAから取得
	const imageClassName = imageVariants({
		aspectRatio,
		imagePosition: "top",
	});

	return (
		<Card className={cn("p-6 bg-background", isReversed && "bg-muted")}>
			<div className="flex flex-col gap-6">
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
								className="object-cover rounded-md"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						</AspectRatio>
					</div>
				)}

				<div className="space-y-4">
					<CardHeader className="p-0">
						<CardTitle className="text-xl font-bold tracking-tight">
							{item.title}
						</CardTitle>
					</CardHeader>

					{item.description && (
						<CardContent className="p-0">
							<p className="text-muted-foreground">{item.description}</p>
						</CardContent>
					)}
				</div>
			</div>
		</Card>
	);
}
