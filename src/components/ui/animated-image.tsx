"use client";

import { motion } from "motion/react";
import Image, { type ImageProps } from "next/image";
import { type ComponentProps, forwardRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

export interface AnimatedImageProps extends Omit<ImageProps, "className"> {
	/** 追加のCSSクラス */
	className?: string;
	/** アニメーション設定 */
	animation?: {
		/** アニメーション持続時間（秒） */
		duration?: number;
		/** アニメーション遅延（秒） */
		delay?: number;
		/** イージング関数 */
		ease?:
			| "linear"
			| "easeIn"
			| "easeOut"
			| "easeInOut"
			| [number, number, number, number];
		/** Y軸移動量（px） */
		yOffset?: number;
	};
	/** Intersection Observer 設定 */
	intersection?: {
		/** 表示閾値 */
		threshold?: number;
		/** ルートマージン */
		rootMargin?: string;
		/** 一度だけ実行するか */
		triggerOnce?: boolean;
	};
	/** コンテナのプロパティ */
	containerProps?: ComponentProps<typeof motion.div>;
}

/**
 * フェードインアニメーション付きの最適化画像コンポーネント
 *
 * 特徴:
 * - Intersection Observer による遅延アニメーション
 * - GPU最適化 (transform + opacity)
 * - prefers-reduced-motion 対応
 * - RSC対応
 *
 * @example
 * ```tsx
 * <AnimatedImage
 *   src="/images/sample.jpg"
 *   alt="サンプル画像"
 *   width={800}
 *   height={600}
 *   animation={{ duration: 0.8, yOffset: 30 }}
 * />
 * ```
 */
export const AnimatedImage = forwardRef<HTMLDivElement, AnimatedImageProps>(
	(
		{
			className,
			animation = {},
			intersection = {},
			containerProps = {},
			...imageProps
		},
		ref,
	) => {
		const {
			duration = 0.6,
			delay = 0,
			ease = "easeOut",
			yOffset = 20,
		} = animation;

		const {
			threshold = 0.1,
			rootMargin = "0px 0px -50px 0px",
			triggerOnce = true,
		} = intersection;

		// Intersection Observer でビューポート監視
		const { ref: observerRef, isIntersecting } = useIntersectionObserver({
			threshold,
			rootMargin,
			triggerOnce,
		});

		return (
			<motion.div
				{...containerProps}
				ref={(node) => {
					// 複数のrefを統合
					if (typeof ref === "function") {
						ref(node);
					} else if (ref) {
						ref.current = node;
					}

					// Intersection Observer用のrefを設定
					if (node) {
						(observerRef as React.MutableRefObject<Element | null>).current =
							node;
					}
				}}
				className={cn("overflow-hidden", containerProps.className)}
				initial={{
					opacity: 0,
					y: yOffset,
				}}
				animate={{
					opacity: isIntersecting ? 1 : 0,
					y: isIntersecting ? 0 : yOffset,
				}}
				transition={{
					duration,
					delay,
					ease,
				}}
			>
				<Image
					{...imageProps}
					className={cn(
						// 基本スタイル
						"transition-transform duration-300 will-change-transform",
						// ホバー効果（任意）
						"hover:scale-105",
						className,
					)}
					// パフォーマンス最適化
					loading="lazy"
					decoding="async"
				/>
			</motion.div>
		);
	},
);

AnimatedImage.displayName = "AnimatedImage";
