import { FaBriefcase, FaCode, FaLightbulb } from "react-icons/fa6";
import type { IconType } from "react-icons";

/** プロフィールバッジ */
export const profileBadges = [
	"15年のウェブ制作経験",
	"AI活用コンサルティング",
	"クリエイティブ支援",
	"ワンストップ対応",
] as const;

/** 強み */
export interface Strength {
	title: string;
	items: string[];
}

export const strengths: Strength[] = [
	{
		title: "1. 総合的な制作スキル",
		items: [
			"企画から運用まで、ワンストップで対応",
			"デザインもコーディングも分かるから、話が早い",
			"15年の経験で培った「勘所」",
		],
	},
	{
		title: "2. AI ツールの実践的な知識",
		items: [
			"ChatGPT、Claude、Midjourney など主要ツールを日常使用",
			"最新情報を常にキャッチアップ",
			"「使える AI 活用法」を熟知",
		],
	},
	{
		title: "3. 翻訳者としてのコミュニケーション力",
		items: [
			"難しい技術用語を、分かりやすい言葉に",
			"お客様の「なんとなく」を具体的な形に",
			"IT が苦手な方にも安心してもらえる説明",
		],
	},
	{
		title: "4. 柔軟な対応力",
		items: [
			"予算に合わせた最適なプラン提案",
			"スピード重視から品質重視まで、ニーズに対応",
			"「できません」より「こうしたらできます」",
		],
	},
];

/** スキルカテゴリ */
export interface SkillCategory {
	title: string;
	skills: string[];
}

export const skillCategories: SkillCategory[] = [
	{
		title: "ウェブ制作・ウェブ開発",
		skills: [
			"HTML / CSS / JavaScript",
			"WordPress",
			"Next.js",
			"Figma",
			"Git/GitHub",
			"Windsurf",
		],
	},
	{
		title: "AI ツール",
		skills: [
			"ChatGPT",
			"Claude Code",
			"Nano Banana",
			"Stable Diffusion",
			"Suno AI",
			"Vidu",
		],
	},
	{
		title: "その他",
		skills: ["Adobe Creative Cloud", "SEO / アクセス解析", "プロジェクト管理"],
	},
];

/** タイムライン項目 */
export interface TimelineItemData {
	variant: "primary" | "success";
	icon: IconType;
	title: string;
	/** TODO: 本番環境で正しい年に更新してください */
	date: string;
	items: string[];
}

export const timelineItems: TimelineItemData[] = [
	{
		variant: "primary",
		icon: FaBriefcase,
		title: "印刷営業、グラフィックデザイナーの経験",
		date: "〜0000年", // TODO: 要更新
		items: [
			"食品パッケージ(軟包材)の印刷営業を担当",
			"大手デザイン会社で有名通販カタログの制作を担当",
		],
	},
	{
		variant: "primary",
		icon: FaBriefcase,
		title: "ウェブデザイナー兼 ECショップ運営の経験",
		date: "〜0000年", // TODO: 要更新
		items: [
			"寝具の卸会社で ECショップの店長を担当",
			"ECサイトの立ち上げ、商品撮影、コピー作成、バックエンド業務などを経験",
			"繁盛期は月商700万円くらい",
		],
	},
	{
		variant: "primary",
		icon: FaCode,
		title: "フリーランスのウェブデザイナー",
		date: "〜2009年",
		items: [
			"小中規模のウェブサイト(WordPressメイン)の制作を請負",
			"涼感寝具のECサイトを期間限定で運営",
			"React/Next.js を学び、Jamstack サイトを制作",
		],
	},
	{
		variant: "success",
		icon: FaLightbulb,
		title: "AI の導入",
		date: "〜0000年", // TODO: 要更新
		items: [
			"ChatGPT(gpt-3)の登場に衝撃を受け、AI関連情報を追い続ける",
			"様々なジャンルの AIツールを試用、効率的な使い方などを研究",
			"コーディングを始めとする様々な作業にAIエージェントを本格的に活用",
		],
	},
];

/** 大切にしていること */
export interface Value {
	title: string;
	highlight: string;
	items: string[];
}

export const values: Value[] = [
	{
		title: "お客様との関係",
		highlight: "対等なパートナーとして",
		items: [
			"一方的な提案ではなく、一緒に考える",
			"お客様の強みを引き出すサポート",
		],
	},
	{
		title: "仕事への姿勢",
		highlight: "誠実さ",
		items: ["できることとできないことを正直に", "納期と品質の約束は必ず守る"],
	},
	{
		title: "AI との向き合い方",
		highlight: "道具として使いこなす",
		items: ["AI に振り回されない", "あくまで人間が主役"],
	},
];
