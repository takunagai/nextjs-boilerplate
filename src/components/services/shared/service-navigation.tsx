import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FaCode, FaToolbox, FaBolt } from "react-icons/fa6";

// サービスナビゲーション設定の型定義
interface ServiceNavItem {
	href: string;
	label: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface ServiceNavigationConfig {
	title: string;
	titleIcon: React.ComponentType<{ className?: string }>;
	mainHref: string;
	contactHref: string;
	items: ServiceNavItem[];
}

// Web Development サービスの設定
const WEB_DEV_CONFIG: ServiceNavigationConfig = {
	title: "ウェブ制作・アプリ開発",
	titleIcon: FaCode,
	mainHref: "/services/web-development",
	contactHref: "/contact?service=web-development",
	items: [
		{
			href: "/services/web-development",
			label: "トップ",
		},
		{
			href: "/services/web-development/frontend-repair",
			label: "フロントエンドリペア",
			icon: FaToolbox,
		},
		{
			href: "/services/web-development/instant-site",
			label: "一夜城",
			icon: FaBolt,
		},
	],
};

interface ServiceNavigationProps {
	config?: ServiceNavigationConfig;
}

export function ServiceNavigation({ 
	config = WEB_DEV_CONFIG 
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