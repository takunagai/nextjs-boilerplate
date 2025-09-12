import { cva, type VariantProps } from "class-variance-authority";

/**
 * 吹き出し(Speech Bubble)コンポーネントのバリアント設定
 * レスポンシブデザインとアクセシビリティに対応
 */
export const speechBubbleVariants = cva("flex gap-3 items-start", {
	variants: {
		direction: {
			left: "flex-row",
			right: "flex-row-reverse",
		},
		size: {
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
		},
		spacing: {
			tight: "gap-2",
			normal: "gap-3",
			loose: "gap-4 sm:gap-6",
		},
	},
	compoundVariants: [
		// サイズとスペーシングの最適化された組み合わせ
		{
			size: "sm",
			spacing: "tight",
			class: "gap-1.5 sm:gap-2",
		},
		{
			size: "lg",
			spacing: "loose",
			class: "gap-5 sm:gap-8 md:gap-10",
		},
		// 右側配置時の追加のマージン調整
		{
			direction: "right",
			spacing: "normal",
			class: "justify-end",
		},
		{
			direction: "right",
			spacing: "loose",
			class: "justify-end pr-2",
		},
	],
	defaultVariants: {
		direction: "left",
		size: "md",
		spacing: "normal",
	},
});

/**
 * 吹き出しバブル部分のスタイルバリアント
 */
export const bubbleVariants = cva(
	"relative bg-white border border-gray-200 rounded-2xl shadow-sm px-4 py-3 max-w-md",
	{
		variants: {
			theme: {
				default: "bg-white border-gray-200 text-gray-900",
				primary: "bg-blue-50 border-blue-200 text-blue-900",
				secondary: "bg-gray-50 border-gray-300 text-gray-800",
			},
			size: {
				sm: "px-3 py-2 text-sm rounded-xl max-w-xs",
				md: "px-4 py-3 text-base rounded-2xl max-w-md",
				lg: "px-5 py-4 text-lg rounded-2xl max-w-lg",
			},
		},
		compoundVariants: [
			// テーマとサイズの最適化された組み合わせ
			{
				theme: "primary",
				size: "sm",
				class: "bg-blue-25 border-blue-100 shadow-blue-100/20",
			},
			{
				theme: "primary",
				size: "lg",
				class: "bg-blue-75 border-blue-300 shadow-blue-200/30 shadow-lg",
			},
			{
				theme: "secondary",
				size: "sm",
				class: "bg-gray-25 border-gray-100 shadow-gray-100/10",
			},
			{
				theme: "secondary",
				size: "lg",
				class: "bg-gray-75 border-gray-400 shadow-gray-200/20",
			},
		],
		defaultVariants: {
			theme: "default",
			size: "md",
		},
	},
);

/**
 * アバター画像のスタイルバリアント
 */
export const avatarVariants = cva(
	"rounded-full border border-gray-200 bg-gray-100 object-cover",
	{
		variants: {
			size: {
				sm: "w-8 h-8",
				md: "w-12 h-12",
				lg: "w-16 h-16",
			},
		},
		defaultVariants: {
			size: "md",
		},
	},
);

// 型定義のエクスポート
export type SpeechBubbleVariantProps = VariantProps<typeof speechBubbleVariants>;
export type BubbleVariantProps = VariantProps<typeof bubbleVariants>;
export type AvatarVariantProps = VariantProps<typeof avatarVariants>;

// デフォルト設定
export const DEFAULT_AVATAR = {
	src: "/images/avatars/default-avatar.jpg",
	width: 48,
	height: 48,
	alt: "デフォルトアバター",
} as const;

// アバター設定の型
export type AvatarConfig = {
	src: string;
	width: number;
	height: number;
	alt: string;
};