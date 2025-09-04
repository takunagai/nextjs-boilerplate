"use client";

import { useId, useState, useEffect, useRef } from "react";

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
 * アバター設定の最適化とバリデーション（純関数）
 */
export function createAvatarConfiguration({
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
 * コンテンツバリデーション（純関数）
 */
export function validateContentConfiguration({
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
 * 無限レンダリングを防ぐため、レンダリング時に直接カウント
 */
export function useSpeechBubblePerformance(componentName = "SpeechBubble") {
	const renderCountRef = useRef(0);
	const lastRenderTimeRef = useRef<number>(0);

	// レンダリング時に直接カウント（useEffectは使わない）
	const now = performance.now();
	renderCountRef.current += 1;
	lastRenderTimeRef.current = now;
	
	// 開発環境でのみログ出力（適度な頻度で）
	if (process.env.NODE_ENV === 'development' && renderCountRef.current % 10 === 1) {
		console.log(`${componentName} rendered #${renderCountRef.current} at ${now.toFixed(2)}ms`);
	}

	return {
		renderCount: renderCountRef.current,
		lastRenderTime: lastRenderTimeRef.current,
	};
}