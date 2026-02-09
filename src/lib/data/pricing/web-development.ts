import { FaCreditCard, FaShield } from "react-icons/fa6";
import type { PricingFeature } from "./types";

export interface WebDevPricingPlan {
	id: string;
	name: string;
	description: string;
	normalCompany: string;
	ourNormal: string;
	specialPrice: string;
	highlight: boolean;
}

export const webDevPricingPlans: WebDevPricingPlan[] = [
	{
		id: "light",
		name: "お手軽プラン",
		description: "WordPressサイト（5ページ）\n更新しやすい基本サイト",
		normalCompany: "60万円〜",
		ourNormal: "30万円〜",
		specialPrice: "18万円〜",
		highlight: false,
	},
	{
		id: "standard",
		name: "しっかりプラン",
		description: "オリジナルデザイン\nお客様だけのサイト",
		normalCompany: "100万円〜",
		ourNormal: "50万円〜",
		specialPrice: "30万円〜",
		highlight: true,
	},
	{
		id: "premium",
		name: "おまかせプラン",
		description: "こだわり抜いたサイト\n3ヶ月サポート込み",
		normalCompany: "150万円〜",
		ourNormal: "80万円〜",
		specialPrice: "50万円〜",
		highlight: false,
	},
	{
		id: "additional",
		name: "ちょい足し",
		description: "ページだけ追加したい時に",
		normalCompany: "5万円〜",
		ourNormal: "3万円〜",
		specialPrice: "2万円〜",
		highlight: false,
	},
];

export const webDevPricingFeatures: PricingFeature[] = [
	{
		icon: FaShield,
		title: "安心の返金保証",
		description: "満足いただけなければ、遠慮なくお申し出ください",
	},
	{
		icon: FaCreditCard,
		title: "お支払いも相談OK",
		description: "分割払いなど、お気軽にご相談ください",
	},
];
