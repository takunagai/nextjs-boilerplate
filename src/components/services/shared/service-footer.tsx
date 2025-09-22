import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
	WEB_DEV_FOOTER_CONFIG,
	type WebDevFooterConfig,
} from "@/lib/data/web-development-config";

interface ServiceFooterProps {
	config?: WebDevFooterConfig;
}

export function ServiceFooter({
	config = WEB_DEV_FOOTER_CONFIG,
}: ServiceFooterProps) {
	return (
		<section className="py-16 bg-muted/30 border-t">
			<Container>
				<div className="text-center space-y-6">
					<h2 className="text-2xl font-bold">{config.title}</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						{config.description}
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto pt-6">
						{config.items.map((item, index) => {
							const ItemIcon = item.icon;
							return (
								<Link
									key={index}
									href={item.href}
									className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:border-primary/50 transition-all"
								>
									<div className="space-y-2">
										<ItemIcon className={`w-8 h-8 ${item.color} mb-3`} />
										<h3 className="font-semibold">{item.title}</h3>
										<p className="text-sm text-muted-foreground">
											{item.description}
										</p>
									</div>
									<div
										className={`absolute inset-0 bg-gradient-to-br ${item.gradientFrom} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
									/>
								</Link>
							);
						})}
					</div>
				</div>
			</Container>
		</section>
	);
}
