import { FaBolt, FaCheck, FaCrown, FaDesktop, FaShield, FaStar, FaVideo } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const pricingPlans = [
	{
		id: "spot",
		service: "スポット相談",
		content: "1時間",
		normalPrice: "11,000円",
		specialPrice: "5,500円",
		discount: "50%",
		description: "聞きたい内容をピンポイントで、もしくは漠然とした相談もOK！",
		features: [
			"質問への具体的な回答",
			"おすすめツールリスト",
			"次のステップの提案",
			"フォローアップ資料付き",
		],
		highlight: true,
		icon: FaBolt,
		iconColor: "text-blue-600",
	},
	{
		id: "consulting-pack",
		service: "定期コンサルティング",
		content: "3ヶ月パック",
		normalPrice: "132,000円",
		specialPrice: "66,000円",
		discount: "50%",
		description: "継続的なサポートで確実にスキルアップ",
		features: [
			"月2回の定期ミーティング（各60分）",
			"チャットでの質問サポート",
			"AI ツールの導入・運用支援",
			"業務効率化の継続的な改善",
		],
		highlight: false,
		icon: FaCrown,
		iconColor: "text-orange-600",
	},
	{
		id: "others",
		service: "講座・セミナー",
		content: "ご要望に応じて",
		normalPrice: "",
		specialPrice: "ご相談ください",
		description: "単発レクチャー、企業研修など柔軟に対応",
		features: [
			"ChatGPT/Claude/Gemini の使い方",
			"AI ライティング指南",
			"画像生成 AI レクチャー",
			"ワークフロー構築（n8n、Dify等）",
			"バイブコーディング入門",
		],
		highlight: false,
		icon: FaStar,
		iconColor: "text-purple-600",
	},
];

const features = [
	{
		icon: FaShield,
		title: "全額返金保証付き",
		description: "満足いただけなければ全額返金",
	},
	{
		icon: FaDesktop,
		title: "オンライン（Zoom）対応",
		description: "どこからでも受講可能",
	},
	{
		icon: FaVideo,
		title: "録画 OK（復習用）",
		description: "後から何度でも復習できます",
	},
];

export function ConsultingPricingSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						料金
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto mb-6">
						テスター特別価格でサービスをご提供中
					</p>
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-8">
						🎉 現在、テスター特別価格で50%OFF！
					</div>
				</div>

				{/* 料金カード */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					{pricingPlans.map((plan) => {
						const IconComponent = plan.icon;
						return (
							<Card
								key={plan.id}
								className={`h-full border-2 transition-all duration-300 hover:shadow-lg relative ${
									plan.highlight
										? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
										: "border-gray-200"
								}`}
							>
								{plan.highlight && (
									<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
										<Badge className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1">
											おすすめ
										</Badge>
									</div>
								)}
								<CardHeader className="text-center pb-4">
									<div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
										<IconComponent className={`w-8 h-8 ${plan.iconColor}`} />
									</div>
									<CardTitle className="text-xl mb-2">{plan.service}</CardTitle>
									<p className="text-sm text-muted-foreground">
										{plan.description}
									</p>
								</CardHeader>
								<CardContent className="text-center space-y-6">
									<div>
										{plan.normalPrice && (
											<div className="flex items-center justify-center gap-2 mb-2">
												<span className="text-lg text-muted-foreground line-through">
													{plan.normalPrice}
												</span>
												{plan.discount && (
													<Badge variant="destructive" className="text-xs">
														{plan.discount} OFF
													</Badge>
												)}
											</div>
										)}
										<div className="text-3xl font-bold text-foreground">
											{plan.specialPrice}
										</div>
										<p className="text-sm text-muted-foreground mt-1">
											{plan.content}
										</p>
									</div>

									<div className="space-y-3">
										{plan.features.map((feature, index) => (
											<div
												key={index}
												className="flex items-start gap-3 text-left"
											>
												<FaCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
												<span className="text-sm text-foreground">
													{feature}
												</span>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* 案内メッセージ */}
				<div className="text-center mb-12">
					<div className="bg-muted/50 p-6 rounded-lg max-w-2xl mx-auto">
						<h3 className="font-semibold text-lg mb-2">
							🎯 まずはスポット相談から
						</h3>
						<p className="text-sm text-muted-foreground">
							どのサービスが最適かわからない方も、まずはお気軽にスポット相談をご利用ください。
							あなたの状況に最適なプランをご提案いたします。
						</p>
					</div>
				</div>

				{/* 特典・保証 */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{features.map((feature) => {
						const IconComponent = feature.icon;
						return (
							<Card key={feature.title} className="text-center">
								<CardHeader className="pb-4">
									<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
										<IconComponent className="w-6 h-6 text-blue-600" />
									</div>
									<CardTitle className="text-lg">{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">{feature.description}</p>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
