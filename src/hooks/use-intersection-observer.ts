"use client";

import { useEffect, useRef, useState } from "react";

export interface UseIntersectionObserverOptions {
  /** ルート要素（デフォルト: viewport） */
  root?: Element | null;
  /** ルートマージン（デフォルト: "0px"） */
  rootMargin?: string;
  /** 表示閾値（デフォルト: 0.1 = 10%表示で発火） */
  threshold?: number | number[];
  /** 一度だけ実行するか（デフォルト: true） */
  triggerOnce?: boolean;
  /** 初期の可視状態（デフォルト: false） */
  initialIsIntersecting?: boolean;
}

export interface UseIntersectionObserverReturn {
  /** 対象要素への参照 */
  ref: React.RefObject<Element | null>;
  /** 現在の可視状態 */
  isIntersecting: boolean;
  /** Intersection Observer エントリ */
  entry: IntersectionObserverEntry | undefined;
}

/**
 * パフォーマンス最適化された Intersection Observer フック
 *
 * @example
 * ```tsx
 * const { ref, isIntersecting } = useIntersectionObserver({
 *   threshold: 0.1,
 *   triggerOnce: true
 * });
 *
 * <div ref={ref} className={isIntersecting ? 'animate-fade-in' : ''}>
 *   Content
 * </div>
 * ```
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverReturn {
  const {
    root = null,
    rootMargin = "0px",
    threshold = 0.1,
    triggerOnce = true,
    initialIsIntersecting = false,
  } = options;

  const ref = useRef<Element>(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry | undefined>();
  const [isIntersecting, setIsIntersecting] = useState(initialIsIntersecting);

  useEffect(() => {
    const element = ref.current;

    // 要素が存在しない場合は早期リターン
    if (!element) return;

    // ブラウザサポートチェック
    if (!("IntersectionObserver" in window)) {
      // フォールバック: 即座に表示状態にする
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;

        setEntry(entry);
        setIsIntersecting(isElementIntersecting);

        // 一度だけの実行で、かつ表示されている場合は監視を停止
        if (triggerOnce && isElementIntersecting) {
          observer.unobserve(element);
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    // クリーンアップ関数
    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold, triggerOnce]);

  return {
    ref,
    isIntersecting,
    entry,
  };
}
