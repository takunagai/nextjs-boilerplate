import type { ReactNode } from "react";
import {
	FaCode,
	FaPaintbrush,
	FaCamera,
	FaPalette,
	FaCartShopping,
	FaRobot,
	FaGears,
	FaRocket,
	FaWrench,
} from "react-icons/fa6";

// ポートフォリオのダミーデータ
export type PortfolioItem = {
	id: string;
	title: string;
	description?: string;
	category: "web" | "design" | "photo" | "logo" | "shop" | "other";
	image: string;
	imageAlt?: string;
	technologies?: string[];
	link?: {
		href: string;
		text: string;
	};
	clientName?: string;
	year?: number;
	servicesTags?: string[];
	websiteUrl?: string;
};

export type PortfolioCategory = {
	id:
		| "web"
		| "design"
		| "photo"
		| "logo"
		| "shop"
		| "other"
		| "ai-image"
		| "instant-site"
		| "frontend-repair";
	name: string;
	description: string;
	serviceUrl?: string;
	icon?: ReactNode;
};

// フィルタリング用の新しいカテゴリ定義（4つ）
export const portfolioFilterCategories = [
	{
		id: "website-app" as const,
		name: "ウェブサイト/アプリ",
		description: "WordPress、WixやECサイトの制作実績",
		originalCategories: ["web", "shop"] as const,
	},
	{
		id: "photography" as const,
		name: "写真撮影",
		description: "商品写真、サービス写真などの撮影実績",
		originalCategories: ["photo"] as const,
	},
	{
		id: "ai-image" as const,
		name: "AI画像生成",
		description: "AI技術を活用した画像生成・編集サービス",
		originalCategories: ["ai-image"] as const,
	},
	{
		id: "other" as const,
		name: "その他",
		description: "デザイン、ロゴ制作、コピー作成など",
		originalCategories: ["design", "logo", "other"] as const,
	},
] as const;

export type PortfolioFilterCategory =
	(typeof portfolioFilterCategories)[number]["id"];

// 旧カテゴリ定義（互換性のため残存）
export const portfolioCategories: PortfolioCategory[] = [
	// ウェブ関連サービス
	{
		id: "web",
		name: "ウェブサイト制作",
		description: "WordPress、Wixなどを活用したウェブサイト制作実績",
		serviceUrl: "/services/web-development",
		icon: <FaCode className="w-5 h-5 text-blue-600" />,
	},
	{
		id: "shop",
		name: "ECサイト構築",
		description: "オンラインショップの構築実績",
		// serviceUrl削除: ウェブ制作サービスの一部のため独立ページなし
		icon: <FaCartShopping className="w-5 h-5 text-orange-600" />,
	},
	{
		id: "instant-site",
		name: "一夜城 - インスタントHP制作",
		description: "55,000円・当日公開。AI×プロで超高速制作",
		serviceUrl: "/services/web-development/instant-site",
		icon: <FaRocket className="w-5 h-5 text-orange-600" />,
	},
	{
		id: "frontend-repair",
		name: "フロントエンドリペア",
		description: "AIで作ったサイトをプロが最終調整。安心の品質で公開",
		serviceUrl: "/services/web-development/frontend-repair",
		icon: <FaWrench className="w-5 h-5 text-orange-600" />,
	},
	// クリエイティブ関連サービス
	{
		id: "design",
		name: "デザイン",
		description: "Webデザイン、ロゴデザインなどの制作実績",
		serviceUrl: "/services/creative",
		icon: <FaPaintbrush className="w-5 h-5 text-purple-600" />,
	},
	{
		id: "logo",
		name: "ロゴ制作",
		description: "企業・サービスのロゴデザイン制作実績",
		// serviceUrl削除: クリエイティブサービスの一部のため独立ページなし
		icon: <FaPalette className="w-5 h-5 text-pink-600" />,
	},
	{
		id: "photo",
		name: "写真撮影",
		description: "商品写真、サービス写真などの撮影実績",
		serviceUrl: "/services/photography",
		icon: <FaCamera className="w-5 h-5 text-green-600" />,
	},
	{
		id: "ai-image",
		name: "AI画像生成・画像補正",
		description: "AI技術を活用した画像生成・編集サービス",
		serviceUrl: "/services/ai-image-generation",
		icon: <FaRobot className="w-5 h-5 text-cyan-600" />,
	},
	// その他のサービス
	{
		id: "other",
		name: "その他",
		description: "コピー作成、データ移行などの実績",
		serviceUrl: "/services/ai-consulting-and-support",
		icon: <FaGears className="w-5 h-5 text-gray-600" />,
	},
];

