"use client";

import { useEffect } from "react";
import { debounce } from "./utils/performance";

/**
 * ウィンドウリサイズイベントを監視するカスタムフック
 * 
 * 指定されたコールバック関数をwindowのresizeイベント発生時に実行し、
 * 初回マウント時にも実行する。デバウンス機能でパフォーマンスを最適化
 * 
 * @param callback リサイズ時に実行される関数
 * @param options オプション設定
 * 
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
 *   
 *   useWindowResize(() => {
 *     setDimensions({
 *       width: window.innerWidth,
 *       height: window.innerHeight
 *     });
 *   });
 *   
 *   return <div>Size: {dimensions.width} x {dimensions.height}</div>;
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // デバウンス機能を使用した例
 * function ConfigurableComponent() {
 *   const [isLarge, setIsLarge] = useState(false);
 *   
 *   useWindowResize(() => {
 *     setIsLarge(window.innerWidth > 1024);
 *   }, { debounceMs: 300, deps: [] });
 *   
 *   return <div>{isLarge ? 'Large' : 'Small'} screen</div>;
 * }
 * ```
 */
export interface UseWindowResizeOptions {
	/** デバウンス時間（ミリ秒） */
	readonly debounceMs?: number;
	/** useEffectの依存配列 */
	readonly deps?: React.DependencyList;
}

export function useWindowResize(
	callback: () => void,
	options: UseWindowResizeOptions = {}
): void {
	const { debounceMs = 0, deps = [] } = options;

	useEffect(() => {
		// SSR対応
		if (typeof window === "undefined") return;

		// 初回実行
		callback();

		// デバウンス機能付きコールバック
		const handleResize = debounceMs > 0 
			? debounce(callback, debounceMs)
			: callback;

		// リサイズイベントリスナーを追加
		window.addEventListener("resize", handleResize);

		// クリーンアップ
		return () => {
			window.removeEventListener("resize", handleResize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
}