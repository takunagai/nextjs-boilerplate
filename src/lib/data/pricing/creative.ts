export interface CreativePricingExample {
	service: string;
	description: string;
	priceRange: string;
}

export const creativePricingExamples: CreativePricingExample[] = [
	{
		service: "ロゴデザイン",
		description: "AI生成 + 手作業仕上げ、3案提案、修正対応込み",
		priceRange: "30,000円～",
	},
	{
		service: "バナー・チラシデザイン",
		description: "用途に合わせたデザイン、サイズ展開対応",
		priceRange: "15,000円～",
	},
	{
		service: "イラスト・画像生成",
		description: "Midjourney・DALL-E活用、商用利用可能品質",
		priceRange: "8,000円～",
	},
	{
		service: "写真補正・加工",
		description: "背景除去、色調補正、レタッチ作業",
		priceRange: "5,000円～",
	},
	{
		service: "SNS用画像セット",
		description: "投稿用画像10枚、統一感のあるデザイン",
		priceRange: "25,000円～",
	},
	{
		service: "動画編集・制作",
		description: "ショート動画、プロモーション動画等",
		priceRange: "20,000円～",
	},
];
