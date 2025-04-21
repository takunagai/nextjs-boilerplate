import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import type { FeatureItem } from "./index";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface FeatureSplitProps {
	item: FeatureItem;
	isReversed?: boolean;
	className?: string;
}

export function FeatureSplit({
	item,
	isReversed = false,
	className,
}: FeatureSplitProps) {
	return (
		<div
			className={cn(
				"grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-12",
				isReversed ? "md:[direction:rtl]" : "",
				className,
			)}
		>
			<div className="flex flex-col gap-6 max-w-xl [direction:ltr]">
				{item.title && (
					<h3 className="text-3xl md:text-4xl font-bold tracking-tight">
						{item.title}
					</h3>
				)}

				{item.description && (
					<p className="text-base md:text-lg text-muted-foreground">
						{item.description}
					</p>
				)}

				{item.buttonText && item.buttonUrl && (
					<div className="pt-4">
						<Button asChild>
							<Link href={item.buttonUrl}>{item.buttonText}</Link>
						</Button>
					</div>
				)}
			</div>

			{item.imageUrl && (
				<div className="relative w-full h-full overflow-hidden rounded-lg [direction:ltr]">
					<AspectRatio ratio={16 / 9}>
						<Image
							src={item.imageUrl}
							alt={`${item.title}の画像`}
							fill
							className="object-cover transition-transform hover:(scale-105)"
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</AspectRatio>
				</div>
			)}
		</div>
	);
}
