import {
	FaBolt,
	FaCrown,
	FaDesktop,
	FaShield,
	FaStar,
	FaVideo,
} from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { PricingFeature } from "./types";

export interface ConsultingPricingPlan {
	id: string;
	service: string;
	content: string;
	normalPrice: string;
	specialPrice: string;
	discount?: string;
	description: string;
	features: string[];
	highlight: boolean;
	icon: IconType;
	iconColor: string;
}

export const consultingPricingPlans: ConsultingPricingPlan[] = [
	{
		id: "spot",
		service: "スポット相談",
		content: "1時間",
		normalPrice: "11,000円",
		specialPrice: "5,500円",
		discount: "50%",
		description: "聞きたい内容をピンポイントで、もしくは漠然とした相談もOK！",
		features: [
			"質問への具体的な回答",
			"おすすめツールリスト",
			"次のステップの提案",
			"フォローアップ資料付き",
		],
		highlight: true,
		icon: FaBolt,
		iconColor: "text-blue-600",
	},
	{
		id: "consulting-pack",
		service: "定期コンサルティング",
		content: "3ヶ月パック",
		normalPrice: "132,000円",
		specialPrice: "66,000円",
		discount: "50%",
		description: "継続的なサポートで確実にスキルアップ",
		features: [
			"月2回の定期ミーティング（各60分）",
			"チャットでの質問サポート",
			"AI ツールの導入・運用支援",
			"業務効率化の継続的な改善",
		],
		highlight: false,
		icon: FaCrown,
		iconColor: "text-orange-600",
	},
	{
		id: "others",
		service: "講座・セミナー",
		content: "ご要望に応じて",
		normalPrice: "",
		specialPrice: "ご相談ください",
		description: "単発レクチャー、企業研修など柔軟に対応",
		features: [
			"ChatGPT/Claude/Gemini の使い方",
			"AI ライティング指南",
			"画像生成 AI レクチャー",
			"ワークフロー構築（n8n、Dify等）",
			"バイブコーディング入門",
		],
		highlight: false,
		icon: FaStar,
		iconColor: "text-purple-600",
	},
];

export const consultingFeatures: PricingFeature[] = [
	{
		icon: FaShield,
		title: "全額返金保証付き",
		description: "満足いただけなければ全額返金",
	},
	{
		icon: FaDesktop,
		title: "オンライン（Zoom）対応",
		description: "どこからでも受講可能",
	},
	{
		icon: FaVideo,
		title: "録画 OK（復習用）",
		description: "後から何度でも復習できます",
	},
];
