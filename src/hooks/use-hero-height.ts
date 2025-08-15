"use client";

import { useAnnouncementBar } from "@/components/layout/announcement-bar-context";
import type { HeroHeightData } from "@/types/hero";

// 定数定義
const HEADER_HEIGHT = 64; // h-16 = 64px
const MIN_HERO_HEIGHT = 400; // 最小ヒーロー高さ

/**
 * ヒーローセクションの高さ計算を行うカスタムフック
 * アナウンスメントバーとヘッダーの高さを考慮してビューポート高さを調整
 */
export function useHeroHeight(): HeroHeightData {
	const { isVisible, height } = useAnnouncementBar();

	// ヘッダーの高さとお知らせバーの高さを合計
	const paddingTop = isVisible ? HEADER_HEIGHT + height : HEADER_HEIGHT;

	// ヒーローセクション用のスタイルオブジェクト
	const heroStyle = {
		height: `calc(100vh - ${paddingTop}px)`,
		minHeight: `${MIN_HERO_HEIGHT}px`,
	} as const;

	// スムーズスクロール用の高さ計算
	const getScrollHeight = (): number => {
		if (typeof window === "undefined") return 0;
		return window.innerHeight - paddingTop;
	};

	return {
		paddingTop,
		heroStyle,
		getScrollHeight,
		constants: {
			HEADER_HEIGHT,
			MIN_HERO_HEIGHT,
		},
	} as const;
}
