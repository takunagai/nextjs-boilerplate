"use client";

import { Container } from "@/components/ui/container";
import type { GalleryItem } from "@/components/ui/gallery";
import { Gallery } from "@/components/ui/gallery";

export function GallerySection() {
	return (
		<section className="py-16 md:py-24 w-full bg-slate-50 dark:bg-slate-900">
			<Container size="2xl" paddingY="xl" paddingX="lg">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						フォトギャラリー
					</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						厳選された高品質な写真コレクションをご覧ください
					</p>
				</div>

				{/* ギャラリーコンポーネントの実装 */}
				<Gallery
					items={galleryItems}
					layout="grid"
					columns="3"
					gap="lg"
					aspectRatio="landscape"
					shadow="md"
					hoverEffect="fadeIn"
					captionPosition="overlay"
					captionStyle="gradient"
					lightbox={true}
				/>

				{/* 2つ目のギャラリーレイアウト例（正方形、マスク効果） */}
				<h3 className="text-2xl font-semibold mt-20 mb-6 text-center">
					スクエアレイアウト
				</h3>
				<Gallery
					items={squareGalleryItems}
					layout="grid"
					columns="4"
					gap="md"
					aspectRatio="square"
					rounded="lg"
					hoverEffect="zoom"
					captionPosition="overlay"
					captionStyle="solid"
					shadow="lg"
					lightbox={true}
				/>
			</Container>
		</section>
	);
}

// ギャラリー用のサンプルデータ
export const galleryItems: GalleryItem[] = [
	{
		id: 1,
		src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "山の風景",
		title: "山々の景色",
		description: "雄大な山々と朝もやの美しい風景",
		width: 800,
		height: 533,
	},
	{
		id: 2,
		src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "湖の風景",
		title: "湖の静けさ",
		description: "山に囲まれた静かな湖の美しい風景",
		width: 800,
		height: 533,
	},
	{
		id: 3,
		src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "夕焼けの風景",
		title: "夕焼けの空",
		description: "地平線に沈む太陽と美しいオレンジ色の空",
		width: 800,
		height: 533,
	},
	{
		id: 4,
		src: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "森の風景",
		title: "緑豊かな森",
		description: "太陽の光が差し込む神秘的な森の風景",
		width: 800,
		height: 533,
	},
	{
		id: 5,
		src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "森の中の光",
		title: "木漏れ日",
		description: "森の中に差し込む美しい光の筋",
		width: 800,
		height: 533,
	},
	{
		id: 6,
		src: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "湖と山の風景",
		title: "山の湖",
		description: "山に囲まれた穏やかな湖の朝の風景",
		width: 800,
		height: 533,
	},
];

// 都市風景のギャラリーアイテム
export const cityGalleryItems: GalleryItem[] = [
	{
		id: "city1",
		src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "大都市の風景",
		title: "都市の夜景",
		description: "夜の高層ビル群と明かりの美しい景色",
		width: 800,
		height: 533,
	},
	{
		id: "city2",
		src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "都市の夜景",
		title: "光り輝く都市",
		description: "夜の街灯と建物の光が作り出す都市の景観",
		width: 800,
		height: 533,
	},
	{
		id: "city3",
		src: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "東京の風景",
		title: "東京タワー",
		description: "夜の東京タワーと周辺の都市景観",
		width: 800,
		height: 533,
	},
	{
		id: "city4",
		src: "https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "ニューヨークの風景",
		title: "マンハッタン",
		description: "マンハッタンの高層ビル群と橋の風景",
		width: 800,
		height: 533,
	},
];

// ミニマルなギャラリーアイテム（タイトルや説明なし）
export const minimalGalleryItems: GalleryItem[] = [
	{
		id: "m1",
		src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "自然の風景1",
		width: 800,
		height: 533,
	},
	{
		id: "m2",
		src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "自然の風景2",
		width: 800,
		height: 533,
	},
	{
		id: "m3",
		src: "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "自然の風景3",
		width: 800,
		height: 533,
	},
	{
		id: "m4",
		src: "https://images.unsplash.com/photo-1470770903148-634bb755eb58?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "自然の風景4",
		width: 800,
		height: 533,
	},
	{
		id: "m5",
		src: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "自然の風景5",
		width: 800,
		height: 533,
	},
	{
		id: "m6",
		src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&w=800&h=533&q=80",
		alt: "自然の風景6",
		width: 800,
		height: 533,
	},
];

// 正方形の画像を使用したギャラリーアイテム
export const squareGalleryItems: GalleryItem[] = [
	{
		id: "sq1",
		src: "https://images.unsplash.com/photo-1682687982501-1e58ab814714?ixlib=rb-4.0.3&w=800&h=800&q=80&fit=crop",
		alt: "正方形の都市風景",
		title: "未来都市",
		description: "近未来的な高層ビル群と光る街路の夜景",
		width: 800,
		height: 800,
	},
	{
		id: "sq2",
		src: "https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?ixlib=rb-4.0.3&w=800&h=800&q=80&fit=crop",
		alt: "正方形の都市風景",
		title: "都市の夜景",
		description: "高層ビルが立ち並ぶ都市の夜景",
		width: 800,
		height: 800,
	},
	{
		id: "sq3",
		src: "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?ixlib=rb-4.0.3&w=800&h=800&q=80&fit=crop",
		alt: "正方形の風景3",
		title: "山の頂上",
		description: "山頂から見る雲海の美しい景色",
		width: 800,
		height: 800,
	},
	{
		id: "sq4",
		src: "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixlib=rb-4.0.3&w=800&h=800&q=80&fit=crop",
		alt: "正方形の風景4",
		title: "小麦畑",
		description: "広大な小麦畑と青空の風景",
		width: 800,
		height: 800,
	},
	{
		id: "sq5",
		src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&w=800&h=800&q=80&fit=crop",
		alt: "正方形の都市風景5",
		title: "都市の日の出",
		description: "朝日に照らされる高層ビル群の壮大な景色",
		width: 800,
		height: 800,
	},
	{
		id: "sq7",
		src: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?ixlib=rb-4.0.3&w=800&h=800&q=80&fit=crop",
		alt: "正方形の風景7",
		title: "海岸線",
		description: "青い海と白い砂浜が織りなす美しい海岸線",
		width: 800,
		height: 800,
	},
];
