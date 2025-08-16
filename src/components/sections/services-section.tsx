"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
	FaArrowRight,
	FaChalkboardUser,
	FaCode,
	FaPaintbrush,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { usePerformanceCheck } from "@/hooks/use-webgl-support";

// 動的インポート - エフェクトコンポーネント
const FlowingComments = dynamic(
	() => import("@/components/effects/flowing-comments").then(mod => ({ default: mod.FlowingComments })),
	{
		ssr: false,
		loading: () => <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-50/20 to-purple-50/20" />
	}
);

const LightweightBackground = dynamic(
	() => import("@/components/background/lightweight-background").then(mod => ({ default: mod.LightweightBackground })),
	{
		ssr: false,
		loading: () => <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50" />
	}
);

const services = [
	{
		id: "web-development",
		title: "ウェブ制作・アプリ開発",
		subtitle: "高品質なのに、驚きの低価格",
		description:
			"AI を活用した効率的な制作で、通常の 50〜70% OFF を実現。\nでも品質は妥協しません。",
		features: [
			"Next.js + AI API での最新 Web アプリ",
			"WordPress サイトも AI 機能でパワーアップ",
			"既存サイトのリニューアルや単発の部分作業もお任せ",
		],
		icon: FaCode,
		iconColor: "text-blue-600",
		bgColor: "bg-blue-50",
		borderColor: "border-blue-200",
		href: "/services/web-development",
	},
	{
		id: "creative",
		title: "クリエイティブ",
		subtitle: "時間とスキルの壁を、AI で突破",
		description:
			"文章も画像も動画も音楽も。\nAI x デザイナーで仕上げる二人三脚スタイル。",
		features: [
			"質の高いブログ記事・SNS 投稿を効率的に作成",
			"オリジナル画像・ロゴ制作",
			"動画・BGM 制作もお手軽に",
		],
		icon: FaPaintbrush,
		iconColor: "text-purple-600",
		bgColor: "bg-purple-50",
		borderColor: "border-purple-200",
		href: "/services/creative",
	},
	{
		id: "consulting",
		title: "プチコンサル＆レクチャー",
		subtitle: "AI の「？」を「！」に変える",
		description:
			"ご相談社様のレベルに合わせた解説を心がけます。\nあなたのペースで、実践的な AI 活用を。",
		features: [
			"30分からのスポット相談",
			"実践的な AI 活用講座",
			"マンツーマンの継続サポート",
		],
		icon: FaChalkboardUser,
		iconColor: "text-green-600",
		bgColor: "bg-green-50",
		borderColor: "border-green-200",
		href: "/services/consulting",
	},
];

export function ServicesSection() {
	const { shouldLoad3D, isMediumOrBetter, isLoading } = usePerformanceCheck();

	return (
		<section className="w-full py-16 md:py-24 bg-background relative overflow-hidden">
			{/* パフォーマンス対応背景エフェクト */}
			{!isLoading && (
				shouldLoad3D ? (
					<FlowingComments maxComments={isMediumOrBetter ? 25 : 15} />
				) : (
					<LightweightBackground variant="gradient" opacity={0.4} />
				)
			)}

			<Container
				width="2xl"
				paddingY="lg"
				paddingX="lg"
				className="relative z-10"
			>
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						3つのサービス紹介
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						AI を活用した効率的なサービスで、あなたの課題を解決します
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{services.map((service) => {
						const IconComponent = service.icon;
						return (
							<Card
								key={service.id}
								className={`h-full border-2 ${service.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative z-20 bg-background/95 backdrop-blur-sm`}
							>
								<CardHeader className="text-center pb-4">
									<div
										className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
									>
										<IconComponent className={`w-8 h-8 ${service.iconColor}`} />
									</div>
									<CardTitle className="text-xl">{service.title}</CardTitle>
									<p className="text-sm font-bold text-primary">
										{service.subtitle}
									</p>
								</CardHeader>
								<CardContent className="space-y-6">
									<p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
										{service.description}
									</p>
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
									<Button asChild className="w-full" variant="outline">
										<Link href={service.href}>
											詳しく見る
											<FaArrowRight className="w-4 h-4 ml-2" />
										</Link>
									</Button>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
