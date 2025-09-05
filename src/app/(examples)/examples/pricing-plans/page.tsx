import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { FaCheck, FaRocket, FaCrown, FaStar, FaHeart } from "react-icons/fa6";

type PricingPlan = {
	name: string;
	icon: React.ComponentType<{ className?: string }>;
	price: string;
	unit: string;
	description: string;
	features: string[];
	limitations?: string[];
	color: string;
	popular?: boolean;
};

type AdditionalService = {
	service: string;
	price: string;
	description: string;
};

type PricingPlansProps = {
	title: string;
	subtitle?: string;
	plans: PricingPlan[];
	additionalServices?: AdditionalService[];
	notes?: string[];
	ctaText?: string;
};

function PricingPlans({
	title,
	subtitle,
	plans,
	additionalServices,
	notes,
	ctaText = "無料見積もり依頼",
}: PricingPlansProps) {
	return (
		<section className="bg-gray-50 py-16 dark:bg-gray-900 sm:py-24">
			<Container>
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						{title}
					</h2>
					{subtitle && (
						<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
							{subtitle}
						</p>
					)}
				</div>

				{/* 料金プラン */}
				<div className="mt-16 grid gap-8 lg:grid-cols-3">
					{plans.map((plan, index) => (
						<div
							key={index}
							className={`relative rounded-2xl border-2 bg-white p-8 shadow-lg dark:bg-gray-800 ${plan.color} ${
								plan.popular ? "scale-105 shadow-xl" : ""
							}`}
						>
							{/* 人気ラベル */}
							{plan.popular && (
								<div className="absolute -top-4 left-1/2 -translate-x-1/2">
									<span className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
										おすすめ
									</span>
								</div>
							)}

							{/* プランヘッダー */}
							<div className="mb-8 text-center">
								<plan.icon className="mx-auto mb-4 h-12 w-12 text-purple-600 dark:text-purple-400" />
								<h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
									{plan.name}
								</h3>
								<p className="text-gray-600 dark:text-gray-400">
									{plan.description}
								</p>
								<div className="mt-4">
									{plan.price !== "要相談" ? (
										<>
											<span className="text-4xl font-bold text-gray-900 dark:text-white">
												{plan.price}
											</span>
											<span className="text-lg text-gray-600 dark:text-gray-400">
												{plan.unit}
											</span>
										</>
									) : (
										<span className="text-2xl font-bold text-gray-900 dark:text-white">
											{plan.price}
										</span>
									)}
								</div>
							</div>

							{/* 機能リスト */}
							<ul className="mb-8 space-y-3">
								{plan.features.map((feature, featureIndex) => (
									<li key={featureIndex} className="flex items-start">
										<FaCheck className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
										<span className="text-gray-700 dark:text-gray-300">
											{feature}
										</span>
									</li>
								))}
							</ul>

							{/* 制限事項 */}
							{plan.limitations && plan.limitations.length > 0 && (
								<div className="mb-6">
									<p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
										制限事項：
									</p>
									<ul className="space-y-1">
										{plan.limitations.map((limitation, limitIndex) => (
											<li
												key={limitIndex}
												className="text-xs text-gray-500 dark:text-gray-500"
											>
												• {limitation}
											</li>
										))}
									</ul>
								</div>
							)}

							{/* CTAボタン */}
							<div className="text-center">
								<button
									type="button"
									className={`w-full rounded-lg px-6 py-3 text-sm font-medium transition-all ${
										plan.popular
											? "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-lg"
											: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
									}`}
								>
									{plan.price === "要相談" ? "相談する" : "注文する"}
								</button>
							</div>
						</div>
					))}
				</div>

				{/* オプションサービス */}
				{additionalServices && additionalServices.length > 0 && (
					<div className="mt-16">
						<h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
							オプションサービス
						</h3>
						<div className="grid gap-6 md:grid-cols-2">
							{additionalServices.map((service, index) => (
								<div
									key={index}
									className="flex items-center justify-between rounded-lg bg-white p-6 shadow-md dark:bg-gray-800"
								>
									<div>
										<h4 className="mb-1 font-semibold text-gray-900 dark:text-white">
											{service.service}
										</h4>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											{service.description}
										</p>
									</div>
									<div className="ml-4 text-right">
										<span className="text-lg font-bold text-purple-600 dark:text-purple-400">
											{service.price}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* 料金に関する注意事項 */}
				{notes && notes.length > 0 && (
					<div className="mt-12 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
						<h4 className="mb-4 font-semibold text-blue-900 dark:text-blue-100">
							料金について
						</h4>
						<ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
							{notes.map((note, index) => (
								<li key={index}>• {note}</li>
							))}
						</ul>
					</div>
				)}

				{/* 見積もりCTA */}
				<div className="mt-12 text-center">
					<p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
						詳細なお見積もりは無料です。お気軽にお問い合わせください
					</p>
					<button
						type="button"
						className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-lg"
					>
						{ctaText}
					</button>
				</div>
			</Container>
		</section>
	);
}

export default function PricingPlansPage() {
	// AI画像生成の料金プランデータ
	const aiImagePlans: PricingPlan[] = [
		{
			name: "ベーシック",
			icon: FaCheck,
			price: "8,800",
			unit: "円/点",
			description: "シンプルな画像補正・生成に最適",
			features: [
				"基本的な画像補正",
				"簡単なAI画像生成",
				"1点あたり最大3回修正",
				"48時間以内納品",
				"商用利用可能",
				"著作権譲渡",
			],
			limitations: ["複雑な合成は追加料金", "高解像度は要相談"],
			color: "border-gray-200 dark:border-gray-700",
			popular: false,
		},
		{
			name: "スタンダード",
			icon: FaRocket,
			price: "15,400",
			unit: "円/点",
			description: "高品質な制作・編集をお求めの方に",
			features: [
				"高度な画像補正・合成",
				"プロ品質AI画像生成",
				"1点あたり最大5回修正",
				"24時間以内納品",
				"高解像度対応（4K）",
				"ベクター画像変換可",
				"商用利用可能",
				"著作権譲渡",
			],
			limitations: ["特殊要望は要相談"],
			color: "border-purple-200 dark:border-purple-500",
			popular: true,
		},
		{
			name: "プレミアム",
			icon: FaCrown,
			price: "要相談",
			unit: "",
			description: "大量制作・特殊要望に完全対応",
			features: [
				"完全カスタム制作",
				"大量制作（10点以上）",
				"特殊技術・要望対応",
				"無制限修正",
				"優先納品（12時間以内）",
				"専任担当者",
				"制作過程レポート",
				"長期契約割引",
			],
			limitations: [],
			color: "border-gold-200 dark:border-yellow-500",
			popular: false,
		},
	];

	const aiImageAdditionalServices: AdditionalService[] = [
		{
			service: "アップスケール（2-4倍）",
			price: "2,200円",
			description: "既存画像の高解像度化",
		},
		{
			service: "背景除去・変更",
			price: "3,300円",
			description: "背景のクリーンアップ・差し替え",
		},
		{
			service: "バッチ処理（10点以上）",
			price: "20%割引",
			description: "同一作業の大量処理",
		},
		{
			service: "緊急対応（6時間以内）",
			price: "+50%",
			description: "通常より迅速な納品",
		},
	];

	const aiImageNotes = [
		"すべて税込み価格です",
		"制作前に詳細お見積もりをご提示いたします",
		"複雑な要望の場合は個別見積もりとなります",
		"お支払いは制作完了後の後払いも可能です",
		"長期契約・大量注文は別途割引制度があります",
	];

	// サブスクリプション型のサンプル
	const subscriptionPlans: PricingPlan[] = [
		{
			name: "スターター",
			icon: FaStar,
			price: "980",
			unit: "円/月",
			description: "個人・小規模チーム向け",
			features: [
				"月5プロジェクトまで",
				"基本テンプレート",
				"メールサポート",
				"1GBストレージ",
				"基本分析機能",
			],
			color: "border-gray-200 dark:border-gray-700",
			popular: false,
		},
		{
			name: "プロフェッショナル",
			icon: FaRocket,
			price: "2,980",
			unit: "円/月",
			description: "成長中の企業に最適",
			features: [
				"無制限プロジェクト",
				"プレミアムテンプレート",
				"優先サポート",
				"10GBストレージ",
				"高度な分析機能",
				"チーム機能",
				"API アクセス",
			],
			color: "border-blue-200 dark:border-blue-500",
			popular: true,
		},
		{
			name: "エンタープライズ",
			icon: FaCrown,
			price: "要相談",
			unit: "",
			description: "大企業・カスタム要件向け",
			features: [
				"カスタム機能開発",
				"専任サポート",
				"無制限ストレージ",
				"オンプレミス対応",
				"SLA保証",
				"セキュリティ監査",
				"トレーニング提供",
			],
			color: "border-purple-200 dark:border-purple-500",
			popular: false,
		},
	];

	return (
		<Container className="mt-8" paddingY="lg" paddingX="2xl">
			<PageHeader
				title="料金プランサンプル集"
				description="様々な業種・サービス向けの料金プラン設計例を紹介します。"
			/>

			{/* AI画像生成サービスの料金プラン */}
			<div className="mb-16">
				<h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
					1. AI画像生成サービス（制作物単価型）
				</h2>
				<div className="rounded-lg border bg-white p-4 dark:bg-gray-800 dark:border-gray-700">
					<PricingPlans
						title="料金プラン"
						subtitle="制作内容に応じた柔軟な料金設定"
						plans={aiImagePlans}
						additionalServices={aiImageAdditionalServices}
						notes={aiImageNotes}
						ctaText="無料見積もり依頼"
					/>
				</div>
			</div>

			{/* サブスクリプション型のサンプル */}
			<div className="mb-16">
				<h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
					2. SaaSサービス（サブスクリプション型）
				</h2>
				<div className="rounded-lg border bg-white p-4 dark:bg-gray-800 dark:border-gray-700">
					<PricingPlans
						title="プラン＆料金"
						subtitle="チーム規模に応じて選べるプラン"
						plans={subscriptionPlans}
						ctaText="無料トライアル開始"
					/>
				</div>
			</div>

			{/* 実装のポイント */}
			<div className="mt-16">
				<h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
					実装のポイント
				</h2>
				<div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
					<h3 className="mb-4 text-lg font-semibold text-blue-900 dark:text-blue-100">
						料金プランコンポーネントの設計原則
					</h3>
					<ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
						<li>• 再利用可能なコンポーネント設計で様々な料金体系に対応</li>
						<li>• TypeScriptの型定義により安全で保守性の高いコード</li>
						<li>• レスポンシブデザインでモバイルからデスクトップまで対応</li>
						<li>• ダークモードサポートで現代的なUX</li>
						<li>• 「おすすめ」プランの視覚的強調による誘導効果</li>
						<li>• 制限事項の明示による透明性の確保</li>
						<li>• 追加サービス表示による売上機会の拡大</li>
					</ul>
				</div>

				<div className="mt-6 rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
					<h3 className="mb-4 text-lg font-semibold text-green-900 dark:text-green-100">
						活用例
					</h3>
					<ul className="space-y-2 text-sm text-green-800 dark:text-green-200">
						<li>
							• <strong>制作会社</strong>:
							単価型料金（デザイン・開発・動画制作など）
						</li>
						<li>
							• <strong>SaaS・Webサービス</strong>:
							サブスクリプション型（月額・年額）
						</li>
						<li>
							• <strong>コンサルティング</strong>: 時間単価・プロジェクト型
						</li>
						<li>
							• <strong>EC・物販</strong>: 商品価格帯別のサービスレベル
						</li>
						<li>
							• <strong>教育・研修</strong>: コース別・期間別料金
						</li>
					</ul>
				</div>
			</div>
		</Container>
	);
}
