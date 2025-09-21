import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FaCheck, FaStar } from "react-icons/fa6";

const PRICING_PLANS = [
	{
		name: "ライト修正",
		price: "30,000",
		unit: "円〜",
		description: "軽微な修正と基本的な改善",
		target: "〜3ページ",
		duration: "3-5営業日",
		features: [
			"軽微なバグ修正",
			"CSS調整・スタイル改善",
			"基本的なレスポンシブ対応",
			"コードクリーンアップ",
			"簡易パフォーマンス改善",
		],
		notIncluded: [
			"大幅なコンポーネント再設計",
			"デプロイ代行",
			"運用保守サポート",
		],
		popular: false,
	},
	{
		name: "ブラッシュアップ",
		price: "80,000",
		unit: "円〜",
		description: "包括的な品質向上とデザイン改善",
		target: "〜10ページ",
		duration: "7-10営業日",
		features: [
			"コンポーネント整理・再設計",
			"完全レスポンシブ対応",
			"パフォーマンス最適化",
			"アクセシビリティ対応",
			"TypeScript 移行支援",
			"SEO 基本対応",
			"デザインシステム統一",
		],
		notIncluded: ["運用保守サポート"],
		popular: true,
	},
	{
		name: "フルサポート",
		price: "150,000",
		unit: "円〜",
		description: "サイト全体の完全改善とデプロイまで",
		target: "サイト全体",
		duration: "14-21営業日",
		features: [
			"サイト全体の包括的改善",
			"デザイン完全統一",
			"高度なパフォーマンス最適化",
			"デプロイ環境構築・代行",
			"ドメイン・SSL設定",
			"アナリティクス設定",
			"1ヶ月間の運用保守サポート",
			"技術的相談対応",
		],
		notIncluded: [],
		popular: false,
	},
] as const;

export function PricingSection() {
	return (
		<section className="py-16 md:py-24 bg-gradient-to-b from-background to-orange-50/30 dark:to-orange-950/10">
			<Container>
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						<span className="text-primary">明確な料金</span>で
						<br />
						安心してご依頼いただけます
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						まずは無料診断で現状を把握。その後、最適なプランをご提案いたします
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
					{PRICING_PLANS.map((plan, index) => (
						<div
							key={index}
							className={`relative bg-background rounded-2xl p-8 border-2 shadow-lg transition-all duration-300 hover:shadow-xl ${
								plan.popular
									? "border-primary scale-105"
									: "border-border/50 hover:border-primary/30"
							}`}
						>
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2">
									<div className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
										<FaStar className="w-4 h-4" />
										人気No.1
									</div>
								</div>
							)}

							<div className="text-center mb-8">
								<h3 className="text-xl font-bold mb-2">{plan.name}</h3>
								<div className="mb-4">
									<span className="text-3xl font-bold">¥{plan.price}</span>
									<span className="text-muted-foreground ml-1">{plan.unit}</span>
								</div>
								<p className="text-muted-foreground text-sm mb-2">
									{plan.description}
								</p>
								<div className="text-xs text-muted-foreground space-y-1">
									<div>対象規模: {plan.target}</div>
									<div>納期目安: {plan.duration}</div>
								</div>
							</div>

							<div className="space-y-6">
								<div>
									<h4 className="font-semibold mb-3 text-green-600">
										含まれるサービス
									</h4>
									<ul className="space-y-2">
										{plan.features.map((feature, featureIndex) => (
											<li
												key={featureIndex}
												className="flex items-start gap-2 text-sm"
											>
												<FaCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
												<span>{feature}</span>
											</li>
										))}
									</ul>
								</div>

								{plan.notIncluded.length > 0 && (
									<div>
										<h4 className="font-semibold mb-3 text-muted-foreground">
											含まれないサービス
										</h4>
										<ul className="space-y-2">
											{plan.notIncluded.map((item, itemIndex) => (
												<li
													key={itemIndex}
													className="flex items-start gap-2 text-sm text-muted-foreground"
												>
													<div className="w-4 h-4 border border-muted-foreground/30 rounded-full mt-0.5 flex-shrink-0" />
													<span>{item}</span>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>

							<div className="mt-8">
								<Button
									variant={plan.popular ? "default" : "outline"}
									className="w-full"
									size="lg"
								>
									{plan.popular ? "人気プランで相談" : "このプランで相談"}
								</Button>
							</div>
						</div>
					))}
				</div>

				<div className="text-center">
					<div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
						<h3 className="text-xl font-bold mb-4">
							💡 まずは無料診断から始めましょう
						</h3>
						<p className="text-muted-foreground mb-6">
							現状のコードとデザインを専門的にチェックし、
							<br />
							最適なプランと具体的な改善提案をお送りします。
						</p>
						<Button size="lg" className="px-12">
							無料診断を依頼する
						</Button>
					</div>
				</div>
			</Container>
		</section>
	);
}