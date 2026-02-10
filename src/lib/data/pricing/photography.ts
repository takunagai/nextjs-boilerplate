export interface PhotographyPricingInfo {
	base: number;
	hourly: number;
	includes: string[];
}

export interface PhotographyExample {
	title: string;
	duration: string;
	photos: string;
	price: string;
	description: string;
}

export const photographyPricingInfo: PhotographyPricingInfo = {
	base: 5500,
	hourly: 5500,
	includes: [
		"撮影データ全て納品",
		"基本的な画像補正込み",
		"著作権譲渡",
		"商用利用可能",
		"RAWデータ提供可",
	],
};

export const photographyExamples: PhotographyExample[] = [
	{
		title: "プロフィール写真撮影",
		duration: "1時間",
		photos: "50枚程度",
		price: "11,000円",
		description: "ビジネス用プロフィール写真の撮影",
	},
	{
		title: "商品撮影（10点）",
		duration: "2時間",
		photos: "100枚程度",
		price: "16,500円",
		description: "ECサイト用の商品写真撮影",
	},
	{
		title: "料理撮影（20品）",
		duration: "3時間",
		photos: "150枚程度",
		price: "22,000円",
		description: "メニュー用の料理写真撮影",
	},
	{
		title: "店舗撮影",
		duration: "2時間",
		photos: "80枚程度",
		price: "16,500円",
		description: "店舗の内装・外観撮影",
	},
];
