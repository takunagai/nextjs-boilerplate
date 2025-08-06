"use client";

import { useState, useEffect } from "react";
import { checkIsMobile } from "@/lib/particle/particle-utils";

/**
 * モバイルデバイス判定を行うカスタムフック
 * 
 * 画面幅768px未満をモバイルと判定し、リサイズイベントに応じて
 * リアルタイムで値を更新する
 * 
 * @param breakpoint ブレイクポイント（デフォルト: 768px）
 * @returns {boolean} モバイルデバイスかどうか
 * 
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const isMobile = useIsMobile();
 *   
 *   return (
 *     <div>
 *       {isMobile ? (
 *         <MobileLayout />
 *       ) : (
 *         <DesktopLayout />
 *       )}
 *     </div>
 *   );
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // カスタムブレイクポイント
 * function CustomComponent() {
 *   const isTablet = useIsMobile(1024); // 1024px未満をモバイル扱い
 *   
 *   return isTablet ? <TabletView /> : <DesktopView />;
 * }
 * ```
 */
export function useIsMobile(breakpoint: number = 768): boolean {
	// SSR時のデフォルト値はfalse
	const [isMobile, setIsMobile] = useState(() => {
		if (typeof window === "undefined") return false;
		return window.innerWidth < breakpoint;
	});

	useEffect(() => {
		// ブレイクポイントが変更された場合の初期チェック
		const checkMobile = () => {
			if (typeof window === "undefined") return;
			setIsMobile(window.innerWidth < breakpoint);
		};

		// 初期チェック
		checkMobile();

		// リサイズイベントリスナーを追加
		window.addEventListener("resize", checkMobile);

		// クリーンアップ
		return () => {
			window.removeEventListener("resize", checkMobile);
		};
	}, [breakpoint]);

	return isMobile;
}