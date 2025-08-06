"use client";

import { useState, useEffect } from "react";

/**
 * コンポーネントがマウントされたかを追跡するフック
 * 
 * SSR時のハイドレーション問題を回避し、
 * クライアントサイドでのみ実行される処理に使用する
 * 
 * @returns {boolean} マウント状態
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const mounted = useMounted();
 *   
 *   if (!mounted) {
 *     return null; // SSR時の表示
 *   }
 *   
 *   return (
 *     <div>
 *       クライアントサイドでのみ表示される内容
 *     </div>
 *   );
 * }
 * ```
 */
export function useMounted(): boolean {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return mounted;
}