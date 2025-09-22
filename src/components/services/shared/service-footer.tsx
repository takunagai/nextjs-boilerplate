import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FaCode, FaToolbox, FaBolt } from "react-icons/fa6";

// サービスフッター項目の型定義
interface ServiceFooterItem {
	href: string;
	title: string;
	description: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
	gradientFrom: string;
}

interface ServiceFooterConfig {
	title: string;
	description: string;
	items: ServiceFooterItem[];
}

// Web Development サービスフッターの設定
const WEB_DEV_FOOTER_CONFIG: ServiceFooterConfig = {
	title: "ウェブ制作・アプリ開発サービス",
	description:
		"AIと15年の経験を活かして、高品質なウェブサイト・アプリケーションをお手頃価格でご提供します。",
	items: [
		{
			href: "/services/web-development",
			title: "ウェブ制作・アプリ開発",
			description: "フルカスタムの高品質なサイト制作",
			icon: FaCode,
			color: "text-primary",
			gradientFrom: "from-primary/5",
		},
		{
			href: "/services/web-development/frontend-repair",
			title: "フロントエンドリペア",
			description: "AI生成コードの品質向上・修正",
			icon: FaToolbox,
			color: "text-blue-600",
			gradientFrom: "from-blue-600/5",
		},
		{
			href: "/services/web-development/instant-site",
			title: "一夜城",
			description: "55,000円・当日公開の高速制作",
			icon: FaBolt,
			color: "text-orange-600",
			gradientFrom: "from-orange-600/5",
		},
	],
};

interface ServiceFooterProps {
	config?: ServiceFooterConfig;
}

export function ServiceFooter({ 
	config = WEB_DEV_FOOTER_CONFIG 
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
									<div className={`absolute inset-0 bg-gradient-to-br ${item.gradientFrom} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
								</Link>
							);
						})}
					</div>
				</div>
			</Container>
		</section>
	);
}