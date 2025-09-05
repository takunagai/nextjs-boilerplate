import type { ImageProps } from "next/image";
import type { ComponentProps } from "react";
import type { motion } from "motion/react";

/**
 * イージング関数の型定義
 */
export type EasingFunction =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | [number, number, number, number];

/**
 * アニメーション設定の型定義
 */
export interface AnimationConfig {
  /** アニメーション持続時間（秒） */
  duration?: number;
  /** アニメーション遅延（秒） */
  delay?: number;
  /** イージング関数 */
  ease?: EasingFunction;
  /** Y軸移動量（px） */
  yOffset?: number;
  /** X軸移動量（px） */
  xOffset?: number;
  /** スケール開始値 */
  initialScale?: number;
  /** 透明度開始値 */
  initialOpacity?: number;
}

/**
 * Intersection Observer 設定の型定義
 */
export interface IntersectionConfig {
  /** 表示閾値 */
  threshold?: number | number[];
  /** ルートマージン */
  rootMargin?: string;
  /** 一度だけ実行するか */
  triggerOnce?: boolean;
  /** ルート要素 */
  root?: Element | null;
}

/**
 * アニメーション状態の型定義
 */
export interface AnimationState {
  isVisible: boolean;
  isAnimating: boolean;
  hasAnimated: boolean;
  error?: string;
}

/**
 * AnimatedImage プロパティの型定義
 */
export interface AnimatedImageProps
  extends Omit<ImageProps, "className" | "onError"> {
  /** 追加のCSSクラス */
  className?: string;
  /** アニメーション設定 */
  animation?: AnimationConfig;
  /** Intersection Observer 設定 */
  intersection?: IntersectionConfig;
  /** コンテナのプロパティ */
  containerProps?: ComponentProps<typeof motion.div>;
  /** エラーハンドラー */
  onError?: (error: Error) => void;
  /** アニメーション開始コールバック */
  onAnimationStart?: () => void;
  /** アニメーション完了コールバック */
  onAnimationComplete?: () => void;
  /** デバッグモード */
  debug?: boolean;
}

/**
 * デフォルトアニメーション設定
 */
export const DEFAULT_ANIMATION: Required<AnimationConfig> = {
  duration: 0.6,
  delay: 0,
  ease: "easeOut",
  yOffset: 20,
  xOffset: 0,
  initialScale: 1,
  initialOpacity: 0,
} as const;

/**
 * デフォルト Intersection Observer 設定
 */
export const DEFAULT_INTERSECTION: Required<IntersectionConfig> = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
  triggerOnce: true,
  root: null,
} as const;

/**
 * prefers-reduced-motion 対応設定
 */
export const REDUCED_MOTION_ANIMATION: Required<AnimationConfig> = {
  duration: 0.01,
  delay: 0,
  ease: "linear",
  yOffset: 0,
  xOffset: 0,
  initialScale: 1,
  initialOpacity: 0,
} as const;
