"use client";

import { useEffect, useRef, useState } from "react";
import { throttle } from "./utils/performance";

/**
 * スクロール方向の型
 */
export type ScrollDirection = "up" | "down" | null;

/**
 * スクロール状態の追跡用インターフェース
 */
export interface ScrollState {
	/**
	 * 現在のスクロール方向（上/下/初期値はnull）
	 */
	readonly direction: ScrollDirection;

	/**
	 * 要素を表示すべきかどうか
	 */
	readonly visible: boolean;

	/**
	 * 現在のスクロール位置（px）
	 */
	readonly scrollY: number;

	/**
	 * ページ最上部にいるかどうか
	 */
	readonly isAtTop: boolean;

	/**
	 * ページ最下部に到達したかどうか
	 */
	readonly isAtBottom: boolean;

	/**
	 * 前回のスクロール位置（px）
	 */
	readonly previousScrollY: number;
}

/**
 * useScrollフックの設定オプション
 */
export interface UseScrollOptions {
	/**
	 * スクロールアクションを実行する閾値（px）
	 * @default 10
	 */
	readonly threshold?: number;

	/**
	 * 上部での常時表示マージン（px）
	 * @default 0
	 */
	readonly topOffset?: number;

	/**
	 * 方向変化時のみ状態を更新するかどうか
	 * @default false
	 */
	readonly onlyDirectionChange?: boolean;

	/**
	 * スクロールイベントの発火間隔（ms）
	 * @default 100
	 */
	readonly throttleMs?: number;

	/**
	 * 初期表示状態
	 * @default true
	 */
	readonly initiallyVisible?: boolean;
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

	// 最新の状態を参照するためのref
	const stateRef = useRef(state);
	stateRef.current = state;

	// 共通ユーティリティのthrottleを使用

	useEffect(() => {
		// ページの初期スクロール位置を設定
		const initialScrollY = window.scrollY;
		setState((prev) => ({
			...prev,
			scrollY: initialScrollY,
			isAtTop: initialScrollY <= topOffset,
		}));

		// ページがロードされたときに最下部かどうかをチェック
		const isAtBottomCheck = () => {
			return (
				window.innerHeight + window.scrollY >= document.body.offsetHeight - 5
			);
		};

		// スクロールイベントハンドラー
		const handleScroll = throttle(() => {
			const currentState = stateRef.current;
			const currentScrollY = window.scrollY;
			const isScrollingDown = currentScrollY > currentState.scrollY;
			const isScrollingUp = currentScrollY < currentState.scrollY;
			const isAtTop = currentScrollY <= topOffset;
			const isAtBottom = isAtBottomCheck();

			// 方向変化の検出
			let newDirection: "up" | "down" | null = currentState.direction;
			if (Math.abs(currentScrollY - currentState.scrollY) > threshold) {
				if (isScrollingDown) {
					newDirection = "down";
				} else if (isScrollingUp) {
					newDirection = "up";
				}
			}

			// 表示/非表示の決定
			let visible = currentState.visible;

			// 最上部では常に表示
			if (isAtTop) {
				visible = true;
			}
			// 方向変化のみで更新する場合
			else if (onlyDirectionChange) {
				if (newDirection !== currentState.direction) {
					visible = newDirection === "up";
				}
			}
			// 通常の更新ロジック
			else {
				if (
					isScrollingDown &&
					!isAtTop &&
					Math.abs(currentScrollY - currentState.scrollY) > threshold
				) {
					visible = false;
				} else if (isScrollingUp) {
					visible = true;
				}
			}

			// 状態が変化した場合のみ更新
			if (
				newDirection !== currentState.direction ||
				visible !== currentState.visible ||
				isAtTop !== currentState.isAtTop ||
				isAtBottom !== currentState.isAtBottom ||
				currentScrollY !== currentState.scrollY
			) {
				setState({
					direction: newDirection,
					visible,
					scrollY: currentScrollY,
					isAtTop,
					isAtBottom,
					previousScrollY: currentState.scrollY,
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
	}, [threshold, topOffset, onlyDirectionChange, throttleMs, throttle]);

	return state;
}
