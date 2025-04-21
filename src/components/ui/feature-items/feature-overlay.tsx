import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import type { FeatureItem } from "./index";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface FeatureOverlayProps {
	item: FeatureItem;
	overlayStyle?: "dark" | "light" | "gradient";
	overlayHeight?: "auto" | "full" | "half" | "third";
	className?: string;
}

export function FeatureOverlay({
	item,
	overlayStyle = "dark",
	overlayHeight = "auto",
	className,
}: FeatureOverlayProps) {
	// オーバーレイのスタイルを決定
	const overlayClass = {
		dark: "bg-black/60",
		light: "bg-white/70",
		gradient: "bg-gradient-(to-t from-black/90 via-black/60 to-transparent)",
	}[overlayStyle];

	// テキストカラーを決定
	const textColorClass =
		overlayStyle === "light" ? "text-foreground" : "text-white";

	// オーバーレイの高さを設定
	const heightClass = {
		auto: "h-auto min-h-[40%]",
		full: "h-full",
		half: "h-1/2",
		third: "h-1/3",
	}[overlayHeight];

	return (
		<div
			className={cn(
				"relative rounded-lg overflow-hidden group",
				"transition duration-300 hover:(shadow-lg)",
				className,
			)}
		>
			{/* 背景画像 */}
			{item.imageUrl && (
				<div className="w-full">
					<AspectRatio ratio={16 / 9}>
						<Image
							src={item.imageUrl}
							alt={`${item.title}の画像`}
							fill
							className="object-cover transition-transform duration-500 group-hover:(scale-105)"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							priority
						/>
					</AspectRatio>
				</div>
			)}

			{/* テキストオーバーレイ */}
			<div
				className={cn(
					"absolute bottom-0 left-0 right-0",
					heightClass,
					overlayClass,
					textColorClass,
					"flex flex-col justify-end p-6 md:p-8",
					"transition-all duration-300",
					"group-hover:(brightness-105)",
					overlayHeight === "auto" && "group-hover:(translate-y-0)",
				)}
			>
				<div className="max-w-xl overflow-y-auto max-h-[calc(100%-2rem)]">
					{item.title && (
						<h3 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2 md:mb-3">
							{item.title}
						</h3>
					)}

					{item.description && (
						<p
							className={cn(
								"text-sm md:text-base mb-3 md:mb-4 line-clamp-3 group-hover:line-clamp-none",
								overlayStyle === "light"
									? "text-muted-foreground"
									: "text-white/90",
							)}
						>
							{item.description}
						</p>
					)}

					{item.buttonText && item.buttonUrl && (
						<div className="pt-1 md:pt-2">
							<Button
								asChild
								size="sm"
								variant={overlayStyle === "light" ? "default" : "outline"}
								className={cn(
									"transition-all",
									overlayStyle !== "light"
										? "text-white border-white hover:bg-white/20"
										: "",
								)}
							>
								<Link href={item.buttonUrl}>{item.buttonText}</Link>
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
