import { Container } from "@/components/ui/container";
import { FaShieldHeart, FaTriangleExclamation, FaCheck } from "react-icons/fa6";

const capabilities = [
	"高解像度画像の生成・処理",
	"自然な表情・ポーズの人物画像",
	"商品・オブジェクトの詳細な描写",
	"様々なアートスタイルでの制作",
	"背景の追加・変更・除去",
	"色調・明度の精密調整",
];

const limitations = [
	"著作権のある人物・キャラクターの生成",
	"過度に複雑な構図や細かいディテール",
	"特定の文字・テキストの正確な描画",
	"実写レベルの超精密な画像（制限あり）",
	"動画・アニメーションの生成",
	"3Dモデリングデータの生成",
];

const qualityStandards = [
	{
		title: "品質基準",
		description: "プロ仕様の画質とクオリティを保証",
		details: [
			"最低解像度：1920×1080以上",
			"プロ品質の色調・コントラスト",
			"自然で違和感のない仕上がり",
		],
	},
	{
		title: "修正対応",
		description: "ご満足いただけるまで調整いたします",
		details: [
			"初回納品後3回まで無料修正",
			"軽微な調整は24時間以内",
			"大幅な変更も柔軟に対応",
		],
	},
	{
		title: "著作権保証",
		description: "安心してご利用いただける権利処理",
		details: [
			"生成画像の商用利用可能",
			"著作権は制作後にお客様に譲渡",
			"権利関係の明確な説明書付与",
		],
	},
];

export function QualityAssurance() {
	return (
		<section className="bg-gray-50 py-16 dark:bg-gray-900 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						品質保証と制限事項
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						透明性を重視した、できること・できないことの明確化
					</p>
				</div>

				{/* 重要な注意事項（目立つデザイン） */}
				<div className="mt-12">
					<div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border-4 border-amber-400 bg-gradient-to-r from-amber-50 to-orange-50 p-8 shadow-2xl dark:from-amber-900/20 dark:to-orange-900/20">
						{/* 警告アイコン */}
						<div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-amber-400 opacity-20" />
						<div className="absolute right-4 top-4">
							<FaTriangleExclamation className="h-8 w-8 text-amber-500" />
						</div>

						<div className="relative">
							<h3 className="mb-4 flex items-center text-2xl font-bold text-amber-900 dark:text-amber-100">
								<FaTriangleExclamation className="mr-3 h-6 w-6 text-amber-500" />
								重要な注意事項
							</h3>
							<div className="grid gap-4 md:grid-cols-2">
								<div className="rounded-lg bg-white/70 p-4 dark:bg-gray-800/70">
									<p className="font-semibold text-amber-900 dark:text-amber-100">
										条件による制約について
									</p>
									<p className="text-sm text-amber-800 dark:text-amber-200">
										写真の状態や生成内容によっては、
										期待通りの結果が得られない場合があります。
									</p>
								</div>
								<div className="rounded-lg bg-white/70 p-4 dark:bg-gray-800/70">
									<p className="font-semibold text-amber-900 dark:text-amber-100">
										事前相談を推奨
									</p>
									<p className="text-sm text-amber-800 dark:text-amber-200">
										制作前に必ず詳細をお聞かせいただき、
										実現可能性を確認してから進行いたします。
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* できること・できないこと */}
				<div className="mt-16 grid gap-8 lg:grid-cols-2">
					{/* できること */}
					<div className="rounded-2xl bg-green-50 p-8 dark:bg-green-900/20">
						<h3 className="mb-6 flex items-center text-xl font-bold text-green-900 dark:text-green-100">
							<FaCheck className="mr-3 h-6 w-6 text-green-600" />
							できること・得意分野
						</h3>
						<ul className="space-y-3">
							{capabilities.map((capability, index) => (
								<li key={index} className="flex items-start">
									<FaCheck className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
									<span className="text-green-800 dark:text-green-200">
										{capability}
									</span>
								</li>
							))}
						</ul>
					</div>

					{/* 制限事項 */}
					<div className="rounded-2xl bg-red-50 p-8 dark:bg-red-900/20">
						<h3 className="mb-6 flex items-center text-xl font-bold text-red-900 dark:text-red-100">
							<FaTriangleExclamation className="mr-3 h-6 w-6 text-red-600" />
							制限事項・苦手分野
						</h3>
						<ul className="space-y-3">
							{limitations.map((limitation, index) => (
								<li key={index} className="flex items-start">
									<FaTriangleExclamation className="mr-3 mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
									<span className="text-red-800 dark:text-red-200">
										{limitation}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* 品質保証 */}
				<div className="mt-16">
					<h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
						品質保証体制
					</h3>
					<div className="grid gap-8 md:grid-cols-3">
						{qualityStandards.map((standard, index) => (
							<div
								key={index}
								className="rounded-xl bg-white p-6 shadow-md dark:bg-gray-800"
							>
								<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600 dark:from-purple-900/30 dark:to-blue-900/30 dark:text-purple-400">
									<FaShieldHeart className="h-6 w-6" />
								</div>
								<h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
									{standard.title}
								</h4>
								<p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
									{standard.description}
								</p>
								<ul className="space-y-1">
									{standard.details.map((detail, detailIndex) => (
										<li
											key={detailIndex}
											className="text-xs text-gray-500 dark:text-gray-500"
										>
											• {detail}
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				{/* 相談を促すCTA */}
				<div className="mt-12 text-center">
					<div className="mx-auto max-w-2xl rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-6 dark:from-purple-900/20 dark:to-blue-900/20">
						<p className="mb-4 text-gray-700 dark:text-gray-300">
							<strong>
								ご不明な点や実現可能性については、お気軽にご相談ください
							</strong>
							<br />
							制作前の詳細なヒアリングで、最適なソリューションをご提案いたします。
						</p>
						<a
							href="#contact"
							className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-lg"
						>
							無料相談・見積もり依頼
						</a>
					</div>
				</div>
			</Container>
		</section>
	);
}