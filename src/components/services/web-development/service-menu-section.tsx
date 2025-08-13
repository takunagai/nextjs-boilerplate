import { FaArrowsRotate, FaPlus, FaReact, FaWordpress } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const serviceMenuItems = [
	{
		id: "nextjs-app",
		title: "Next.js + AI API での Web アプリ開発",
		subtitle: "AI がコーディングを支援 → 開発期間を半分に短縮",
		features: [
			"ChatGPT や Claude の API を活用した対話型アプリ",
			"AI がベースコードを生成、私が実装・最適化",
			"モダンで高速、でも予算は抑えめ",
		],
		icon: FaReact,
		iconColor: "text-blue-600",
		bgColor: "bg-blue-50",
		borderColor: "border-blue-200",
	},
	{
		id: "wordpress-ai",
		title: "WordPress + AI プラグインでのサイト制作",
		subtitle: "AI がコンテンツ作成を支援 → 充実した内容を低コストで",
		features: [
			"AI が SEO 最適化されたページ構成を提案",
			"記事の下書きも AI が作成（もちろん私がブラッシュアップ）",
			"更新も AI 機能で楽々",
		],
		icon: FaWordpress,
		iconColor: "text-indigo-600",
		bgColor: "bg-indigo-50",
		borderColor: "border-indigo-200",
	},
	{
		id: "renewal",
		title: "既存サイトのリニューアル",
		subtitle: "AI が問題点を分析 → 的確な改善を効率的に",
		features: [
			"AI による現状分析で改善点を明確化",
			"必要な部分だけを効率的にリニューアル",
			"無駄なコストをカット",
		],
		icon: FaArrowsRotate,
		iconColor: "text-green-600",
		bgColor: "bg-green-50",
		borderColor: "border-green-200",
	},
	{
		id: "additional",
		title: "追加ページ作成・機能追加",
		subtitle: "AI 活用で単価を大幅削減",
		features: [
			"LP 作成も AI でスピードアップ",
			"機能追加の実装時間を短縮",
			"だから 1ページ 1.5万円〜が可能に",
		],
		icon: FaPlus,
		iconColor: "text-orange-600",
		bgColor: "bg-orange-50",
		borderColor: "border-orange-200",
	},
];

export function ServiceMenuSection() {
	return (
		<section id="service-menu" className="w-full py-16 md:py-24 bg-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						サービスメニュー
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						AI を活用した効率的な制作で、様々なニーズにお応えします
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{serviceMenuItems.map((service) => {
						const IconComponent = service.icon;
						return (
							<Card
								key={service.id}
								className={`h-full border-2 ${service.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
							>
								<CardHeader className="pb-4">
									<div className="flex items-center gap-4 mb-4">
										<div
											className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center`}
										>
											<IconComponent
												className={`w-6 h-6 ${service.iconColor}`}
											/>
										</div>
										<div className="flex-1">
											<CardTitle className="text-lg leading-tight">
												{service.title}
											</CardTitle>
										</div>
									</div>
									<p className="text-sm font-bold text-primary">
										{service.subtitle}
									</p>
								</CardHeader>
								<CardContent className="space-y-4">
									<ul className="space-y-3">
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
								</CardContent>
							</Card>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
