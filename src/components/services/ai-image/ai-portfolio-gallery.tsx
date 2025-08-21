"use client";

import { Container } from "@/components/ui/container";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaX, FaExpand } from "react-icons/fa6";

// サンプル作品データ（実際の画像URLに置き換えてください）
const portfolioImages = [
	{
		id: 1,
		src: "/api/placeholder/400/600",
		title: "AI生成ポートレート",
		category: "人物",
		technique: "AI生成 + Photoshop調整",
		height: "tall",
	},
	{
		id: 2,
		src: "/api/placeholder/400/300",
		title: "商品アップスケール",
		category: "商品",
		technique: "Topaz Gigapixel AI",
		height: "short",
	},
	{
		id: 3,
		src: "/api/placeholder/400/400",
		title: "イラスト生成",
		category: "イラスト",
		technique: "Midjourney + 後処理",
		height: "medium",
	},
	{
		id: 4,
		src: "/api/placeholder/400/500",
		title: "背景合成",
		category: "合成",
		technique: "Photoshop + AI背景生成",
		height: "medium-tall",
	},
	{
		id: 5,
		src: "/api/placeholder/400/300",
		title: "グラフィックデザイン",
		category: "グラフィック",
		technique: "AI生成 + Illustrator",
		height: "short",
	},
	{
		id: 6,
		src: "/api/placeholder/400/600",
		title: "ファッション写真",
		category: "人物",
		technique: "AI生成 + 色調補正",
		height: "tall",
	},
	{
		id: 7,
		src: "/api/placeholder/400/400",
		title: "建築パース",
		category: "建築",
		technique: "AI生成 + 品質向上",
		height: "medium",
	},
	{
		id: 8,
		src: "/api/placeholder/400/500",
		title: "料理写真補正",
		category: "料理",
		technique: "写真補正 + AI強化",
		height: "medium-tall",
	},
	{
		id: 9,
		src: "/api/placeholder/400/400",
		title: "アートワーク",
		category: "アート",
		technique: "Stable Diffusion",
		height: "medium",
	},
	{
		id: 10,
		src: "/api/placeholder/400/300",
		title: "ロゴデザイン",
		category: "ロゴ",
		technique: "AI生成 + ベクター化",
		height: "short",
	},
	{
		id: 11,
		src: "/api/placeholder/400/600",
		title: "風景画生成",
		category: "風景",
		technique: "DALL-E + 色彩調整",
		height: "tall",
	},
	{
		id: 12,
		src: "/api/placeholder/400/400",
		title: "キャラクター設計",
		category: "キャラクター",
		technique: "AI生成 + 統一性調整",
		height: "medium",
	},
	{
		id: 13,
		src: "/api/placeholder/400/500",
		title: "テクスチャ生成",
		category: "テクスチャ",
		technique: "AI生成 + パターン化",
		height: "medium-tall",
	},
	{
		id: 14,
		src: "/api/placeholder/400/300",
		title: "インフォグラフィック",
		category: "グラフィック",
		technique: "AI + データビジュアライゼーション",
		height: "short",
	},
	{
		id: 15,
		src: "/api/placeholder/400/400",
		title: "プロダクトモックアップ",
		category: "商品",
		technique: "3D AI + レンダリング",
		height: "medium",
	},
	{
		id: 16,
		src: "/api/placeholder/400/600",
		title: "映画ポスター風",
		category: "ポスター",
		technique: "AI生成 + 映画的演出",
		height: "tall",
	},
	{
		id: 17,
		src: "/api/placeholder/400/400",
		title: "抽象アート",
		category: "アート",
		technique: "AI生成 + アーティスティック調整",
		height: "medium",
	},
	{
		id: 18,
		src: "/api/placeholder/400/500",
		title: "企業ブランディング",
		category: "ブランディング",
		technique: "AI + コーポレートデザイン",
		height: "medium-tall",
	},
	{
		id: 19,
		src: "/api/placeholder/400/300",
		title: "SNS投稿素材",
		category: "SNS",
		technique: "AI生成 + SNS最適化",
		height: "short",
	},
	{
		id: 20,
		src: "/api/placeholder/400/400",
		title: "漫画風イラスト",
		category: "イラスト",
		technique: "AI生成 + 漫画スタイル調整",
		height: "medium",
	},
];

