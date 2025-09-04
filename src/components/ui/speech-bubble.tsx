import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import type * as React from "react";
import { useId, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * 吹き出し(Speech Bubble)コンポーネントのバリアント設定
 * レスポンシブデザインとアクセシビリティに対応
 */
const speechBubbleVariants = cva("flex gap-3 items-start", {
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
const bubbleVariants = cva(
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
				class: "bg-gray-25 border-gray-200",
			},
			{
				theme: "secondary",
				size: "lg",
				class: "bg-gray-75 border-gray-400 shadow-lg",
			},
			// デフォルトテーマの高度なスタイリング
			{
				theme: "default",
				size: "lg",
				class: "shadow-lg border-gray-300 bg-gray-25",
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
const avatarVariants = cva("rounded-full object-cover flex-shrink-0", {
	variants: {
		size: {
			sm: "w-8 h-8 sm:w-10 sm:h-10",
			md: "w-10 h-10 sm:w-12 sm:h-12",
			lg: "w-12 h-12 sm:w-16 sm:h-16",
		},
	},
	compoundVariants: [
		// サイズに応じた影とリングの追加
		{
			size: "lg",
			class: "ring-2 ring-white shadow-md",
		},
		{
			size: "md",
			class: "ring-1 ring-white/50 shadow-sm",
		},
	],
	defaultVariants: {
		size: "md",
	},
});

/**
 * 吹き出しの尻尾（テール）のスタイル
 */
const tailVariants = cva("absolute top-4 w-3 h-3 rotate-45", {
	variants: {
		direction: {
			left: "-left-1.5 bg-white border-l border-b border-gray-200",
			right: "-right-1.5 bg-white border-r border-t border-gray-200",
		},
		theme: {
			default: "bg-white border-gray-200",
			primary: "bg-blue-50 border-blue-200",
			secondary: "bg-gray-50 border-gray-300",
		},
	},
	compoundVariants: [
		// 方向とテーマの組み合わせによる詳細なスタイリング
		{
			direction: "left",
			theme: "primary",
			class: "-left-1.5 bg-blue-50 border-l border-b border-blue-200",
		},
		{
			direction: "right",
			theme: "primary",
			class: "-right-1.5 bg-blue-50 border-r border-t border-blue-200",
		},
		{
			direction: "left",
			theme: "secondary",
			class: "-left-1.5 bg-gray-50 border-l border-b border-gray-300",
		},
		{
			direction: "right",
			theme: "secondary",
			class: "-right-1.5 bg-gray-50 border-r border-t border-gray-300",
		},
	],
	defaultVariants: {
		direction: "left",
		theme: "default",
	},
});

/**
 * バブルバリアントの型を抽出
 */
type BubbleVariantProps = VariantProps<typeof bubbleVariants>;

/**
 * SpeechBubbleコンポーネントのプロパティ
 */
export interface SpeechBubbleProps
	extends Omit<React.ComponentProps<"div">, "children">,
		VariantProps<typeof speechBubbleVariants>,
		BubbleVariantProps {
	/**
	 * 吹き出し内のテキストコンテンツ
	 */
	children: React.ReactNode;

	/**
	 * 人物の名前（アクセシビリティ用のalt属性に使用）
	 */
	name?: string;

	/**
	 * アバター画像のURL（未指定の場合はデフォルト画像を使用）
	 */
	avatarSrc?: string;

	/**
	 * アバター画像の幅（Next.js Image最適化用）
	 */
	avatarWidth?: number;

	/**
	 * アバター画像の高さ（Next.js Image最適化用）
	 */
	avatarHeight?: number;

	/**
	 * レスポンシブ対応の無効化
	 * @default false
	 */
	disableResponsive?: boolean;
}

/**
 * デフォルトのアバター画像設定
 */
const DEFAULT_AVATAR = {
	src: "/images/avatars/default-avatar.jpg",
	width: 48,
	height: 48,
	alt: "デフォルトアバター",
} as const;

/**
 * アバター設定の最適化とバリデーション
 */
function useAvatarConfig({
	avatarSrc,
	avatarWidth,
	avatarHeight,
	imageError,
}: {
	avatarSrc?: string;
	avatarWidth?: number;
	avatarHeight?: number;
	imageError: boolean;
}) {
	return {
		src: imageError ? DEFAULT_AVATAR.src : (avatarSrc || DEFAULT_AVATAR.src),
		width: Math.max(avatarWidth || DEFAULT_AVATAR.width, 16),
		height: Math.max(avatarHeight || DEFAULT_AVATAR.height, 16),
	};
}

/**
 * コンテンツとユーザー情報の検証
 */
function useContentValidation({
	children,
	name,
}: {
	children: React.ReactNode;
	name?: string;
}) {
	const hasValidContent = children != null && 
		(typeof children === 'string' ? children.trim().length > 0 : true);
	
	const safeName = name && name.trim() ? name.trim() : "ユーザー";

	return {
		hasValidContent,
		safeName,
	};
}

/**
 * 画像ハンドラー関数群
 */
function useImageHandlers(
	setImageError: (error: boolean) => void,
	setImageLoading: (loading: boolean) => void,
) {
	const handleImageError = () => {
		setImageError(true);
		setImageLoading(false);
	};

	const handleImageLoad = () => {
		setImageLoading(false);
		setImageError(false);
	};

	return {
		handleImageError,
		handleImageLoad,
	};
}

/**
 * アバター画像コンポーネント（分割されたサブコンポーネント）
 */
interface AvatarImageProps {
	avatarConfig: ReturnType<typeof useAvatarConfig>;
	contentConfig: ReturnType<typeof useContentValidation>;
	imageLoading: boolean;
	imageError: boolean;
	handleImageLoad: () => void;
	handleImageError: () => void;
	size?: "sm" | "md" | "lg";
	avatarSrc?: string;
}

function AvatarImage({
	avatarConfig,
	contentConfig,
	imageLoading,
	imageError,
	handleImageLoad,
	handleImageError,
	size = "md",
	avatarSrc,
}: AvatarImageProps) {
	return (
		<div className="relative">
			{/* 画像読み込み中のスケルトン */}
			{imageLoading && (
				<div
					className={cn(
						avatarVariants({ size }),
						"absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-full",
					)}
					aria-hidden="true"
				/>
			)}
			
			<Image
				src={avatarConfig.src}
				alt={`${contentConfig.safeName}のアバター`}
				width={avatarConfig.width}
				height={avatarConfig.height}
				className={cn(
					avatarVariants({ size }),
					imageLoading ? "opacity-0" : "opacity-100",
					"transition-opacity duration-300"
				)}
				priority={false}
				onLoad={handleImageLoad}
				onError={handleImageError}
				loading="lazy"
				placeholder="blur"
				blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
			/>
			
			{/* エラー時のフォールバック表示 */}
			{imageError && avatarConfig.src === DEFAULT_AVATAR.src && avatarSrc && avatarSrc !== DEFAULT_AVATAR.src && (
				<div 
					className={cn(
						avatarVariants({ size }),
						"absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 text-xs"
					)}
					aria-label="画像読み込み失敗"
				>
					?
				</div>
			)}
		</div>
	);
}

/**
 * バブルコンテンツコンポーネント（分割されたサブコンポーネント）
 */
interface BubbleContentProps {
	contentId: string;
	contentConfig: ReturnType<typeof useContentValidation>;
	children: React.ReactNode;
}

function BubbleContent({
	contentId,
	contentConfig,
	children,
}: BubbleContentProps) {
	return (
		<div id={contentId} className="relative z-10">
			{contentConfig.hasValidContent ? (
				children
			) : (
				<div className="text-gray-400 dark:text-gray-600 italic" role="alert">
					コンテンツが提供されていません
				</div>
			)}
		</div>
	);
}

/**
 * 吹き出し(Speech Bubble)コンポーネント
 *
 * 人物画像と吹き出しテキストを表示するレスポンシブ対応コンポーネント
 * RSC（React Server Component）として実装
 *
 * @example
 * ```tsx
 * <SpeechBubble name="田中さん" direction="left" theme="primary">
 *   こんにちは！お疲れ様です。
 * </SpeechBubble>
 * ```
 */
export function SpeechBubble({
	children,
	name = "ユーザー",
	avatarSrc,
	avatarWidth,
	avatarHeight,
	direction,
	size,
	spacing,
	theme = "default",
	disableResponsive = false,
	className,
	...props
}: SpeechBubbleProps) {
	const contentId = useId();
	const [imageError, setImageError] = useState(false);
	const [imageLoading, setImageLoading] = useState(true);

	// プロップス値の最適化とエラーハンドリング
	const avatarConfig = useAvatarConfig({
		avatarSrc,
		avatarWidth,
		avatarHeight,
		imageError,
	});

	// コンテンツとユーザー情報の検証
	const contentConfig = useContentValidation({ children, name });

	// 画像ハンドラーの初期化
	const { handleImageError, handleImageLoad } = useImageHandlers(
		setImageError,
		setImageLoading,
	);

	return (
		<div
			className={cn(
				speechBubbleVariants({ direction, size, spacing }),
				!disableResponsive && "max-w-full",
				className,
			)}
			role="group"
			aria-label={`${contentConfig.safeName}からのメッセージ`}
			{...props}
		>
			{/* アバター画像 */}
			<AvatarImage
				avatarConfig={avatarConfig}
				contentConfig={contentConfig}
				imageLoading={imageLoading}
				imageError={imageError}
				handleImageLoad={handleImageLoad}
				handleImageError={handleImageError}
				size={size}
				avatarSrc={avatarSrc}
			/>

			{/* 吹き出しバブル */}
			<div
				className={cn(
					bubbleVariants({ theme, size }),
					!disableResponsive && "w-full sm:w-auto",
				)}
				role="dialog"
				aria-labelledby={contentId}
			>
				{/* 吹き出しの尻尾 */}
				<div
					className={cn(tailVariants({ direction, theme }))}
					aria-hidden="true"
				/>

				{/* テキストコンテンツ */}
				<BubbleContent
					contentId={contentId}
					contentConfig={contentConfig}
					children={children}
				/>
			</div>
		</div>
	);
}

/**
 * 吹き出しコンテンツ用のヘルパーコンポーネント群
 */

/**
 * 吹き出し内のタイトル部分
 */
export function SpeechBubbleTitle({
	className,
	...props
}: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn("font-semibold text-inherit mb-1", className)}
			{...props}
		/>
	);
}

/**
 * 吹き出し内のメッセージ部分
 */
export function SpeechBubbleMessage({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p className={cn("text-inherit leading-relaxed", className)} {...props} />
	);
}

/**
 * 吹き出し内のアクション部分（ボタンなど）
 */
export function SpeechBubbleActions({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex gap-2 mt-3 items-center", className)} {...props} />
	);
}
