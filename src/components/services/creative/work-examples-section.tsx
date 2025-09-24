import Image from "next/image";

interface WorkExample {
	id: string;
	title: string;
	category: string;
	description: string;
	imageUrl: string;
	beforeImageUrl?: string;
	tags: string[];
}

const workExamples: WorkExample[] = [
	{
		id: "logo-design-1",
		title: "テックスタートアップのロゴ",
		category: "ロゴデザイン",
		description:
			"AIで生成したベースデザインを、ブランドコンセプトに合わせて精緻に調整",
		imageUrl: "/dummy-images/logo-sample-1.jpg",
		tags: ["Midjourney", "Illustrator", "ブランディング"],
	},
	{
		id: "banner-design-1",
		title: "SNS広告バナー",
		category: "バナーデザイン",
		description: "商品の魅力を最大化するビジュアルデザインとキャッチコピー",
		imageUrl: "/dummy-images/banner-sample-1.jpg",
		tags: ["DALL-E", "Photoshop", "広告デザイン"],
	},
	{
		id: "photo-retouch-1",
		title: "商品写真の背景除去・加工",
		category: "写真補正・加工",
		description:
			"ECサイト用商品写真の背景をクリーンに処理し、購買意欲を高める仕上がりに",
		imageUrl: "/dummy-images/product-photo-after.jpg",
		beforeImageUrl: "/dummy-images/product-photo-before.jpg",
		tags: ["Photoshop", "背景除去", "商品撮影"],
	},
	{
		id: "illustration-1",
		title: "ウェブサイト用イラスト",
		category: "イラスト作成",
		description:
			"サービス紹介ページのメインビジュアル。AIで生成後、統一感のあるスタイルに調整",
		imageUrl: "/dummy-images/illustration-sample-1.jpg",
		tags: ["Stable Diffusion", "Illustrator", "ウェブデザイン"],
	},
	{
		id: "infographic-1",
		title: "データ可視化インフォグラフィック",
		category: "インフォグラフィック",
		description:
			"複雑なデータを分かりやすく視覚化。AIアシストでレイアウトを最適化",
		imageUrl: "/dummy-images/infographic-sample-1.jpg",
		tags: ["ChatGPT", "Illustrator", "データ可視化"],
	},
	{
		id: "package-design-1",
		title: "商品パッケージデザイン",
		category: "パッケージデザイン",
		description:
			"ターゲット層に響くデザインをAIで提案し、実用性を考慮して最終調整",
		imageUrl: "/dummy-images/package-sample-1.jpg",
		tags: ["Midjourney", "Photoshop", "パッケージング"],
	},
];

export function WorkExamplesSection() {
	return (
		<section className="py-16 md:py-24 bg-gradient-to-b from-violet-50/30 to-purple-50/30 dark:from-violet-950/20 dark:to-purple-950/20">
			<div className="container mx-auto space-y-12">
				{/* セクションヘッダー */}
				<div className="text-center space-y-4">
					<h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
						制作実績例
					</h2>
					<p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
						AIの力を活用して制作した様々なデザイン素材の例をご紹介します
					</p>
				</div>

				{/* 作品グリッド */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{workExamples.map((example) => (
						<div
							key={example.id}
							className="group bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
						>
							{/* 画像エリア */}
							<div className="relative aspect-[4/3] overflow-hidden">
								{example.beforeImageUrl ? (
									// Before/After表示
									<div className="relative w-full h-full">
										<div className="absolute inset-0 flex">
											<div className="w-1/2 relative">
												<Image
													src={example.beforeImageUrl}
													alt={`${example.title} - Before`}
													fill
													className="object-cover"
													sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
												/>
												<div className="absolute top-2 left-2 bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
													Before
												</div>
											</div>
											<div className="w-1/2 relative">
												<Image
													src={example.imageUrl}
													alt={`${example.title} - After`}
													fill
													className="object-cover"
													sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
												/>
												<div className="absolute top-2 right-2 bg-violet-600 text-white text-xs px-2 py-1 rounded">
													After
												</div>
											</div>
										</div>
									</div>
								) : (
									// 通常の画像表示
									<>
										<Image
											src={example.imageUrl}
											alt={example.title}
											fill
											className="object-cover group-hover:scale-105 transition-transform duration-300"
											sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										/>
										<div className="absolute top-2 left-2 bg-violet-600 text-white text-xs px-2 py-1 rounded">
											{example.category}
										</div>
									</>
								)}
							</div>

							{/* コンテンツエリア */}
							<div className="p-6 space-y-4">
								<div className="space-y-2">
									<h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
										{example.title}
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{example.description}
									</p>
								</div>

								{/* タグ */}
								<div className="flex flex-wrap gap-2">
									{example.tags.map((tag) => (
										<span
											key={tag}
											className="text-xs px-2 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-300 rounded-full"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>

				{/* CTA */}
				<div className="text-center">
					<p className="text-muted-foreground mb-4">
						あなたのプロジェクトに合わせたクリエイティブ制作も承ります
					</p>
					<a
						href="/contact"
						className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
					>
						制作を相談する
					</a>
				</div>
			</div>
		</section>
	);
}
