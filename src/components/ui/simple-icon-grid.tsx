import type { ReactNode } from "react";

interface IconGridItem {
	icon: ReactNode;
	title: string;
	description: string;
}

interface SimpleIconGridProps {
	items: IconGridItem[];
	className?: string;
}

export function SimpleIconGrid({ items, className = "" }: SimpleIconGridProps) {
	return (
		<div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
			{items.map((item, index) => (
				<div
					key={index}
					className="flex items-start gap-3 rounded-lg border bg-card p-4 hover:shadow-lg transition-shadow"
				>
					<div className="flex-shrink-0 rounded-lg bg-primary/5 p-2 text-primary">
						{item.icon}
					</div>
					<div>
						<h3 className="font-semibold">{item.title}</h3>
						<p className="text-sm text-muted-foreground">{item.description}</p>
					</div>
				</div>
			))}
		</div>
	);
}
