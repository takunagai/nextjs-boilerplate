import { Container } from "@/components/ui/container";
import { FaCheck, FaRocket, FaCrown } from "react-icons/fa6";

const pricingPlans = [
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

const additionalServices = [
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

export function AIPricingPlans() {
	return (
		<section className="bg-gray-50 py-16 dark:bg-gray-900 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						料金プラン
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						制作内容に応じた柔軟な料金設定
					</p>
				</div>

				{/* 料金プラン */}
				<div className="mt-16 grid gap-8 lg:grid-cols-3">
					{pricingPlans.map((plan, index) => (
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
							{plan.limitations.length > 0 && (
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

				{/* 料金に関する注意事項 */}
				<div className="mt-12 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
					<h4 className="mb-4 font-semibold text-blue-900 dark:text-blue-100">
						料金について
					</h4>
					<ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
						<li>• すべて税込み価格です</li>
						<li>• 制作前に詳細お見積もりをご提示いたします</li>
						<li>• 複雑な要望の場合は個別見積もりとなります</li>
						<li>• お支払いは制作完了後の後払いも可能です</li>
						<li>• 長期契約・大量注文は別途割引制度があります</li>
					</ul>
				</div>

				{/* 見積もりCTA */}
				<div className="mt-12 text-center">
					<p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
						詳細なお見積もりは無料です。お気軽にお問い合わせください
					</p>
					<a
						href="#contact"
						className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-lg"
					>
						無料見積もり依頼
					</a>
				</div>
			</Container>
		</section>
	);
}
