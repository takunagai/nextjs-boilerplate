import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
	WEB_DEV_NAVIGATION_CONFIG,
	type WebDevNavigationConfig,
} from "@/lib/data/web-development-config";

interface ServiceNavigationProps {
	config?: WebDevNavigationConfig;
}

export function ServiceNavigation({
	config = WEB_DEV_NAVIGATION_CONFIG,
}: ServiceNavigationProps) {
	const TitleIcon = config.titleIcon;

	return (
		<nav className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
			<Container>
				<div className="flex items-center justify-between py-3">
					<div className="flex items-center gap-6">
						<h2 className="text-sm font-semibold flex items-center gap-2">
							<TitleIcon className="w-4 h-4 text-primary" />
							{config.title}
						</h2>
						<div className="hidden md:flex items-center gap-1">
							<span className="text-xs text-muted-foreground">|</span>
							{config.items.map((item, index) => {
								const ItemIcon = item.icon;
								return (
									<Link
										key={index}
										href={item.href}
										className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 flex items-center gap-1"
									>
										{ItemIcon && <ItemIcon className="w-3 h-3" />}
										{item.label}
									</Link>
								);
							})}
						</div>
					</div>
					<Link
						href={config.contactHref}
						className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
					>
						お問い合わせ →
					</Link>
				</div>
			</Container>
		</nav>
	);
}
