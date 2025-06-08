import { cn } from "@/lib/utils";
import Link from "next/link";
import type { FeatureItem } from "./index";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DynamicHeading, type HeadingLevel } from "./components";

export interface FeatureSimpleProps {
	item: FeatureItem;
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

export function FeatureSimple({
	item,
	className,
	headingLevel = "h3",
	headingClassName,
	descriptionClassName,
	iconClassName,
	buttonClassName,
	imageClassName,
	imageContainerClassName,
	contentBlockClassName,
}: FeatureSimpleProps) {
	return (
		<Card
			className={cn(
				"overflow-hidden transition-shadow hover:(shadow-md)",
				className,
			)}
		>
			<div className={cn("flex flex-col", contentBlockClassName)}>
				<CardHeader>
					<div className="flex items-center gap-3 mb-2">
						{item.icon && (
							<div className={cn("flex-shrink-0 text-primary", iconClassName)}>
								{item.icon}
							</div>
						)}
						<DynamicHeading
							level={headingLevel}
							className={cn(
								"text-xl md:text-2xl font-bold tracking-tight",
								headingClassName,
							)}
						>
							{item.title}
						</DynamicHeading>
					</div>
				</CardHeader>

				<CardContent>
					{item.description && (
						<p
							className={cn(
								"text-base text-muted-foreground mb-6",
								descriptionClassName,
							)}
						>
							{item.description}
						</p>
					)}

					{item.buttonText && item.buttonUrl && (
						<div className="pt-2">
							<Button asChild variant="outline" className={cn(buttonClassName)}>
								<Link href={item.buttonUrl}>{item.buttonText}</Link>
							</Button>
						</div>
					)}
				</CardContent>
			</div>
		</Card>
	);
}
