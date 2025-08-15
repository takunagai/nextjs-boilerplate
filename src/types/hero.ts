/**
 * ヒーローセクション関連の型定義
 */

import type { CSSProperties } from "react";

/**
 * ヒーローセクションの高さ計算結果
 */
export interface HeroHeightData {
	/** ヘッダー+アナウンスメントバーの合計高さ（px） */
	paddingTop: number;
	/** ヒーローセクション用のスタイルオブジェクト */
	heroStyle: CSSProperties;
	/** スムーズスクロール用の高さ計算関数 */
	getScrollHeight: () => number;
	/** ヒーロー関連の定数値 */
	constants: {
		HEADER_HEIGHT: number;
		MIN_HERO_HEIGHT: number;
	};
}

/**
 * ヒーローコンテナーの装飾色設定
 */
export interface HeroDecorationColors {
	/** 主要装飾色（右上の円形グラデーション） */
	primary?: string;
	/** 副次装飾色（左下の円形グラデーション） */
	secondary?: string;
}

/**
 * ヒーローセクションの共通プロパティ
 */
export interface BaseHeroProps {
	/** 追加のCSSクラス名 */
	className?: string;
	/** 背景グラデーション設定 */
	backgroundGradient?: string;
	/** 装飾要素の表示/非表示 */
	showDecorations?: boolean;
	/** 装飾色のカスタマイズ */
	decorationColors?: HeroDecorationColors;
}