// サービスタグからカテゴリーを判定する関数
function _getCategoryFromTags(
	tags: string[],
): "web" | "design" | "photo" | "logo" | "shop" | "other" {
	if (tags.includes("カラーミーショップ") || tags.includes("EC")) {
		return "shop";
	}
	if (tags.includes("ロゴ作成")) {
		return "logo";
	}
	if (tags.includes("写真撮影")) {
		return "photo";
	}
	if (tags.includes("WordPress") || tags.includes("Wix")) {
		return "web";
	}
	if (tags.includes("デザイン")) {
		return "design";
	}
	return "other";
}

// ポートフォリオアイテムのデータ（実際のWebサイトから取得）
export const portfolioItems: PortfolioItem[] = [
	{
		id: "ikigaisagashi",
		title: "一般社団法人 いきがいさがし",
		image: "/images/portfolio/ikigaisagashi.jpg",
		imageAlt: "一般社団法人 いきがいさがしのWebサイト",
		category: "web",
		clientName: "(社) いきがいさがし様",
		servicesTags: ["デザイン", "ロゴ作成", "WordPress", "コピー作成"],
		websiteUrl: "https://ikigai-sagashi.org/",
		link: {
			href: "/portfolio/ikigaisagashi",
			text: "詳細を見る →",
		},
	},
	{
		id: "starex",
		title: "Starex 車のシートコーティング",
		image: "/images/portfolio/starex.jpg",
		imageAlt: "Starex 車のシートコーティングのWebサイト",
		category: "web",
		clientName: "株式会社 and CLEA 様",
		servicesTags: ["デザイン", "WordPress", "写真撮影"],
		websiteUrl: "https://www.starex-solutions.jp/",
		link: {
			href: "/portfolio/starex",
			text: "詳細を見る →",
		},
	},
	{
		id: "wacca",
		title: "ブルーベリー農園 Wacca",
		image: "/images/portfolio/wacca.jpg",
		imageAlt: "ブルーベリー農園 WaccaのWebサイト",
		category: "web",
		clientName: "マノカルダ株式会社様",
		servicesTags: ["デザイン", "WordPress", "写真撮影"],
		websiteUrl: "https://blueberry-wacca.com/",
		link: {
			href: "/portfolio/wacca",
			text: "詳細を見る →",
		},
	},
	{
		id: "kingoma",
		title: "金ごま本舗 Online Shop",
		image: "/images/portfolio/kingoma.jpg",
		imageAlt: "金ごま本舗 Online ShopのECサイト",
		category: "shop",
		clientName: "金ごま本舗株式会社様",
		servicesTags: ["デザイン", "カラーミーショップ", "写真撮影"],
		websiteUrl: "https://kingoma.shop/",
		link: {
			href: "/portfolio/kingoma",
			text: "詳細を見る →",
		},
	},
	{
		id: "goodon-life",
		title: "地域工務店グートンライフ",
		image: "/images/portfolio/goodon-life.jpg",
		imageAlt: "地域工務店グートンライフのWebサイト",
		category: "web",
		clientName: "株式会社グートンライフ様",
		servicesTags: ["デザイン", "WordPress", "データ移行"],
		websiteUrl: "https://good-on.co.jp/",
		link: {
			href: "/portfolio/goodon-life",
			text: "詳細を見る →",
		},
	},
	{
		id: "alafarine",
		title: "パン教室 アラファリーヌ",
		image: "/images/portfolio/alafarine.jpg",
		imageAlt: "パン教室 アラファリーヌのWebサイト",
		category: "web",
		clientName: "アラファリーヌ様",
		servicesTags: ["デザイン", "WordPress"],
		websiteUrl: "https://alafarine.com/",
		link: {
			href: "/portfolio/alafarine",
			text: "詳細を見る →",
		},
	},
	{
		id: "anvil",
		title: "彫金教室 アンビル",
		image: "/images/portfolio/anvil.jpg",
		imageAlt: "彫金教室 アンビルのWebサイト",
		category: "web",
		clientName: "彫金教室 アンビル様",
		servicesTags: ["デザイン", "WordPress", "写真撮影"],
		websiteUrl: "https://takarazuka-anvil.com/",
		link: {
			href: "/portfolio/anvil",
			text: "詳細を見る →",
		},
	},
	{
		id: "dacapo",
		title: "車のお手入れ専門店 ダ・カーポ",
		image: "/images/portfolio/dacapo.jpg",
		imageAlt: "車のお手入れ専門店 ダ・カーポのWebサイト",
		category: "web",
		clientName: "リバーサル株式会社様",
		servicesTags: ["デザイン", "WordPress", "写真撮影"],
		websiteUrl: "https://dacapo-osaka.com/",
		link: {
			href: "/portfolio/dacapo",
			text: "詳細を見る →",
		},
	},
	{
		id: "knots-berry",
		title: "スフレ専門店 ナッツベリー",
		image: "/images/portfolio/knots-berry.jpg",
		imageAlt: "スフレ専門店 ナッツベリーのWebサイト",
		category: "web",
		clientName: "株式会社ナッツベリー様",
		servicesTags: ["デザイン", "写真撮影"],
		websiteUrl: "https://knotts-berry.com/",
		link: {
			href: "/portfolio/knots-berry",
			text: "詳細を見る →",
		},
	},
	{
		id: "harapeco-morimushi",
		title: "教室サロン ハラペコモリムシ",
		image: "/images/portfolio/harapeco-morimushi.jpg",
		imageAlt: "教室サロン ハラペコモリムシのWebサイト",
		category: "web",
		clientName: "教室サロン ハラペコモリムシ様",
		servicesTags: ["デザイン", "WordPress"],
		websiteUrl: "https://harapeco-morimushi.com/",
		link: {
			href: "/portfolio/harapeco-morimushi",
			text: "詳細を見る →",
		},
	},
	{
		id: "mimibridal",
		title: "結婚相談所 ミミブライダル",
		image: "/images/portfolio/mimibridal.jpg",
		imageAlt: "結婚相談所 ミミブライダルのWebサイト",
		category: "web",
		clientName: "結婚相談所 ミミブライダル様",
		servicesTags: ["デザイン", "Wix"],
		websiteUrl: "https://www.mimibridal-osaka.com/",
		link: {
			href: "/portfolio/mimibridal",
			text: "詳細を見る →",
		},
	},
	{
		id: "kanami",
		title: "かなみ社会保険労務士事務所",
		image: "/images/portfolio/kanami.jpg",
		imageAlt: "かなみ社会保険労務士事務所のWebサイト",
		category: "web",
		clientName: "かなみ社会保険労務士事務所様",
		servicesTags: ["デザイン", "WordPress"],
		websiteUrl: "https://kanami-office.com/",
		link: {
			href: "/portfolio/kanami",
			text: "詳細を見る →",
		},
	},
];

