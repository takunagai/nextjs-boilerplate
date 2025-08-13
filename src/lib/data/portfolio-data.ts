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
	id: "web" | "design" | "photo" | "logo" | "shop" | "other";
	name: string;
	description: string;
};

// ポートフォリオカテゴリのデータ
export const portfolioCategories: PortfolioCategory[] = [
	{
		id: "web",
		name: "ウェブサイト制作",
		description: "WordPress、Wixなどを活用したウェブサイト制作実績",
	},
	{
		id: "design",
		name: "デザイン",
		description: "Webデザイン、ロゴデザインなどの制作実績",
	},
	{
		id: "photo",
		name: "写真撮影",
		description: "商品写真、サービス写真などの撮影実績",
	},
	{
		id: "logo",
		name: "ロゴ制作",
		description: "企業・サービスのロゴデザイン制作実績",
	},
	{
		id: "shop",
		name: "ECサイト構築",
		description: "オンラインショップの構築実績",
	},
	{
		id: "other",
		name: "その他",
		description: "コピー作成、データ移行などの実績",
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
		category: "design",
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
