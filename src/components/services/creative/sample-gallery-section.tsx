"use client";

import { useState } from "react";
import Image from "next/image";
import {
	FaPenToSquare,
	FaImage,
	FaVideo,
	FaMusic,
	FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";

interface SampleItem {
	id: string;
	title: string;
	description: string;
	category: string;
	image?: string;
	type: "image" | "text" | "video" | "audio";
}

const sampleCategories = [
	{ id: "writing", name: "ライティング", icon: FaPenToSquare },
	{ id: "image", name: "画像生成", icon: FaImage },
	{ id: "video", name: "動画生成", icon: FaVideo },
	{ id: "sound", name: "サウンド", icon: FaMusic },
];

const sampleItems: SampleItem[] = [
	// ライティングサンプル
	{
		id: "blog-1",
		title: "SEO記事サンプル",
		description: "「AI活用術」をテーマにした2,000文字のSEO記事",
		category: "writing",
		type: "text",
	},
	{
		id: "sns-1",
		title: "Instagram投稿文",
		description: "エンゲージメント率30%向上を実現した投稿文セット",
		category: "writing",
		type: "text",
	},
	{
		id: "lp-1",
		title: "LP コピー",
		description: "コンバージョン率2.5倍アップしたランディングページ文章",
		category: "writing",
		type: "text",
	},
	// 画像生成サンプル
	{
		id: "image-1",
		title: "企業ロゴデザイン",
		description: "IT企業向けモダンロゴ（3案提案）",
		category: "image",
		type: "image",
		image: "https://via.placeholder.com/400x300/3B82F6/white?text=Logo+Design",
	},
	{
		id: "image-2",
		title: "SNS用画像",
		description: "Instagram投稿用画像セット（10枚）",
		category: "image",
		type: "image",
		image: "https://via.placeholder.com/400x300/F59E0B/white?text=SNS+Images",
	},
	{
		id: "image-3",
		title: "ブログヘッダー画像",
		description: "テクノロジー系ブログ用のヘッダー画像",
		category: "image",
		type: "image",
		image: "https://via.placeholder.com/400x300/8B5CF6/white?text=Blog+Header",
	},
	// 動画生成サンプル
	{
		id: "video-1",
		title: "商品紹介動画",
		description: "30秒のショート動画（TikTok/Reels対応）",
		category: "video",
		type: "video",
		image:
			"https://via.placeholder.com/400x300/10B981/white?text=Product+Video",
	},
	{
		id: "video-2",
		title: "企業PR動画",
		description: "60秒の企業紹介動画（アニメーション込み）",
		category: "video",
		type: "video",
		image: "https://via.placeholder.com/400x300/EF4444/white?text=PR+Video",
	},
	// サウンドサンプル
	{
		id: "sound-1",
		title: "店舗BGM",
		description: "カフェ向けのリラックス系BGM（3分）",
		category: "sound",
		type: "audio",
	},
	{
		id: "sound-2",
		title: "CM ナレーション",
		description: "30秒CM用のナレーション音声",
		category: "sound",
		type: "audio",
	},
];

export function CreativeSampleGallerySection() {
	const [activeCategory, setActiveCategory] = useState("writing");

	const filteredSamples = sampleItems.filter(
		(item) => item.category === activeCategory,
	);

	return (
		<section className="w-full py-16 md:py-24 bg-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-6">
						作品サンプルギャラリー
					</Heading>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						実際に制作した作品の一部をご紹介します。すべてAI×人の感性で仕上げた高品質な作品です。
					</p>
				</div>

				{/* カテゴリータブ */}
				<div className="flex flex-wrap justify-center gap-4 mb-8">
					{sampleCategories.map((category) => {
						const IconComponent = category.icon;
						return (
							<Button
								key={category.id}
								variant={activeCategory === category.id ? "default" : "outline"}
								size="lg"
								onClick={() => setActiveCategory(category.id)}
								className="flex items-center gap-2 px-6 py-3"
							>
								<IconComponent className="w-5 h-5" />
								{category.name}
							</Button>
						);
					})}
				</div>

				{/* サンプル表示 */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
					{filteredSamples.map((sample) => (
						<Card
							key={sample.id}
							className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
						>
							{sample.image && (
								<div className="relative w-full h-48 overflow-hidden rounded-t-lg">
									<Image
										src={sample.image}
										alt={sample.title}
										fill
										className="object-cover"
									/>
								</div>
							)}
							{!sample.image && sample.type === "text" && (
								<div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center rounded-t-lg">
									<div className="text-center">
										<FaPenToSquare className="w-12 h-12 text-blue-600 mx-auto mb-2" />
										<p className="text-sm text-muted-foreground">
											テキストコンテンツ
										</p>
									</div>
								</div>
							)}
							{!sample.image && sample.type === "audio" && (
								<div className="w-full h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center rounded-t-lg">
									<div className="text-center">
										<FaMusic className="w-12 h-12 text-orange-600 mx-auto mb-2" />
										<p className="text-sm text-muted-foreground">
											音声コンテンツ
										</p>
									</div>
								</div>
							)}
							<CardHeader>
								<CardTitle className="text-lg">{sample.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-muted-foreground text-sm leading-relaxed">
									{sample.description}
								</p>
							</CardContent>
						</Card>
					))}
				</div>

				{/* 全作品を見るCTA */}
				<div className="text-center">
					<Card className="inline-block p-8 bg-gradient-to-r from-blue-50 to-orange-50 border-2 border-primary/20">
						<CardContent className="p-0">
							<Heading as="h3" className="text-xl md:text-2xl mb-4">
								さらに多くの作品をご覧いただけます
							</Heading>
							<p className="text-muted-foreground mb-6">
								ポートフォリオサイトで、より詳細な作品例と制作プロセスをご紹介しています
							</p>
							<Button size="lg" className="text-base px-8 py-3">
								完全版ポートフォリオを見る
								<FaArrowUpRightFromSquare className="w-4 h-4 ml-2" />
							</Button>
						</CardContent>
					</Card>
				</div>
			</Container>
		</section>
	);
}