const categories = ["すべて", "人物", "商品", "イラスト", "合成", "グラフィック", "その他"];

export function AIPortfolioGallery() {
	const [selectedCategory, setSelectedCategory] = useState("すべて");
	const [selectedImage, setSelectedImage] = useState<
		(typeof portfolioImages)[0] | null
	>(null);

	const filteredImages =
		selectedCategory === "すべて"
			? portfolioImages
			: portfolioImages.filter((img) => {
					if (selectedCategory === "その他") {
						return !["人物", "商品", "イラスト", "合成", "グラフィック"].includes(
							img.category,
						);
					}
					return img.category === selectedCategory;
				});

	const getHeightClass = (height: string) => {
		switch (height) {
			case "short":
				return "row-span-2";
			case "medium":
				return "row-span-3";
			case "medium-tall":
				return "row-span-4";
			case "tall":
				return "row-span-5";
			default:
				return "row-span-3";
		}
	};

	return (
		<section
			id="gallery"
			className="bg-gray-50 py-16 dark:bg-gray-900 sm:py-24"
		>
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						制作実績ギャラリー
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						AI技術とデザイナーの技術で制作した作品をご紹介
					</p>
				</div>

				{/* カテゴリーフィルター */}
				<div className="mt-8 flex flex-wrap justify-center gap-2">
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => setSelectedCategory(category)}
							className={cn(
								"rounded-full px-6 py-2 text-sm font-medium transition-all",
								selectedCategory === category
									? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
									: "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
							)}
						>
							{category}
						</button>
					))}
				</div>

				{/* Masonryギャラリー */}
				<div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 [&>*]:break-inside-avoid">
					{filteredImages.map((image) => (
						<div
							key={image.id}
							className={cn(
								"group relative cursor-pointer overflow-hidden rounded-lg bg-gray-200 transition-all hover:shadow-xl dark:bg-gray-700",
								getHeightClass(image.height),
							)}
							onClick={() => setSelectedImage(image)}
						>
							<Image
								src={image.src}
								alt={image.title}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-110"
							/>

							{/* オーバーレイ */}
							<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
								<div className="absolute bottom-0 left-0 right-0 p-4">
									<p className="text-sm font-medium text-white">{image.title}</p>
									<p className="text-xs text-white/80">{image.technique}</p>
									<span className="mt-1 inline-block rounded bg-purple-500 px-2 py-1 text-xs text-white">
										{image.category}
									</span>
								</div>

								{/* ズームアイコン */}
								<div className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
									<FaExpand className="h-5 w-5 text-white" />
								</div>
							</div>
						</div>
					))}
				</div>

				{/* ライトボックス */}
				{selectedImage && (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
						onClick={() => setSelectedImage(null)}
					>
						<button
							className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
							onClick={() => setSelectedImage(null)}
						>
							<FaX className="h-6 w-6" />
						</button>

						<div className="relative max-h-[90vh] max-w-4xl">
							<Image
								src={selectedImage.src}
								alt={selectedImage.title}
								width={800}
								height={600}
								className="h-auto w-full rounded-lg"
							/>
							<div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black/80 to-transparent p-6">
								<p className="text-lg font-medium text-white">
									{selectedImage.title}
								</p>
								<p className="text-sm text-white/80">
									{selectedImage.technique}
								</p>
								<span className="mt-2 inline-block rounded bg-purple-500 px-3 py-1 text-sm text-white">
									{selectedImage.category}
								</span>
							</div>
						</div>
					</div>
				)}

				{/* 実績統計 */}
				<div className="mt-16 grid grid-cols-2 gap-8 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-600 p-8 text-white lg:grid-cols-4">
					<div className="text-center">
						<div className="text-3xl font-bold">500+</div>
						<div className="text-sm opacity-90">制作実績</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold">20+</div>
						<div className="text-sm opacity-90">AI技術活用</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold">98%</div>
						<div className="text-sm opacity-90">品質満足度</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold">24h</div>
						<div className="text-sm opacity-90">平均納期</div>
					</div>
				</div>
			</Container>
		</section>
	);
}