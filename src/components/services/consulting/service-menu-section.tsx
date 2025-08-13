import {
	FaClockRotateLeft,
	FaPenToSquare,
	FaUserTie,
	FaWandMagicSparkles,
} from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const serviceMenuItems = [
	{
		id: "spot-consultation",
		title: "スポット相談（30分・60分）",
		subtitle: "今すぐ聞きたい！にお答えします",
		features: [
			"「うちの業界で AI ってどう使える？」",
			"「この作業、AI で効率化できる？」",
			"「ChatGPT と Claude、どっちがいい？」",
			"「AI ツールの選び方を教えて」",
		],
		benefits: [
			"質問への具体的な回答",
			"おすすめツールリスト",
			"次のステップの提案",
			"フォローアップメール付き",
		],
		icon: FaClockRotateLeft,
		iconColor: "text-blue-600",
		bgColor: "bg-blue-50",
		borderColor: "border-blue-200",
	},
	{
		id: "ai-writing",
		title: "AI ライティング指南（全3回）",
		subtitle: "もう「AI っぽい文章」とは言わせない！",
		features: [
			"第1回：基礎編（AI の仕組み・ツール比較・基本プロンプト）",
			"第2回：実践編（ブログ・SNS・SEO 対応文章）",
			"第3回：応用編（文体学習・リライト・協働方法）",
		],
		benefits: [
			"AI ライティングの完全マスター",
			"実践的なテクニック習得",
			"自分らしい文章作成",
			"効率的な文章作成フロー",
		],
		icon: FaPenToSquare,
		iconColor: "text-green-600",
		bgColor: "bg-green-50",
		borderColor: "border-green-200",
	},
	{
		id: "prompt-course",
		title: "プロンプト作成講座（全2回）",
		subtitle: "AI の実力を 120% 引き出す魔法の言葉",
		features: [
			"理論編（プロンプトエンジニアリングの基本・良し悪しの判断）",
			"実践編（業務別テンプレート・トラブルシューティング）",
		],
		benefits: [
			"AI を思い通りに動かすスキル",
			"業務特化のプロンプト集",
			"効率的な指示の出し方",
			"AI との最適な対話術",
		],
		icon: FaWandMagicSparkles,
		iconColor: "text-purple-600",
		bgColor: "bg-purple-50",
		borderColor: "border-purple-200",
	},
	{
		id: "one-on-one",
		title: "1対1コンサル（月額制）",
		subtitle: "あなた専属の AI アドバイザー",
		features: [
			"月 2回の定期ミーティング（各 60分）",
			"チャットでの質問し放題",
			"AI ツールの導入サポート",
			"業務効率化の提案・実装支援",
		],
		benefits: [
			"記事作成時間 70% 削減",
			"SNS 投稿の自動化実現",
			"社内 AI 活用ガイドライン作成",
			"チーム全体の生産性向上",
		],
		icon: FaUserTie,
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
					<p className="text-muted-foreground max-w-2xl mx-auto">
						あなたのレベルに合わせて、最適なサポートをご提供します
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
									<div>
										<h4 className="text-sm font-semibold text-muted-foreground mb-2">
											こんな質問・内容OK！
										</h4>
										<ul className="space-y-2">
											{service.features.map((feature, index) => (
												<li
													key={index}
													className="text-sm text-muted-foreground flex items-start gap-2"
												>
													<span className="text-primary text-xs mt-1">•</span>
													{feature}
												</li>
											))}
										</ul>
									</div>
									<div>
										<h4 className="text-sm font-semibold text-muted-foreground mb-2">
											受講後にはこんな成果が！
										</h4>
										<ul className="space-y-2">
											{service.benefits.map((benefit, index) => (
												<li
													key={index}
													className="text-sm text-foreground flex items-start gap-2"
												>
													<span className="text-green-600 text-xs mt-1">✓</span>
													{benefit}
												</li>
											))}
										</ul>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
