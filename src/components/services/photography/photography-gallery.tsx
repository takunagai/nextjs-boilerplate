"use client";

import { Container } from "@/components/ui/container";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaX, FaExpand } from "react-icons/fa6";

// サンプル画像データ（実際の画像URLに置き換えてください）
const galleryImages = [
	{
		id: 1,
		src: "/api/placeholder/400/600",
		title: "ビジネスポートレート",
		category: "人物",
		height: "tall",
	},
	{
		id: 2,
		src: "/api/placeholder/400/300",
		title: "商品撮影 - アクセサリー",
		category: "商品",
		height: "short",
	},
	{
		id: 3,
		src: "/api/placeholder/400/400",
		title: "料理撮影 - 和食",
		category: "料理",
		height: "medium",
	},
	{
		id: 4,
		src: "/api/placeholder/400/500",
		title: "店舗内装",
		category: "店舗",
		height: "medium-tall",
	},
	{
		id: 5,
		src: "/api/placeholder/400/300",
		title: "スタッフ集合写真",
		category: "人物",
		height: "short",
	},
	{
		id: 6,
		src: "/api/placeholder/400/600",
		title: "商品撮影 - コスメ",
		category: "商品",
		height: "tall",
	},
	{
		id: 7,
		src: "/api/placeholder/400/400",
		title: "料理撮影 - デザート",
		category: "料理",
		height: "medium",
	},
	{
		id: 8,
		src: "/api/placeholder/400/500",
		title: "カフェ外観",
		category: "店舗",
		height: "medium-tall",
	},
	{
		id: 9,
		src: "/api/placeholder/400/400",
		title: "プロフィール写真",
		category: "人物",
		height: "medium",
	},
	{
		id: 10,
		src: "/api/placeholder/400/300",
		title: "商品撮影 - ファッション",
		category: "商品",
		height: "short",
	},
	{
		id: 11,
		src: "/api/placeholder/400/600",
		title: "料理撮影 - イタリアン",
		category: "料理",
		height: "tall",
	},
	{
		id: 12,
		src: "/api/placeholder/400/400",
		title: "美容室内装",
		category: "店舗",
		height: "medium",
	},
	{
		id: 13,
		src: "/api/placeholder/400/500",
		title: "アーティスト写真",
		category: "人物",
		height: "medium-tall",
	},
	{
		id: 14,
		src: "/api/placeholder/400/300",
		title: "商品撮影 - 雑貨",
		category: "商品",
		height: "short",
	},
	{
		id: 15,
		src: "/api/placeholder/400/400",
		title: "料理撮影 - カフェメニュー",
		category: "料理",
		height: "medium",
	},
	{
		id: 16,
		src: "/api/placeholder/400/600",
		title: "ショップエントランス",
		category: "店舗",
		height: "tall",
	},
	{
		id: 17,
		src: "/api/placeholder/400/400",
		title: "宣材写真",
		category: "人物",
		height: "medium",
	},
	{
		id: 18,
		src: "/api/placeholder/400/500",
		title: "商品撮影 - ジュエリー",
		category: "商品",
		height: "medium-tall",
	},
	{
		id: 19,
		src: "/api/placeholder/400/300",
		title: "料理撮影 - 和菓子",
		category: "料理",
		height: "short",
	},
	{
		id: 20,
		src: "/api/placeholder/400/400",
		title: "オフィス空間",
		category: "店舗",
		height: "medium",
	},
];

const categories = ["すべて", "人物", "商品", "料理", "店舗"];

export function PhotographyGallery() {
	const [selectedCategory, setSelectedCategory] = useState("すべて");
	const [selectedImage, setSelectedImage] = useState<
		(typeof galleryImages)[0] | null
	>(null);

	const filteredImages =
		selectedCategory === "すべて"
			? galleryImages
			: galleryImages.filter((img) => img.category === selectedCategory);

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
						作品ギャラリー
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						これまでに撮影した作品の一部をご紹介します
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
									? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
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
									<p className="text-sm font-medium text-white">
										{image.title}
									</p>
									<p className="text-xs text-white/80">{image.category}</p>
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
									{selectedImage.category}
								</p>
							</div>
						</div>
					</div>
				)}
			</Container>
		</section>
	);
}
