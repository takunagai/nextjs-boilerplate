import { FaCheck, FaCrown, FaRocket } from "react-icons/fa6";
import type { IconType } from "react-icons";
import type { AdditionalService } from "./types";

export interface AIImagePricingPlan {
	name: string;
	icon: IconType;
	price: string;
	unit: string;
	description: string;
	features: string[];
	limitations: string[];
	color: string;
	popular: boolean;
}

export const aiImagePricingPlans: AIImagePricingPlan[] = [
	{
		name: "ベーシック",
		icon: FaCheck,
		price: "8,800",
		unit: "円/点",
		description: "シンプルな画像補正・生成に最適",
		features: [
			"基本的な画像補正",
			"簡単なAI画像生成",
			"1点あたり最大3回修正",
			"48時間以内納品",
			"商用利用可能",
			"著作権譲渡",
		],
		limitations: ["複雑な合成は追加料金", "高解像度は要相談"],
		color: "border-gray-200 dark:border-gray-700",
		popular: false,
	},
	{
		name: "スタンダード",
		icon: FaRocket,
		price: "15,400",
		unit: "円/点",
		description: "高品質な制作・編集をお求めの方に",
		features: [
			"高度な画像補正・合成",
			"プロ品質AI画像生成",
			"1点あたり最大5回修正",
			"24時間以内納品",
			"高解像度対応（4K）",
			"ベクター画像変換可",
			"商用利用可能",
			"著作権譲渡",
		],
		limitations: ["特殊要望は要相談"],
		color: "border-purple-200 dark:border-purple-500",
		popular: true,
	},
	{
		name: "プレミアム",
		icon: FaCrown,
		price: "要相談",
		unit: "",
		description: "大量制作・特殊要望に完全対応",
		features: [
			"完全カスタム制作",
			"大量制作（10点以上）",
			"特殊技術・要望対応",
			"無制限修正",
			"優先納品（12時間以内）",
			"専任担当者",
			"制作過程レポート",
			"長期契約割引",
		],
		limitations: [],
		color: "border-gold-200 dark:border-yellow-500",
		popular: false,
	},
];

export const aiImageAdditionalServices: AdditionalService[] = [
	{
		service: "アップスケール（2-4倍）",
		price: "2,200円",
		description: "既存画像の高解像度化",
	},
	{
		service: "背景除去・変更",
		price: "3,300円",
		description: "背景のクリーンアップ・差し替え",
	},
	{
		service: "バッチ処理（10点以上）",
		price: "20%割引",
		description: "同一作業の大量処理",
	},
	{
		service: "緊急対応（6時間以内）",
		price: "+50%",
		description: "通常より迅速な納品",
	},
];
