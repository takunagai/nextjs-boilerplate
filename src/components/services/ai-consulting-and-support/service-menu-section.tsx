import {
	FaCalendarCheck,
	FaChalkboardUser,
	FaCircleInfo,
	FaClockRotateLeft,
	FaLightbulb,
	FaPenToSquare,
	FaRobot,
	FaUsers,
	FaWandMagicSparkles,
} from "react-icons/fa6";
import { SiN8N, SiWindsurf } from "react-icons/si";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const serviceMenuItems = [
	{
		id: "spot-consultation",
		title: "スポット相談",
		subtitle: "時間単位でピンポイント相談",
		description: "聞きたい内容をピンポイントで、もしくは漠然とした相談もOK！まずはお気軽にこちらからどうぞ。",
		features: [
			"1時間単位でお気軽に相談",
			"具体的な質問から漠然とした相談まで対応",
			"その場で解決策をご提案",
			"フォローアップ資料付き",
		],
		price: "5,500円/時間",
		originalPrice: "11,000円",
		icon: FaClockRotateLeft,
		iconColor: "text-blue-600",
		bgColor: "bg-blue-50",
		borderColor: "border-blue-200",
		isRecommended: true,
	},
	{
		id: "single-lecture",
		title: "単発レクチャー",
		subtitle: "知りたい分野をピンポイント学習",
		description: "各分野の専門知識を効率的に学べます",
		features: [
			"ChatGPT/Claude/Gemini の効率的な使い方",
			"AI ライティング指南（記事・ブログ執筆の流れ）",
			"画像生成 AI（サービス比較・著作権・実践活用）",
			"ワークフロー構築（n8n、Dify 等）の基本",
			"バイブコーディング（Claude Code、Windsurf 等）入門",
		],
		price: "要相談",
		icon: FaChalkboardUser,
		iconColor: "text-green-600",
		bgColor: "bg-green-50",
		borderColor: "border-green-200",
	},
	{
		id: "seminar",
		title: "講座・セミナー",
		subtitle: "チーム全体のスキルアップ",
		description: "企業・団体向けのカスタマイズ研修",
		features: [
			"単発レクチャーの内容をカスタマイズ",
			"チーム全体の AI リテラシー向上",
			"実践的なワークショップ形式",
			"業界特化の内容にアレンジ可能",
		],
		price: "ご相談ください",
		icon: FaUsers,
		iconColor: "text-purple-600",
		bgColor: "bg-purple-50",
		borderColor: "border-purple-200",
	},
	{
		id: "regular-consulting",
		title: "定期コンサルティング",
		subtitle: "継続的なAI活用サポート",
		description: "3ヶ月間の定期契約で継続的にサポート",
		features: [
			"月2回の定期ミーティング（各60分）",
			"チャットでの質問サポート",
			"AI ツールの導入・運用支援",
			"業務効率化の継続的な改善",
		],
		price: "66,000円/3ヶ月",
		originalPrice: "132,000円",
		icon: FaCalendarCheck,
		iconColor: "text-orange-600",
		bgColor: "bg-orange-50",
		borderColor: "border-orange-200",
	},
];

export function ConsultingServiceMenuSection() {
	return (
		<section id="service-menu" className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						サービスメニュー
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto mb-6">
						あなたのニーズに合わせて柔軟にサポートします
					</p>
					<Alert className="max-w-3xl mx-auto border-blue-200 bg-blue-50/50">
						<FaCircleInfo className="h-4 w-4 text-blue-600" />
						<AlertDescription className="text-left text-sm">
							現在、どんなサービスが最も皆様のお役に立てるか模索中です。柔軟に対応いたしますので、いずれの場合もまずは<span className="font-semibold text-blue-600">「スポット相談」</span>からお気軽にご利用ください。
							<span className="block mt-2 font-semibold text-orange-600">
								🎉 現在、テスター特別価格でサービス提供中！
							</span>
						</AlertDescription>
					</Alert>
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
									<div className="flex items-center justify-between mb-4">
										<div className="flex items-center gap-4">
											<div
												className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center`}
											>
												<IconComponent
													className={`w-6 h-6 ${service.iconColor}`}
												/>
											</div>
											<div>
												<CardTitle className="text-lg leading-tight">
													{service.title}
												</CardTitle>
											</div>
										</div>
										{service.isRecommended && (
											<Badge className="bg-orange-500 hover:bg-orange-600">
												おすすめ
											</Badge>
										)}
									</div>
									<p className="text-sm font-bold text-primary mb-2">
										{service.subtitle}
									</p>
									{service.description && (
										<p className="text-sm text-muted-foreground">
											{service.description}
										</p>
									)}
								</CardHeader>
								<CardContent className="space-y-4">
									<div>
										<h4 className="text-sm font-semibold text-muted-foreground mb-2">
											内容
										</h4>
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
									</div>
									{service.price && (
										<div className="pt-4 mt-4 border-t border-gray-100">
											<div className="flex items-baseline gap-2">
												<span className="text-2xl font-bold text-foreground">
													{service.price}
												</span>
												{service.originalPrice && (
													<>
														<span className="text-sm text-muted-foreground line-through">
															{service.originalPrice}
														</span>
														<Badge variant="destructive" className="text-xs">
															50% OFF
														</Badge>
													</>
												)}
											</div>
										</div>
									)}
								</CardContent>
							</Card>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
