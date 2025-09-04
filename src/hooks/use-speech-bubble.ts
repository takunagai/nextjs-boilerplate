"use client";

import { useId, useState } from "react";

/**
 * Speech Bubble用のカスタムフック
 * 画像状態管理とハンドラーを統合
 */
export function useSpeechBubble() {
	const contentId = useId();
	const [imageError, setImageError] = useState(false);
	const [imageLoading, setImageLoading] = useState(true);

	// 画像ハンドラー
	const handleImageError = () => {
		setImageError(true);
		setImageLoading(false);
	};

	const handleImageLoad = () => {
		setImageLoading(false);
		setImageError(false);
	};

	return {
		contentId,
		imageError,
		imageLoading,
		handleImageError,
		handleImageLoad,
	};
}

/**
 * アバター設定の最適化とバリデーション用フック
 */
export function useAvatarConfiguration({
	avatarSrc,
	avatarWidth,
	avatarHeight,
	imageError,
	defaultAvatar = {
		src: "/images/avatars/default-avatar.jpg",
		width: 48,
		height: 48,
	},
}: {
	avatarSrc?: string;
	avatarWidth?: number;
	avatarHeight?: number;
	imageError: boolean;
	defaultAvatar?: {
		src: string;
		width: number;
		height: number;
	};
}) {
	const src = imageError ? defaultAvatar.src : (avatarSrc || defaultAvatar.src);
	const width = Math.max(avatarWidth || defaultAvatar.width, 16);
	const height = Math.max(avatarHeight || defaultAvatar.height, 16);

	return {
		src,
		width,
		height,
	};
}

/**
 * コンテンツバリデーション用フック
 */
export function useContentConfiguration({
	children,
	name,
}: {
	children: React.ReactNode;
	name?: string;
}) {
	// コンテンツの有効性チェック
	const hasValidContent = children != null && 
		(typeof children === 'string' ? children.trim().length > 0 : true);
	
	// 安全な名前の取得
	const safeName = name && name.trim() ? name.trim() : "ユーザー";

	return {
		hasValidContent,
		safeName,
	};
}

/**
 * パフォーマンス監視用フック（開発時のデバッグ用）
 */
export function useSpeechBubblePerformance(componentName = "SpeechBubble") {
	const [renderCount, setRenderCount] = useState(0);
	const [lastRenderTime, setLastRenderTime] = useState<number>(0);

	// レンダリング回数とタイミングを記録
	const trackRender = () => {
		const now = performance.now();
		setRenderCount(prev => prev + 1);
		setLastRenderTime(now);
		
		// 開発環境でのみログ出力
		if (process.env.NODE_ENV === 'development') {
			console.log(`${componentName} rendered #${renderCount + 1} at ${now.toFixed(2)}ms`);
		}
	};

	return {
		renderCount,
		lastRenderTime,
		trackRender,
	};
}