import { cn } from "@/lib/utils";
import Link from "next/link";
import type { FeatureItem } from "./index";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface FeatureSimpleProps {
	item: FeatureItem;
	className?: string;
}

export function FeatureSimple({ 
	item, 
	className
}: FeatureSimpleProps) {
	return (
		<Card className={cn(
			"overflow-hidden transition-shadow hover:(shadow-md)",
			className
		)}>
			<CardHeader>
				<div className="flex items-center gap-3 mb-2">
					{item.icon && (
						<div className="flex-shrink-0 text-primary">
							{item.icon}
						</div>
					)}
					<CardTitle className="text-xl md:text-2xl font-bold tracking-tight">
						{item.title}
					</CardTitle>
				</div>
			</CardHeader>
			
			<CardContent>
				{item.description && (
					<p className="text-base text-muted-foreground mb-6">
						{item.description}
					</p>
				)}
				
				{item.buttonText && item.buttonUrl && (
					<div className="pt-2">
						<Button asChild variant="outline">
							<Link href={item.buttonUrl}>
								{item.buttonText}
							</Link>
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
