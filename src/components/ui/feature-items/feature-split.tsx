import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { DynamicHeading, type HeadingLevel } from "./components";
import type { FeatureItem } from "./index";

export interface FeatureSplitProps {
	item: FeatureItem;
	isReversed?: boolean;
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

export function FeatureSplit({
	item,
	isReversed = false,
	className,
	headingLevel = "h3",
	headingClassName,
	descriptionClassName,
	iconClassName,
	buttonClassName,
	imageClassName,
	imageContainerClassName,
	contentBlockClassName,
}: FeatureSplitProps) {
	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-6",
				isReversed ? "md:[direction:rtl]" : "",
				className,
			)}
		>
			<div
				className={cn(
					"flex flex-col gap-8 max-w-xl [direction:ltr]",
					contentBlockClassName,
				)}
			>
				<div className="flex items-center gap-3">
					{item.icon && (
						<div className={cn("flex-shrink-0 text-primary", iconClassName)}>
							{item.icon}
						</div>
					)}
					{item.title && (
						<DynamicHeading
							level={headingLevel}
							className={cn("text-xl md:text-2xl font-bold", headingClassName)}
						>
							{item.title}
						</DynamicHeading>
					)}
				</div>

				{item.description && (
					<p className={cn("text-foreground/80", descriptionClassName)}>
						{item.description}
					</p>
				)}

				{item.buttonText && item.buttonUrl && (
					<div>
						<Button asChild className={cn(buttonClassName)}>
							<Link href={item.buttonUrl}>{item.buttonText}</Link>
						</Button>
					</div>
				)}
			</div>

			{item.imageUrl && (
				<div
					className={cn(
						"relative w-full h-full overflow-hidden rounded-lg [direction:ltr]",
						imageContainerClassName,
					)}
				>
					<AspectRatio ratio={16 / 9}>
						<Image
							src={item.imageUrl}
							alt={`${item.title}の画像`}
							fill
							className={cn(
								"object-cover transition-transform hover:(scale-105)",
								imageClassName,
							)}
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</AspectRatio>
				</div>
			)}
		</div>
	);
}
