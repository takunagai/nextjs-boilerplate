import MasonryGallery from "@/components/masonry-gallery/MasonryGallery";
import type { Photo } from "@/components/masonry-gallery/types";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

interface GalleryItem extends Photo {
	category: string;
	caption: string;
}

// Masonryギャラリー用のサンプル画像データ
const galleryItems: GalleryItem[] = [
	// 画像生成
	{
		id: "image-1",
		src: "/dummy-images/ai-generated-artwork-1.jpg",
		alt: "AI生成アートワーク - 抽象デザイン",
		width: 400,
		height: 600,
		category: "画像生成",
		caption: "Midjourney で生成したビジュアルアート",
		title: "Abstract Digital Art",
	},
	{
		id: "image-2",
		src: "/dummy-images/ai-generated-artwork-2.jpg",
		alt: "AI生成アートワーク - 風景画",
		width: 400,
		height: 300,
		category: "画像生成",
		caption: "DALL-E による風景画風イラスト",
		title: "Landscape Illustration",
	},
	{
		id: "image-3",
		src: "/dummy-images/ai-generated-artwork-3.jpg",
		alt: "AI生成アートワーク - キャラクター",
		width: 400,
		height: 500,
		category: "画像生成",
		caption: "キャラクターデザインをAIでブラッシュアップ",
		title: "Character Design",
	},
	// ロゴ生成
	{
		id: "logo-1",
		src: "/dummy-images/logo-design-1.jpg",
		alt: "AI生成ロゴデザイン - テック企業",
		width: 400,
		height: 400,
		category: "ロゴ生成",
		caption: "テック企業向けモダンロゴデザイン",
		title: "Tech Company Logo",
	},
	{
		id: "logo-2",
		src: "/dummy-images/logo-design-2.jpg",
		alt: "AI生成ロゴデザイン - カフェ",
		width: 400,
		height: 400,
		category: "ロゴ生成",
		caption: "カフェブランドのロゴ制作",
		title: "Cafe Brand Logo",
	},
	{
		id: "logo-3",
		src: "/dummy-images/logo-design-3.jpg",
		alt: "AI生成ロゴデザイン - ファッション",
		width: 400,
		height: 400,
		category: "ロゴ生成",
		caption: "ファッションブランドのロゴデザイン",
		title: "Fashion Brand Logo",
	},
	// 写真補正・加工
	{
		id: "retouch-1",
		src: "/dummy-images/photo-retouch-1.jpg",
		alt: "写真補正例 - 商品写真",
		width: 400,
		height: 300,
		category: "写真補正・加工",
		caption: "商品写真の背景除去・ライティング調整",
		title: "Product Photo Enhancement",
	},
	{
		id: "retouch-2",
		src: "/dummy-images/photo-retouch-2.jpg",
		alt: "写真補正例 - ポートレート",
		width: 400,
		height: 500,
		category: "写真補正・加工",
		caption: "ポートレート写真のレタッチ・美肌加工",
		title: "Portrait Retouching",
	},
	{
		id: "retouch-3",
		src: "/dummy-images/photo-retouch-3.jpg",
		alt: "写真補正例 - 建築写真",
		width: 400,
		height: 600,
		category: "写真補正・加工",
		caption: "建築写真の歪み補正・色彩調整",
		title: "Architecture Photo Correction",
	},
	// バナー・チラシデザイン
	{
		id: "banner-1",
		src: "/dummy-images/banner-design-1.jpg",
		alt: "バナーデザイン - セール告知",
		width: 400,
		height: 200,
		category: "バナー・チラシデザイン",
		caption: "セール告知用バナーデザイン",
		title: "Sale Banner Design",
	},
	{
		id: "banner-2",
		src: "/dummy-images/banner-design-2.jpg",
		alt: "バナーデザイン - イベント告知",
		width: 400,
		height: 300,
		category: "バナー・チラシデザイン",
		caption: "イベント告知用チラシデザイン",
		title: "Event Flyer Design",
	},
	{
		id: "banner-3",
		src: "/dummy-images/banner-design-3.jpg",
		alt: "バナーデザイン - SNS広告",
		width: 400,
		height: 400,
		category: "バナー・チラシデザイン",
		caption: "SNS広告用バナーデザイン",
		title: "Social Media Ad Banner",
	},
	// インフォグラフィック
	{
		id: "infographic-1",
		src: "/dummy-images/infographic-1.jpg",
		alt: "インフォグラフィック - データ可視化",
		width: 400,
		height: 800,
		category: "インフォグラフィック",
		caption: "複雑なデータをわかりやすく可視化",
		title: "Data Visualization",
	},
	{
		id: "infographic-2",
		src: "/dummy-images/infographic-2.jpg",
		alt: "インフォグラフィック - プロセス図解",
		width: 400,
		height: 600,
		category: "インフォグラフィック",
		caption: "業務プロセスの図解インフォグラフィック",
		title: "Process Infographic",
	},
	// パッケージデザイン
	{
		id: "package-1",
		src: "/dummy-images/package-design-1.jpg",
		alt: "パッケージデザイン - 食品",
		width: 400,
		height: 500,
		category: "パッケージデザイン",
		caption: "食品パッケージのデザイン・レイアウト",
		title: "Food Package Design",
	},
	{
		id: "package-2",
		src: "/dummy-images/package-design-2.jpg",
		alt: "パッケージデザイン - 化粧品",
		width: 400,
		height: 600,
		category: "パッケージデザイン",
		caption: "化粧品パッケージの高級感あるデザイン",
		title: "Cosmetics Package Design",
	},
];

