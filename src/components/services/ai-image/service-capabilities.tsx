import { Container } from "@/components/ui/container";
import { FaImage, FaRobot, FaWandMagicSparkles } from "react-icons/fa6";
import Image from "next/image";

const capabilities = [
	{
		icon: FaImage,
		title: "写真加工・画像補正",
		description: "既存の写真を高品質に補正・加工し、理想的な仕上がりに",
		services: [
			{
				name: "アップスケール・高画質化",
				description: "小さい写真やボケた写真をシャープで高解像度に変換",
				beforeImage: "/api/placeholder/300/200",
				afterImage: "/api/placeholder/300/200",
			},
			{
				name: "写真復元・補完",
				description: "見切れた部分や欠損部分をAIで自然に復元",
				beforeImage: "/api/placeholder/300/200",
				afterImage: "/api/placeholder/300/200",
			},
			{
				name: "背景除去・合成",
				description: "背景の除去や差し替え、自然な合成処理",
				beforeImage: "/api/placeholder/300/200",
				afterImage: "/api/placeholder/300/200",
			},
		],
	},
	{
		icon: FaRobot,
		title: "AI画像生成",
		description: "ヒアリングを基に、ゼロから理想的な画像を生成",
		services: [
			{
				name: "架空モデル・人物写真",
				description: "実在しないモデルの高品質な写真を生成",
				beforeImage: "/api/placeholder/300/200",
				afterImage: "/api/placeholder/300/200",
			},
			{
				name: "イラスト・アートワーク",
				description: "様々なスタイルのイラストやアートワークを制作",
				beforeImage: "/api/placeholder/300/200",
				afterImage: "/api/placeholder/300/200",
			},
			{
				name: "グラフ・図解作成",
				description: "データビジュアライゼーションや説明図を生成",
				beforeImage: "/api/placeholder/300/200",
				afterImage: "/api/placeholder/300/200",
			},
		],
	},
	{
		icon: FaWandMagicSparkles,
		title: "特殊加工・編集",
		description: "高度な技術を使った特殊な加工・編集処理",
		services: [
			{
				name: "表情・角度変更",
				description: "被写体の表情や角度を自然に変更",
				beforeImage: "/api/placeholder/300/200",
				afterImage: "/api/placeholder/300/200",
			},
			{
				name: "スタイル変換",
				description: "写真をイラスト風や絵画風に変換",
				beforeImage: "/api/placeholder/300/200",
				afterImage: "/api/placeholder/300/200",
			},
			{
				name: "年齢・性別変更",
				description: "自然な年齢変更や性別変更処理",
				beforeImage: "/api/placeholder/300/200",
				afterImage: "/api/placeholder/300/200",
			},
		],
	},
];

export function ServiceCapabilities() {
	return (
		<section className="bg-gray-50 py-16 dark:bg-gray-900 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						サービス内容
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						ビフォー・アフターで分かる圧倒的な品質向上
					</p>
				</div>

				<div className="mt-16 space-y-20">
					{capabilities.map((category, categoryIndex) => (
						<div key={categoryIndex}>
							{/* カテゴリヘッダー */}
							<div className="mb-8 text-center">
								<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-lg">
									<category.icon className="h-8 w-8" />
								</div>
								<h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
									{category.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-400">
									{category.description}
								</p>
							</div>

							{/* サービス詳細 */}
							<div className="grid gap-8 lg:grid-cols-3">
								{category.services.map((service, serviceIndex) => (
									<div
										key={serviceIndex}
										className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800"
									>
										{/* ビフォー・アフター画像 */}
										<div className="relative">
											<div className="grid grid-cols-2">
												{/* Before */}
												<div className="relative">
													<Image
														src={service.beforeImage}
														alt={`${service.name} - 加工前`}
														width={300}
														height={200}
														className="h-40 w-full object-cover"
													/>
													<div className="absolute left-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-medium text-white">
														Before
													</div>
												</div>
												{/* After */}
												<div className="relative">
													<Image
														src={service.afterImage}
														alt={`${service.name} - 加工後`}
														width={300}
														height={200}
														className="h-40 w-full object-cover"
													/>
													<div className="absolute right-2 top-2 rounded bg-green-500 px-2 py-1 text-xs font-medium text-white">
														After
													</div>
												</div>
											</div>
											{/* 矢印 */}
											<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
												<div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white shadow-lg">
													<svg
														className="h-4 w-4"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M9 5l7 7-7 7"
														/>
													</svg>
												</div>
											</div>
										</div>

										{/* サービス説明 */}
										<div className="p-6">
											<h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
												{service.name}
											</h4>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												{service.description}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				{/* 動画・音楽生成の囲み記事 */}
				<div className="mt-16 rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50 p-8 dark:border-purple-700 dark:bg-purple-900/20">
					<div className="text-center">
						<h3 className="mb-4 text-xl font-bold text-purple-900 dark:text-purple-100">
							🎬 その他のAI制作サービス
						</h3>
						<p className="mb-4 text-purple-800 dark:text-purple-200">
							<strong>動画編集や音楽生成についてもご相談ください</strong>
						</p>
						<p className="text-sm text-purple-700 dark:text-purple-300">
							AI技術を活用した動画制作、BGM生成、音声合成など、
							画像以外の制作にも対応いたします。お気軽にお問い合わせください。
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}