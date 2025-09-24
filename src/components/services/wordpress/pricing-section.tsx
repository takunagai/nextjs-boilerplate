import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { FaCheck, FaXmark } from "react-icons/fa6";
import Link from "next/link";

const pricingPlans = [
	{
		name: "スタンダード",
		price: "398,000",
		period: "円～",
		description: "企業サイト・ブログに最適",
		popular: false,
		features: [
			"10ページまでのWordPressサイト",
			"カスタムテーマ作成",
			"レスポンシブデザイン",
			"基本SEO最適化",
			"お問い合わせフォーム",
			"セキュリティ対策",
			"3ヶ月保守サポート",
		],
		notIncluded: ["ECサイト機能", "多言語対応", "高度なカスタマイズ"],
		buttonText: "詳細を相談",
		buttonVariant: "outline" as const,
	},
	{
		name: "プロフェッショナル",
		price: "598,000",
		period: "円～",
		description: "オウンドメディア・ニュースサイト向け",
		popular: true,
		features: [
			"ページ数20ページまで",
			"フルカスタムテーマ作成",
			"カスタム投稿タイプ対応",
			"高度なSEO最適化",
			"管理画面カスタマイズ",
			"Google Analytics連携",
			"高速化プラグイン導入",
			"6ヶ月保守サポート",
			"特殊フォーム作成",
		],
		notIncluded: ["会員系機能", "EC決済機能"],
		buttonText: "今すぐ相談",
		buttonVariant: "default" as const,
	},
	{
		name: "エンタープライズ",
		price: "要相談",
		period: "",
		description: "大規模サイト・ECサイト対応",
		popular: false,
		features: [
			"ページ数制限なし",
			"フルカスタム開発",
			"ECサイト機能完全対応",
			"会員系システム",
			"API連携・外部システム連携",
			"多言語対応",
			"高度なセキュリティ対策",
			"パフォーマンス最適化",
			"12ヶ月保守サポート",
			"専任担当者",
		],
		notIncluded: [],
		buttonText: "要件を相談",
		buttonVariant: "outline" as const,
	},
];

export function WordPressPricingSection() {
	return (
		<section className="py-16 md:py-24" id="pricing">
			<Container>
				<SectionHeader
					title="料金プラン"
					description="プロジェクトの規模・要件に応じた3つのプラン"
				/>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{pricingPlans.map((plan, index) => (
						<div
							key={index}
							className={`relative bg-card border rounded-lg p-6 ${
								plan.popular
									? "border-blue-500 shadow-lg scale-105"
									: "hover:shadow-lg"
							} transition-all duration-300`}
						>
							{plan.popular && (
								<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
									<span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
										人気プラン
									</span>
								</div>
							)}

							<div className="space-y-6">
								<div className="text-center">
									<h3 className="text-xl font-bold">{plan.name}</h3>
									<div className="mt-2">
										<span className="text-3xl font-bold">{plan.price}</span>
										<span className="text-muted-foreground ml-1">
											{plan.period}
										</span>
									</div>
									<p className="text-sm text-muted-foreground mt-2">
										{plan.description}
									</p>
								</div>

								<div className="space-y-3">
									<h4 className="font-semibold text-sm">含まれる機能:</h4>
									{plan.features.map((feature, featureIndex) => (
										<div key={featureIndex} className="flex items-start gap-2">
											<FaCheck className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
											<span className="text-sm">{feature}</span>
										</div>
									))}
									{plan.notIncluded.length > 0 && (
										<>
											<h4 className="font-semibold text-sm mt-4">
												含まれない機能:
											</h4>
											{plan.notIncluded.map((feature, featureIndex) => (
												<div
													key={featureIndex}
													className="flex items-start gap-2"
												>
													<FaXmark className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
													<span className="text-sm text-muted-foreground">
														{feature}
													</span>
												</div>
											))}
										</>
									)}
								</div>

								<Link href="/contact?service=wordpress" className="block">
									<Button variant={plan.buttonVariant} className="w-full">
										{plan.buttonText}
									</Button>
								</Link>
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 text-center">
					<p className="text-sm text-muted-foreground">
						※ 上記は基本料金です。追加機能・カスタマイズにより変動します
						<br />※ 運用費:
						月額3,000円～（ホスティング・ドメイン・セキュリティ対策込み）
					</p>
				</div>
			</Container>
		</section>
	);
}
