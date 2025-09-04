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
	const effectiveAvatarSrc = avatarSrc || DEFAULT_AVATAR.src;
	const effectiveAvatarWidth = Math.max(avatarWidth || DEFAULT_AVATAR.width, 16);
	const effectiveAvatarHeight = Math.max(avatarHeight || DEFAULT_AVATAR.height, 16);

	// コンテンツの有効性チェック
	const hasValidContent = children != null && 
		(typeof children === 'string' ? children.trim().length > 0 : true);

	// 無効な名前の場合のフォールバック
	const safeName = name && name.trim() ? name.trim() : "ユーザー";

	// 画像読み込みエラーハンドラー
	const handleImageError = () => {
		setImageError(true);
		setImageLoading(false);
	};

	// 画像読み込み完了ハンドラー
	const handleImageLoad = () => {
		setImageLoading(false);
		setImageError(false);
	};

	return (
		<div
			className={cn(
				speechBubbleVariants({ direction, size, spacing }),
				!disableResponsive && "max-w-full",
				className,
			)}
			role="group"
			aria-label={`${safeName}からのメッセージ`}
			{...props}
		>
			{/* アバター画像 */}
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
					src={imageError ? DEFAULT_AVATAR.src : effectiveAvatarSrc}
					alt={`${safeName}のアバター`}
					width={effectiveAvatarWidth}
					height={effectiveAvatarHeight}
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
				{imageError && effectiveAvatarSrc !== DEFAULT_AVATAR.src && (
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
				<div id={contentId} className="relative z-10">
					{hasValidContent ? (
						children
					) : (
						<div className="text-gray-400 dark:text-gray-600 italic" role="alert">
							コンテンツが提供されていません
						</div>
					)}
				</div>
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
