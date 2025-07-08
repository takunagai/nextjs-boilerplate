import Link from "next/link";
import { cn } from "@/lib/utils";

export type BreadcrumbOverlayItem = {
	label: string;
	href: string;
	isCurrent?: boolean;
};

export type BreadcrumbOverlayProps = {
	items: BreadcrumbOverlayItem[];
	className?: string;
};

export function BreadcrumbOverlay({
	items,
	className,
}: BreadcrumbOverlayProps) {
	if (items.length <= 1) {
		return null;
	}

	return (
		<nav
			aria-label="パンくずリスト"
			className={cn(
				"absolute top-4 right-4 z-10 text-sm",
				className,
			)}
		>
			<ol className="flex items-center gap-x-2">
				{items.map((item, i) => {
					const isLast = i === items.length - 1;

					return (
						<li key={`breadcrumb-overlay-${item.href}`} className="flex items-center">
							{!item.isCurrent ? (
								<>
									<Link
										href={item.href}
										className="text-muted-foreground hover:text-foreground transition-colors text-xs"
									>
										{item.label}
									</Link>
									{!isLast && (
										<span
											className="mx-1 text-muted-foreground text-xs"
											aria-hidden="true"
										>
											/
										</span>
									)}
								</>
							) : (
								<span
									className="font-medium text-xs"
									aria-current="page"
								>
									{item.label}
								</span>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}