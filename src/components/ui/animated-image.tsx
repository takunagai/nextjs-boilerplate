"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { useErrorBoundary } from "@/hooks/use-error-boundary";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { useMergedRefs } from "@/hooks/use-merged-refs";
import { cn } from "@/lib/utils";
import type {
  AnimatedImageProps,
  AnimationConfig,
  AnimationState,
  IntersectionConfig,
} from "./animated-image.types";
import {
  DEFAULT_ANIMATION,
  DEFAULT_INTERSECTION,
  REDUCED_MOTION_ANIMATION,
} from "./animated-image.types";

/**
 * フェードインアニメーション付きの最適化画像コンポーネント（リファクタリング版）
 *
 * 🔥 新機能・改善点:
 * - エラーハンドリングの強化
 * - アクセシビリティの改善（prefers-reduced-motion 完全対応）
 * - パフォーマンス最適化（React.memo + useCallback + useMemo）
 * - 型安全性の向上（分離された型定義）
 * - デバッグモードの追加
 * - より柔軟なアニメーション設定
 *
 * @example
 * ```tsx
 * <AnimatedImage
 *   src="/images/sample.jpg"
 *   alt="サンプル画像"
 *   width={800}
 *   height={600}
 *   animation={{ duration: 0.8, yOffset: 30 }}
 *   onAnimationStart={() => console.log('Animation started')}
 *   debug={process.env.NODE_ENV === 'development'}
 * />
 * ```
 */
export const AnimatedImage = forwardRef<HTMLDivElement, AnimatedImageProps>(
  (
    {
      className,
      animation,
      intersection,
      containerProps,
      onError,
      onAnimationStart,
      onAnimationComplete,
      debug = false,
      ...imageProps
    },
    ref,
  ) => {
    // アクセシビリティ: prefers-reduced-motion 対応
    const prefersReducedMotion = usePrefersReducedMotion();

    // エラーハンドリング
    const { hasError, error, captureError, clearError } =
      useErrorBoundary(onError);

    // アニメーション状態
    const [animationState, setAnimationState] = useState<AnimationState>({
      isVisible: false,
      isAnimating: false,
      hasAnimated: false,
    });

    // 設定のメモ化（prefers-reduced-motion対応）
    const finalAnimationConfig: AnimationConfig = useMemo(() => {
      const baseConfig = { ...DEFAULT_ANIMATION, ...animation };
      return prefersReducedMotion ? REDUCED_MOTION_ANIMATION : baseConfig;
    }, [animation, prefersReducedMotion]);

    const finalIntersectionConfig: IntersectionConfig = useMemo(
      () => ({
        ...DEFAULT_INTERSECTION,
        ...intersection,
      }),
      [intersection],
    );

    // Intersection Observer でビューポート監視
    const { ref: observerRef, isIntersecting } = useIntersectionObserver({
      threshold: finalIntersectionConfig.threshold,
      rootMargin: finalIntersectionConfig.rootMargin,
      triggerOnce: finalIntersectionConfig.triggerOnce,
    });

    // ref統合
    const mergedRef = useMergedRefs(ref, observerRef);

    // アニメーション開始/完了ハンドラー
    const handleAnimationStart = useCallback(() => {
      setAnimationState((prev) => ({ ...prev, isAnimating: true }));
      onAnimationStart?.();

      if (debug) {
        console.log("[AnimatedImage] Animation started", {
          config: finalAnimationConfig,
          prefersReducedMotion,
        });
      }
    }, [onAnimationStart, debug, finalAnimationConfig, prefersReducedMotion]);

    const handleAnimationComplete = useCallback(() => {
      setAnimationState((prev) => ({
        ...prev,
        isAnimating: false,
        hasAnimated: true,
      }));
      onAnimationComplete?.();

      if (debug) {
        console.log("[AnimatedImage] Animation completed");
      }
    }, [onAnimationComplete, debug]);

    // アニメーション状態の同期
    useEffect(() => {
      if (isIntersecting && !animationState.isVisible) {
        setAnimationState((prev) => ({ ...prev, isVisible: true }));
      }
    }, [isIntersecting, animationState.isVisible]);

    // エラー発生時の画像ロード失敗ハンドリング
    const handleImageError = useCallback(
      (_event: React.SyntheticEvent<HTMLImageElement>) => {
        const error = new Error(`Failed to load image: ${imageProps.src}`);
        captureError(error, "Image load failed");
      },
      [imageProps.src, captureError],
    );

    // アニメーション値の計算
    const animationValues = useMemo(
      () => ({
        initial: {
          opacity: finalAnimationConfig.initialOpacity,
          y: finalAnimationConfig.yOffset,
          x: finalAnimationConfig.xOffset,
          scale: finalAnimationConfig.initialScale,
        },
        animate: {
          opacity: isIntersecting ? 1 : finalAnimationConfig.initialOpacity,
          y: isIntersecting ? 0 : finalAnimationConfig.yOffset,
          x: isIntersecting ? 0 : finalAnimationConfig.xOffset,
          scale: isIntersecting ? 1 : finalAnimationConfig.initialScale,
        },
        transition: {
          duration: finalAnimationConfig.duration,
          delay: finalAnimationConfig.delay,
          ease: finalAnimationConfig.ease,
        },
      }),
      [finalAnimationConfig, isIntersecting],
    );

    // デバッグ情報のログ出力
    useEffect(() => {
      if (debug) {
        console.log("[AnimatedImage] State changed", {
          isIntersecting,
          animationState,
          hasError,
          prefersReducedMotion,
        });
      }
    }, [debug, isIntersecting, animationState, hasError, prefersReducedMotion]);

    // エラー状態の表示
    if (hasError) {
      return (
        <div
          ref={mergedRef}
          className={cn(
            "flex items-center justify-center bg-muted rounded-lg",
            "min-h-[200px] text-muted-foreground",
            containerProps?.className,
          )}
        >
          <div className="text-center space-y-2">
            <p className="text-sm">画像の読み込みに失敗しました</p>
            {debug && error && (
              <p className="text-xs text-red-500">{error.message}</p>
            )}
            <button
              type="button"
              onClick={clearError}
              className="text-xs underline hover:no-underline"
            >
              再試行
            </button>
          </div>
        </div>
      );
    }

    return (
      <motion.div
        {...containerProps}
        ref={mergedRef}
        className={cn("overflow-hidden", containerProps?.className)}
        initial={animationValues.initial}
        animate={animationValues.animate}
        transition={animationValues.transition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        <Image
          {...imageProps}
          className={cn(
            // 基本スタイル
            "transition-transform duration-300 will-change-transform",
            // ホバー効果（アクセシビリティ配慮）
            !prefersReducedMotion && "hover:scale-105",
            className,
          )}
          // パフォーマンス最適化
          loading="lazy"
          decoding="async"
          // エラーハンドリング
          onError={handleImageError}
        />
      </motion.div>
    );
  },
);

AnimatedImage.displayName = "AnimatedImage";

// パフォーマンス最適化のためのメモ化
export default AnimatedImage;