// サービスタグの一覧を取得する関数
export function getAllServiceTags(): string[] {
	const allTags: string[] = [];
	portfolioItems.forEach((item) => {
		if (item.servicesTags) {
			item.servicesTags.forEach((tag) => {
				if (!allTags.includes(tag)) {
					allTags.push(tag);
				}
			});
		}
	});
	return allTags;
}

// カテゴリーでフィルタリングする関数
export function getPortfolioItemsByCategory(
	category?: string,
): PortfolioItem[] {
	if (!category || category === "all") {
		return portfolioItems;
	}
	return portfolioItems.filter((item) => item.category === category);
}

// サービスタグでフィルタリングする関数
export function getPortfolioItemsByTag(tag?: string): PortfolioItem[] {
	if (!tag || tag === "all") {
		return portfolioItems;
	}
	return portfolioItems.filter((item) => item.servicesTags?.includes(tag));
}

// 新しいフィルタカテゴリでフィルタリングする関数
export function getPortfolioItemsByFilterCategory(
	filterCategory?: PortfolioFilterCategory | "all",
): PortfolioItem[] {
	if (!filterCategory || filterCategory === "all") {
		return portfolioItems;
	}

	const categoryConfig = portfolioFilterCategories.find(
		(cat) => cat.id === filterCategory,
	);

	if (!categoryConfig) {
		return portfolioItems;
	}

	return portfolioItems.filter((item) =>
		(categoryConfig.originalCategories as readonly string[]).includes(
			item.category,
		),
	);
}

// フィルタカテゴリからオリジナルカテゴリへの変換
export function getOriginalCategoriesFromFilter(
	filterCategory: PortfolioFilterCategory,
): readonly string[] {
	const categoryConfig = portfolioFilterCategories.find(
		(cat) => cat.id === filterCategory,
	);
	return categoryConfig?.originalCategories || [];
}

// オリジナルカテゴリからフィルタカテゴリへの変換
export function getFilterCategoryFromOriginal(
	originalCategory: string,
): PortfolioFilterCategory | null {
	const filterCategory = portfolioFilterCategories.find((cat) =>
		(cat.originalCategories as readonly string[]).includes(originalCategory),
	);
	return filterCategory?.id || null;
}
