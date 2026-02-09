import Link from "next/link";
import type { ComponentType } from "react";
import {
	FaArrowRight,
	FaBolt,
	FaLifeRing,
	FaRocket,
	FaToolbox,
	FaWordpress,
} from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

interface ServiceMenuItem {
	id: string;
	title: string;
	subtitle: string;
	features: string[];
	icon: ComponentType<{ className?: string }>;
	iconColor: string;
	bgColor: string;
	borderColor: string;
	href: string;
}

const serviceMenuItems: ServiceMenuItem[] = [
	{
		id: "jamstack",
		title: "Jamstackサイト制作",
		subtitle: "Next.js × 静的生成で高速・安全・SEO最強",
		features: [
			"高速表示でユーザー体験を向上",
			"高セキュリティ・低コスト運用",
			"SEOに強いモダンなサイト構成",
		],
		icon: FaRocket,
		iconColor: "text-blue-600",
		bgColor: "bg-blue-50",
		borderColor: "border-blue-200",
		href: "/services/web-development/jamstack",
	},
	{
		id: "wordpress",
		title: "WordPressサイト制作",
		subtitle: "ブログやお知らせの更新がしやすいサイトづくり",
		features: [
			"SEOに強いサイト構成",
			"カスタムテーマ・プラグイン開発",
			"更新も簡単、管理も楽々",
		],
		icon: FaWordpress,
		iconColor: "text-indigo-600",
		bgColor: "bg-indigo-50",
		borderColor: "border-indigo-200",
		href: "/services/web-development/wordpress",
	},
	{
		id: "instant-site",
		title: "一夜城",
		subtitle: "55,000円・半日〜1日で公開できるインスタントHP",
		features: [
			"AI × プロの集中スプリント",
			"ランニングコスト0円で運用",
			"当日公開も可能",
		],
		icon: FaBolt,
		iconColor: "text-amber-600",
		bgColor: "bg-amber-50",
		borderColor: "border-amber-200",
		href: "/services/web-development/instant-site",
	},
	{
		id: "web-spot-support",
		title: "Webお困りごとスポット対応",
		subtitle: "「ここだけ」のご相談も大歓迎",
		features: [
			"エラー修正・デザイン調整",
			"機能追加・セキュリティ対策",
			"単発依頼・緊急対応OK",
		],
		icon: FaLifeRing,
		iconColor: "text-green-600",
		bgColor: "bg-green-50",
		borderColor: "border-green-200",
		href: "/services/web-development/web-spot-support",
	},
	{
		id: "frontend-repair",
		title: "フロントエンドリペア",
		subtitle: "AIで作ったサイト、そのままで大丈夫？",
		features: [
			"React/Next.js コード品質向上",
			"デザインブラッシュアップ",
			"デプロイ支援・無料診断あり",
		],
		icon: FaToolbox,
		iconColor: "text-purple-600",
		bgColor: "bg-purple-50",
		borderColor: "border-purple-200",
		href: "/services/web-development/frontend-repair",
	},
];

export function ServiceMenuSection() {
	return (
		<section id="service-menu" className="w-full py-16 md:py-24 bg-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						こんなことができます
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						ウェブサイトのことなら、何でもご相談ください
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{serviceMenuItems.map((service) => {
						const IconComponent = service.icon;
						return (
							<Link
								key={service.id}
								href={service.href}
								className="group block h-full"
								aria-label={`${service.title} の詳細を見る`}
							>
								<Card
									className={`h-full border-2 ${service.borderColor} transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02]`}
								>
									<CardHeader className="pb-3">
										<div className="flex items-center gap-3 mb-3">
											<div
												className={`w-11 h-11 ${service.bgColor} rounded-lg flex items-center justify-center shrink-0`}
											>
												<IconComponent
													className={`w-5 h-5 ${service.iconColor}`}
												/>
											</div>
											<CardTitle className="text-lg leading-tight">
												{service.title}
											</CardTitle>
										</div>
										<p className="text-sm font-bold text-primary">
											{service.subtitle}
										</p>
									</CardHeader>
									<CardContent className="space-y-4">
										<ul className="space-y-2">
											{service.features.map((feature) => (
												<li
													key={feature}
													className="text-sm text-muted-foreground flex items-start gap-2"
												>
													<span className="text-primary text-xs mt-1">•</span>
													{feature}
												</li>
											))}
										</ul>
										<div className="flex items-center text-sm font-medium text-primary gap-1 pt-2">
											詳しく見る
											<FaArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
										</div>
									</CardContent>
								</Card>
							</Link>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
