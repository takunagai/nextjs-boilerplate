"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * スクロール状態の追跡用インターフェース
 */
interface ScrollState {
  /**
   * 現在のスクロール方向（上/下/初期値はnull）
   */
  direction: "up" | "down" | null;
  
  /**
   * 要素を表示すべきかどうか
   */
  visible: boolean;
  
  /**
   * 現在のスクロール位置（px）
   */
  scrollY: number;
  
  /**
   * ページ最上部にいるかどうか
   */
  isAtTop: boolean;
  
  /**
   * ページ最下部に到達したかどうか
   */
  isAtBottom: boolean;
  
  /**
   * 前回のスクロール位置（px）
   */
  previousScrollY: number;
}

/**
 * useScrollフックの設定オプション
 */
interface UseScrollOptions {
  /**
   * スクロールアクションを実行する閾値（px）
   * @default 10
   */
  threshold?: number;
  
  /**
   * 上部での常時表示マージン（px）
   * @default 0
   */
  topOffset?: number;
  
  /**
   * 方向変化時のみ状態を更新するかどうか
   * @default false
   */
  onlyDirectionChange?: boolean;
  
  /**
   * スクロールイベントの発火間隔（ms）
   * @default 100
   */
  throttleMs?: number;
  
  /**
   * 初期表示状態
   * @default true
   */
  initiallyVisible?: boolean;
}

/**
 * スクロール状態を検出するフック
 * ヘッダーやフローティングボタンなどの表示/非表示を制御するために使用
 */
export function useScroll({
  threshold = 10,
  topOffset = 0,
  onlyDirectionChange = false,
  throttleMs = 100,
  initiallyVisible = true,
}: UseScrollOptions = {}): ScrollState {
  // スクロール状態を追跡
  const [state, setState] = useState<ScrollState>({
    direction: null,
    visible: initiallyVisible,
    scrollY: 0,
    isAtTop: true,
    isAtBottom: false,
    previousScrollY: 0,
  });

  // スロットリング関数
  const throttle = useCallback(
    <T extends (...args: unknown[]) => void>(callback: T, delay: number) => {
      let lastCall = 0;
      return (...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return callback(...args);
      };
    },
    []
  );

  useEffect(() => {
    // ページの初期スクロール位置を設定
    const initialScrollY = window.scrollY;
    setState(prev => ({
      ...prev,
      scrollY: initialScrollY,
      isAtTop: initialScrollY <= topOffset,
    }));

    // ページがロードされたときに最下部かどうかをチェック
    const isAtBottomCheck = () => {
      return window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;
    };

    // スクロールイベントハンドラー
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > state.scrollY;
      const isScrollingUp = currentScrollY < state.scrollY;
      const isAtTop = currentScrollY <= topOffset;
      const isAtBottom = isAtBottomCheck();

      // 方向変化の検出
      let newDirection: "up" | "down" | null = state.direction;
      if (Math.abs(currentScrollY - state.scrollY) > threshold) {
        if (isScrollingDown) {
          newDirection = "down";
        } else if (isScrollingUp) {
          newDirection = "up";
        }
      }

      // 表示/非表示の決定
      let visible = state.visible;
      
      // 最上部では常に表示
      if (isAtTop) {
        visible = true;
      } 
      // 方向変化のみで更新する場合
      else if (onlyDirectionChange) {
        if (newDirection !== state.direction) {
          visible = newDirection === "up";
        }
      } 
      // 通常の更新ロジック
      else {
        if (isScrollingDown && !isAtTop && Math.abs(currentScrollY - state.scrollY) > threshold) {
          visible = false;
        } else if (isScrollingUp) {
          visible = true;
        }
      }

      // 状態が変化した場合のみ更新
      if (
        newDirection !== state.direction ||
        visible !== state.visible ||
        isAtTop !== state.isAtTop ||
        isAtBottom !== state.isAtBottom ||
        currentScrollY !== state.scrollY
      ) {
        setState({
          direction: newDirection,
          visible,
          scrollY: currentScrollY,
          isAtTop,
          isAtBottom,
          previousScrollY: state.scrollY,
        });
      }
    }, throttleMs);

    // スクロールイベントリスナーを追加
    window.addEventListener("scroll", handleScroll, { passive: true });

    // リサイズ時にも最下部のチェックを行う
    window.addEventListener("resize", handleScroll, { passive: true });

    // クリーンアップ
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [
    state.scrollY,
    state.direction,
    state.visible,
    state.isAtTop,
    state.isAtBottom,
    threshold,
    topOffset,
    onlyDirectionChange,
    throttleMs,
    throttle
  ]);

  return state;
}
