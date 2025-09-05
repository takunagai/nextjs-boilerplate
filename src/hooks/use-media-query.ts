"use client";

import { useEffect, useState } from "react";

/**
 * メディアクエリの状態を監視するカスタムフック
 *
 * @param query - 監視するメディアクエリ
 * @param defaultValue - SSR時のデフォルト値
 *
 * @example
 * ```tsx
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 * const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
 * ```
 */
export function useMediaQuery(query: string, defaultValue = false): boolean {
	const [matches, setMatches] = useState(defaultValue);

	useEffect(() => {
		// ブラウザ環境でない場合は早期リターン
		if (typeof window === "undefined") {
			return;
		}

		const mediaQuery = window.matchMedia(query);

		// 初期値を設定
		setMatches(mediaQuery.matches);

		// 変更を監視
		const handleChange = (event: MediaQueryListEvent) => {
			setMatches(event.matches);
		};

		// Modern browsers
		if (typeof mediaQuery.addEventListener === "function") {
			mediaQuery.addEventListener("change", handleChange);
			return () => mediaQuery.removeEventListener("change", handleChange);
		}
		// Legacy browsers (fallback)
		else if (typeof (mediaQuery as any).addListener === "function") {
			(mediaQuery as any).addListener(handleChange);
			return () => (mediaQuery as any).removeListener(handleChange);
		}
	}, [query]);

	return matches;
}

/**
 * prefers-reduced-motion を監視する特化フック
 */
export function usePrefersReducedMotion(): boolean {
	return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

/**
 * prefers-color-scheme を監視する特化フック
 */
export function usePrefersColorScheme(): "light" | "dark" | null {
	const prefersDark = useMediaQuery("(prefers-color-scheme: dark)", false);
	const prefersLight = useMediaQuery("(prefers-color-scheme: light)", false);

	if (prefersDark) return "dark";
	if (prefersLight) return "light";
	return null;
}

/**
 * prefers-contrast を監視する特化フック
 */
export function usePrefersHighContrast(): boolean {
	return useMediaQuery("(prefers-contrast: high)", false);
}
