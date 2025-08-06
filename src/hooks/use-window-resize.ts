"use client";

import { useEffect } from "react";

/**
 * ウィンドウリサイズイベントを監視するカスタムフック
 * 
 * 指定されたコールバック関数をwindowのresizeイベント発生時に実行し、
 * 初回マウント時にも実行する
 * 
 * @param callback リサイズ時に実行される関数
 * @param deps useEffectの依存配列（省略可能）
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
 * // 依存配列を使用した例
 * function ConfigurableComponent({ threshold }: { threshold: number }) {
 *   const [isLarge, setIsLarge] = useState(false);
 *   
 *   useWindowResize(() => {
 *     setIsLarge(window.innerWidth > threshold);
 *   }, [threshold]);
 *   
 *   return <div>{isLarge ? 'Large' : 'Small'} screen</div>;
 * }
 * ```
 */
export function useWindowResize(
	callback: () => void,
	deps: React.DependencyList = []
): void {
	useEffect(() => {
		// SSR対応
		if (typeof window === "undefined") return;

		// 初回実行
		callback();

		// リサイズイベントリスナーを追加
		window.addEventListener("resize", callback);

		// クリーンアップ
		return () => {
			window.removeEventListener("resize", callback);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
}