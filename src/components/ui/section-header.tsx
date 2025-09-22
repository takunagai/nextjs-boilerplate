import type { ReactNode } from "react";

interface SectionHeaderProps {
	title: string;
	description?: string | ReactNode;
	className?: string;
}

export function SectionHeader({
	title,
	description,
	className = "",
}: SectionHeaderProps) {
	return (
		<div className={`text-center ${className}`}>
			<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
			{description && (
				<div className="mt-4 text-lg text-muted-foreground">
					{typeof description === "string" ? <p>{description}</p> : description}
				</div>
			)}
		</div>
	);
}
