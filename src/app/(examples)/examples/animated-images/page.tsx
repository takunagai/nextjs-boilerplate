import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { AnimatedImage } from "@/components/ui/animated-image";
import { sampleImages, getImagesByCategory } from "@/lib/data/sample-images";

export const metadata: Metadata = {
	title: "アニメーション画像 - サンプル",
	description: "ビューポート内に入るとフェードインするアニメーション画像のデモ",
};

/**
 * 画像フェードインアニメーションのサンプルページ
 *
 * 特徴:
 * - サーバーコンポーネント (RSC) として実装
 * - Intersection Observer による遅延アニメーション
 * - レスポンシブ対応のマソナリーレイアウト
 * - パフォーマンス最適化
 */
export default function AnimatedImagesPage() {
	// サーバーサイドでデータを準備
	const landscapeImages = getImagesByCategory("landscape");
	const portraitImages = getImagesByCategory("portrait");
	const squareImages = getImagesByCategory("square");

	return (
		<main className="py-12">
			<Container className="max-w-6xl">
				{/* ヘッダーセクション */}
				<div className="text-center mb-16">
					<h1 className="text-4xl font-bold tracking-tight mb-4">
						アニメーション画像ギャラリー
					</h1>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						スクロールすると画像がふわっと現れるアニメーション効果のデモンストレーションです。
						各画像はビューポートに入ると自動的にフェードインします。
					</p>
				</div>

				{/* 基本的なアニメーション */}
				<section className="mb-20">
					<h2 className="text-2xl font-semibold mb-8">基本的なフェードイン</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{sampleImages.slice(0, 6).map((image, index) => (
							<div key={image.id} className="space-y-4">
								<AnimatedImage
									src={image.src}
									alt={image.alt}
									width={image.width}
									height={image.height}
									className="rounded-lg shadow-md"
									animation={{
										duration: 0.6,
										delay: index * 0.1, // 順次表示
									}}
								/>
								<div>
									<h3 className="font-medium">{image.title}</h3>
									<p className="text-sm text-muted-foreground">
										{image.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* ランドスケープ画像セクション */}
				<section className="mb-20">
					<h2 className="text-2xl font-semibold mb-8">ランドスケープ画像</h2>
					<div className="space-y-12">
						{landscapeImages.map((image, index) => (
							<div key={image.id} className="max-w-4xl mx-auto">
								<AnimatedImage
									src={image.src}
									alt={image.alt}
									width={image.width}
									height={image.height}
									className="rounded-lg shadow-lg w-full"
									animation={{
										duration: 0.8,
										delay: 0.2,
										yOffset: 30, // より大きな移動量
									}}
									intersection={{
										threshold: 0.2,
										rootMargin: "0px 0px -100px 0px",
									}}
								/>
								<div className="mt-4 text-center">
									<h3 className="text-xl font-medium">{image.title}</h3>
									<p className="text-muted-foreground mt-2">
										{image.description}
									</p>
									<div className="flex flex-wrap justify-center gap-2 mt-3">
										{image.tags.map((tag) => (
											<span
												key={tag}
												className="px-2 py-1 bg-muted text-xs rounded-full"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* 縦長画像セクション */}
				<section className="mb-20">
					<h2 className="text-2xl font-semibold mb-8">ポートレート画像</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{portraitImages.map((image, index) => (
							<div key={image.id}>
								<AnimatedImage
									src={image.src}
									alt={image.alt}
									width={image.width}
									height={image.height}
									className="rounded-lg shadow-md w-full"
									animation={{
										duration: 0.7,
										delay: index * 0.15,
										ease: "easeOut",
									}}
									intersection={{
										threshold: 0.1,
										rootMargin: "0px 0px -50px 0px",
									}}
								/>
								<div className="mt-3">
									<h3 className="font-medium">{image.title}</h3>
									<p className="text-sm text-muted-foreground">
										{image.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* スクエア画像セクション（マソナリー風レイアウト） */}
				<section className="mb-20">
					<h2 className="text-2xl font-semibold mb-8">スクエア画像</h2>
					<div className="columns-1 md:columns-2 lg:columns-3 gap-8">
						{squareImages.map((image, index) => (
							<div key={image.id} className="mb-8 break-inside-avoid">
								<AnimatedImage
									src={image.src}
									alt={image.alt}
									width={image.width}
									height={image.height}
									className="rounded-lg shadow-md w-full"
									animation={{
										duration: 0.6,
										delay: index * 0.1,
										yOffset: 40,
									}}
									intersection={{
										threshold: 0.15,
										rootMargin: "0px 0px -80px 0px",
									}}
								/>
								<div className="mt-3">
									<h3 className="font-medium">{image.title}</h3>
									<p className="text-sm text-muted-foreground">
										{image.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* カスタムアニメーション例 */}
				<section>
					<h2 className="text-2xl font-semibold mb-8">
						カスタムアニメーション
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						<div>
							<h3 className="text-lg font-medium mb-4">
								ゆっくりとしたアニメーション
							</h3>
							<AnimatedImage
								src="https://picsum.photos/600/400?random=13"
								alt="ゆっくりアニメーションのサンプル"
								width={600}
								height={400}
								className="rounded-lg shadow-md w-full"
								animation={{
									duration: 1.2,
									delay: 0.3,
									yOffset: 50,
									ease: "easeInOut",
								}}
							/>
						</div>
						<div>
							<h3 className="text-lg font-medium mb-4">素早いアニメーション</h3>
							<AnimatedImage
								src="https://picsum.photos/600/400?random=14"
								alt="素早いアニメーションのサンプル"
								width={600}
								height={400}
								className="rounded-lg shadow-md w-full"
								animation={{
									duration: 0.3,
									delay: 0,
									yOffset: 10,
									ease: "easeOut",
								}}
							/>
						</div>
					</div>
				</section>

				{/* パフォーマンス情報 */}
				<section className="mt-20 p-6 bg-muted rounded-lg">
					<h2 className="text-xl font-semibold mb-4">パフォーマンス最適化</h2>
					<ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
						<li>Intersection Observer APIによる効率的な監視</li>
						<li>
							GPU最適化（transform + opacity）によるスムーズなアニメーション
						</li>
						<li>Next.js Image による自動画像最適化</li>
						<li>遅延読み込み（loading="lazy"）によるパフォーマンス向上</li>
						<li>prefers-reduced-motion 対応（アクセシビリティ）</li>
						<li>サーバーコンポーネントによる初期ロードの高速化</li>
					</ul>
				</section>
			</Container>
		</main>
	);
}