// カスタムMasonryGalleryコンポーネント（オーバーレイ付き）
function CustomMasonryGallery({ photos }: { photos: GalleryItem[] }) {
	return (
		<section aria-label="Creative Works Gallery" className="@container">
			<div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
				{photos.map((photo, index) => {
					const item = photo as GalleryItem;
					return (
						<div
							key={photo.id || index}
							className="break-inside-avoid-column group cursor-pointer"
						>
							<figure className="relative w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
								<img
									src={photo.src}
									alt={photo.alt || `Gallery image ${index + 1}`}
									width={photo.width}
									height={photo.height}
									className="block h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
									style={{
										aspectRatio: photo.width / photo.height,
									}}
									loading="lazy"
								/>

								{/* オーバーレイ */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
									<div className="absolute bottom-0 left-0 right-0 p-4 text-white">
										{/* カテゴリラベル */}
										<div className="mb-2">
											<span className="inline-block px-3 py-1 bg-violet-600/90 text-xs font-medium rounded-full backdrop-blur-sm">
												{item.category}
											</span>
										</div>

										{/* タイトルとキャプション */}
										<h3 className="font-semibold text-sm mb-1 line-clamp-2">
											{photo.title}
										</h3>
										<p className="text-xs text-gray-200 line-clamp-2">
											{item.caption}
										</p>
									</div>
								</div>

								{/* 常に表示されるカテゴリラベル（上部） */}
								<div className="absolute top-3 left-3">
									<span className="inline-block px-2 py-1 bg-white/90 dark:bg-gray-900/90 text-xs font-medium text-gray-900 dark:text-gray-100 rounded backdrop-blur-sm">
										{item.category}
									</span>
								</div>
							</figure>
						</div>
					);
				})}
			</div>
		</section>
	);
}

export function CreativeSampleGallerySection() {
	return (
		<section id="gallery" className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-6">
						作品ギャラリー
					</Heading>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						AI技術と人間の感性を組み合わせて制作した、実際の作品例をご覧ください
					</p>
				</div>

				{/* カスタムMasonryギャラリー */}
				<div className="max-w-7xl mx-auto">
					<CustomMasonryGallery photos={galleryItems} />
				</div>

				{/* 注意事項 */}
				<div className="text-center mt-12 p-6 bg-violet-50 dark:bg-violet-950/30 rounded-2xl border border-violet-200 dark:border-violet-800">
					<p className="text-sm text-muted-foreground">
						※ 掲載されている画像は制作例です。実際のプロジェクトに応じて、お客様のニーズに合ったデザインを制作いたします。
					</p>
				</div>
			</Container>
		</section>
	);
}
