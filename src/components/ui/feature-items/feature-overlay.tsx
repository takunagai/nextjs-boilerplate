import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import type { FeatureItem } from "./index";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface FeatureOverlayProps {
	item: FeatureItem;
	overlayStyle?: "dark" | "light" | "gradient";
	className?: string;
}

export function FeatureOverlay({ 
	item, 
	overlayStyle = "dark",
	className
}: FeatureOverlayProps) {
	// オーバーレイのスタイルを決定
	const overlayClass = {
		dark: "bg-black/60",
		light: "bg-white/70",
		gradient: "bg-gradient-(to-t from-black/70 to-transparent)"
	}[overlayStyle];

	// テキストカラーを決定
	const textColorClass = overlayStyle === "light" 
		? "text-foreground" 
		: "text-white";

	return (
		<div className={cn(
			"relative rounded-lg overflow-hidden group",
			className
		)}>
			{/* 背景画像 */}
			{item.imageUrl && (
				<div className="w-full h-full">
					<AspectRatio ratio={16/9}>
						<Image
							src={item.imageUrl}
							alt={`${item.title}の画像`}
							fill
							className="object-cover transition-transform duration-700 group-hover:(scale-105)"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</AspectRatio>
				</div>
			)}

			{/* テキストオーバーレイ */}
			<div className={cn(
				"absolute inset-0 flex flex-col justify-end p-8",
				overlayClass,
				textColorClass
			)}>
				<div className="max-w-xl">
					{item.title && (
						<h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
							{item.title}
						</h3>
					)}
					
					{item.description && (
						<p className={cn(
							"text-base md:text-lg mb-4",
							overlayStyle === "light" ? "text-muted-foreground" : "text-white/80"
						)}>
							{item.description}
						</p>
					)}
					
					{item.buttonText && item.buttonUrl && (
						<div className="pt-2">
							<Button 
								asChild 
								variant={overlayStyle === "light" ? "default" : "outline"}
								className={overlayStyle !== "light" ? "text-white border-white hover:bg-white/20" : ""}
							>
								<Link href={item.buttonUrl}>
									{item.buttonText}
								</Link>
							</Button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
