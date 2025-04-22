import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import type { FeatureItem } from "./index";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DynamicHeading, type HeadingLevel } from "./components";

export interface FeatureOverlayProps {
	item: FeatureItem;
	overlayStyle?: "dark" | "light" | "gradient";
	overlayHeight?: "auto" | "full" | "half" | "third";
	className?: string;
	headingLevel?: HeadingLevel;
	headingClassName?: string;
	descriptionClassName?: string;
	iconClassName?: string;
	buttonClassName?: string;
	imageClassName?: string;
	imageContainerClassName?: string;
	contentBlockClassName?: string;
}

export function FeatureOverlay({
	item,
	overlayStyle = "dark",
	overlayHeight = "auto",
	className,
	headingLevel = "h3",
	headingClassName,
	descriptionClassName,
	iconClassName,
	buttonClassName,
	imageClassName,
	imageContainerClassName,
	contentBlockClassName,
}: FeatureOverlayProps) {
	const overlayClass = {
		dark: "bg-black/60",
		light: "bg-white/70",
		gradient: "bg-gradient-(to-t from-black/90 via-black/60 to-transparent)",
	}[overlayStyle];

	const textColorClass =
		overlayStyle === "light" ? "text-foreground" : "text-white";

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
			{item.imageUrl && (
				<div className={cn("w-full", imageContainerClassName)}>
					<AspectRatio ratio={16 / 9}>
						<Image
							src={item.imageUrl}
							alt={`${item.title}の画像`}
							fill
							className={cn(
								"object-cover transition-transform duration-500 group-hover:(scale-105)",
								imageClassName
							)}
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							priority
						/>
					</AspectRatio>
				</div>
			)}

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
				<div className={cn(
					"max-w-xl overflow-y-auto max-h-[calc(100%-2rem)]",
					contentBlockClassName
				)}>
					<div className="flex items-center gap-3 mb-2">
						{item.icon && (
							<div className={cn(
								"flex-shrink-0",
								overlayStyle === "light" ? "text-primary" : "text-white",
								iconClassName
							)}>
								{item.icon}
							</div>
						)}
						{item.title && (
							<DynamicHeading
								level={headingLevel}
								className={cn(
									"text-xl md:text-2xl lg:text-3xl font-bold tracking-tight mb-2 md:mb-3",
									headingClassName
								)}
							>
								{item.title}
							</DynamicHeading>
						)}
					</div>

					{item.description && (
						<p
							className={cn(
								"text-sm md:text-base mb-3 md:mb-4 line-clamp-3 group-hover:line-clamp-none",
								overlayStyle === "light"
									? "text-muted-foreground"
									: "text-white/90",
								descriptionClassName
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
									buttonClassName
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
