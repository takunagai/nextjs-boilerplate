import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { FaCheck, FaXmark } from "react-icons/fa6";
import Link from "next/link";

const pricingPlans = [
	{
		name: "スタンダード",
		price: "298,000",
		period: "円〜",
		description: "企業サイト・ポートフォリオに最適",
		popular: false,
		features: [
			"5ページまでの静的サイト",
			"レスポンシブデザイン",
			"基本SEO最適化",
			"お問い合わせフォーム",
			"SSL証明書設定",
			"3ヶ月保守サポート",
			"Vercel/Netlifyデプロイ",
		],
		notIncluded: ["CMS機能", "高度なアニメーション", "多言語対応"],
		buttonText: "詳細を相談",
		buttonVariant: "outline" as const,
	},
	{
		name: "プロフェッショナル",
		price: "498,000",
		period: "円〜",
		description: "本格的なビジネスサイト向け",
		popular: true,
		features: [
			"10ページまでの動的サイト",
			"ヘッドレスCMS連携",
			"高度なSEO最適化",
			"お問い合わせ・予約フォーム",
			"アニメーション・インタラクション",
			"Google Analytics設定",
			"構造化データ実装",
			"6ヶ月保守サポート",
			"独自ドメイン設定",
		],
		notIncluded: ["ECサイト機能", "会員機能"],
		buttonText: "今すぐ相談",
		buttonVariant: "default" as const,
	},
	{
		name: "エンタープライズ",
		price: "要相談",
		period: "",
		description: "大規模サイト・特殊要件対応",
		popular: false,
		features: [
			"ページ数制限なし",
			"フルカスタムCMS",
			"マルチサイト対応",
			"API連携・外部システム連携",
			"高度なセキュリティ対策",
			"パフォーマンス最適化",
			"多言語対応",
			"A/Bテスト機能",
			"12ヶ月保守サポート",
			"専任担当者",
		],
		notIncluded: [],
		buttonText: "要件を相談",
		buttonVariant: "outline" as const,
	},
];

export function JamstackPricingSection() {
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
									? "border-green-600 shadow-lg scale-105"
									: "hover:shadow-lg"
							} transition-all duration-300`}
						>
							{plan.popular && (
								<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
									<span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
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
											<FaCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
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

								<Link href="/contact?service=jamstack" className="block">
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
						<br />※ 運用費: 月額1,000円〜（ホスティング・ドメイン・SSL込み）
					</p>
				</div>
			</Container>
		</section>
	);
}
