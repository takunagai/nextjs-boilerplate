"use client";

import Image from "next/image";
import type * as React from "react";
import { use, Suspense } from "react";

import { cn } from "@/lib/utils";
import {
	useSpeechBubble,
	createAvatarConfiguration,
	validateContentConfiguration,
	useSpeechBubblePerformance,
} from "@/hooks/use-speech-bubble";
import {
	speechBubbleVariants,
	bubbleVariants,
	avatarVariants,
	type SpeechBubbleVariantProps,
	type BubbleVariantProps,
	type AvatarVariantProps,
	DEFAULT_AVATAR,
} from "@/lib/data/speech-bubble-variants";
import { SpeechBubbleSkeleton } from "./speech-bubble-skeleton";

/**
 * SpeechBubbleコンポーネントのプロパティ
 */
export interface SpeechBubbleProps
	extends Omit<React.ComponentProps<"div">, "children">,
		SpeechBubbleVariantProps,
		BubbleVariantProps {
	children: React.ReactNode;
	name?: string;
	avatarSrc?: string;
	avatarWidth?: number;
	avatarHeight?: number;
	disableResponsive?: boolean;
	contentPromise?: Promise<React.ReactNode>;
	fallback?: React.ReactNode;
	disableSuspense?: boolean;
}

interface BubbleContentProps {
	contentId: string;
	contentConfig: ReturnType<typeof validateContentConfiguration>;
	children: React.ReactNode;
}

function BubbleContent({
	contentId,
	contentConfig,
	children,
	contentPromise,
}: BubbleContentProps & { contentPromise?: Promise<React.ReactNode> }) {
	// React 19の非同期コンテンツサポート
	const resolvedContent = contentPromise ? use(contentPromise) : children;

	return (
		<div id={contentId} className="relative z-10">
			{contentConfig.hasValidContent || resolvedContent ? (
				resolvedContent
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
	contentPromise,
	fallback,
	disableSuspense = false,
	...props
}: SpeechBubbleProps) {
	// カスタムフックの統合
	const {
		contentId,
		imageError,
		imageLoading,
		handleImageError,
		handleImageLoad,
	} = useSpeechBubble();

	// パフォーマンス監視（開発環境のみ）
	const { renderCount, lastRenderTime } =
		useSpeechBubblePerformance("SpeechBubble");

	// アバター設定の最適化
	const avatarConfig = createAvatarConfiguration({
		avatarSrc,
		avatarWidth,
		avatarHeight,
		imageError,
		defaultAvatar: DEFAULT_AVATAR,
	});

	// コンテンツとユーザー情報の検証
	const contentConfig = validateContentConfiguration({ children, name });

	// デフォルトのフォールバック要素
	const defaultFallback = fallback || (
		<SpeechBubbleSkeleton
			direction={direction || "left"}
			size={size || "md"}
			spacing={spacing || "normal"}
		/>
	);

	// Speech Bubbleコンポーネント本体
	const speechBubbleContent = (
		<div
			className={cn(
				speechBubbleVariants({ direction, size, spacing }),
				!disableResponsive && "max-w-full",
				className,
			)}
			role="group"
			aria-labelledby={`${contentId}-name`}
			aria-describedby={contentId}
			{...props}
		>
			{/* アバター画像セクション */}
			<div className="relative flex-shrink-0" role="img" aria-hidden="true">
				<Image
					src={avatarConfig.src}
					alt={`${name}のアバター`}
					width={avatarConfig.width}
					height={avatarConfig.height}
					className={cn(avatarVariants({ size }))}
					onError={handleImageError}
					onLoad={handleImageLoad}
					loading="lazy"
					sizes="(max-width: 640px) 40px, (max-width: 768px) 48px, 64px"
					placeholder="blur"
					blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo="
				/>

				{/* 読み込み中のインジケーター */}
				{imageLoading && (
					<div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full">
						<div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
					</div>
				)}
			</div>

			{/* 吹き出しバブルセクション */}
			<div className="flex-1 relative">
				{/* 名前表示（アクセシビリティ用） */}
				<div className="sr-only" id={`${contentId}-name`}>
					{name}からのメッセージ
				</div>

				{/* 吹き出しバブル */}
				<div
					className={cn(
						bubbleVariants({ theme, size }),
						"relative transition-shadow duration-200 hover:shadow-md",
					)}
				>
					{/* 吹き出しの尻尾（疑似要素で実装） */}
					<div
						className={cn(
							"absolute top-4 w-0 h-0",
							direction === "right"
								? "right-full border-r-8 border-r-transparent border-t-8 border-t-current border-b-8 border-b-transparent"
								: "left-full border-l-8 border-l-transparent border-t-8 border-t-current border-b-8 border-b-transparent",
							theme === "primary" && "border-t-blue-200",
							theme === "secondary" && "border-t-gray-300",
							theme === "default" && "border-t-gray-200",
						)}
						aria-hidden="true"
					/>

					{/* コンテンツ */}
					<BubbleContent
						contentId={contentId}
						contentConfig={contentConfig}
						contentPromise={contentPromise}
					>
						{children}
					</BubbleContent>
				</div>
			</div>
		</div>
	);

	// 開発環境でのパフォーマンス情報を表示
	if (process.env.NODE_ENV === "development" && renderCount > 1) {
		console.log(
			`SpeechBubble [${name}] rendered ${renderCount} times. Last render: ${lastRenderTime}ms`,
		);
	}

	// Suspense境界の処理
	if (!disableSuspense && contentPromise) {
		return (
			<Suspense fallback={defaultFallback}>{speechBubbleContent}</Suspense>
		);
	}

	return speechBubbleContent;
}

/**
 * 吹き出し内のタイトル部分
 */
export function SpeechBubbleTitle({
	className,
	...props
}: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn("text-lg font-semibold mb-2 text-inherit", className)}
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
 * 吹き出し内のアクション部分
 */
export function SpeechBubbleActions({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex gap-2 mt-3 items-center", className)} {...props} />
	);
}
