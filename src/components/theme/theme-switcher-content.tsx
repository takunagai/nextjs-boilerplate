"use client";

import { Button } from "@/components/ui/button";
import { STORAGE_KEYS } from "@/lib/constants";
import { FaSun, FaMoon } from "react-icons/fa6";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeSwitcherContent() {
	const [theme, setThemeState] = useState<Theme>("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// 初期テーマの取得
		const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		
		// 保存されたテーマがあればそれを使用、なければシステム設定を確認
		if (storedTheme) {
			setThemeState(storedTheme);
		} else if (prefersDark) {
			setThemeState("dark");
		}
		
		setMounted(true);
	}, []);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
		localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
	};

	const toggleTheme = () => {
		const nextTheme = theme === "light" ? "dark" : "light";
		setTheme(nextTheme);
	};

	// システムテーマの変更を監視
	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleChange = (e: MediaQueryListEvent) => {
			// ユーザーが明示的にテーマを設定していない場合のみ適用
			if (!localStorage.getItem(STORAGE_KEYS.THEME)) {
				const newTheme = e.matches ? "dark" : "light";
				setThemeState(newTheme);
				document.documentElement.classList.toggle("dark", e.matches);
			}
		};

		// イベントリスナーの追加（ブラウザ互換性対応）
		if (typeof mediaQuery.addEventListener === 'function') {
			mediaQuery.addEventListener('change', handleChange);
			return () => mediaQuery.removeEventListener('change', handleChange);
		}
		
		// 古いブラウザ向け
		mediaQuery.addListener(handleChange);
		return () => mediaQuery.removeListener(handleChange);
	}, []);

	if (!mounted) {
		return (
			<Button variant="ghost" size="icon" className="h-9 w-9">
				<span className="sr-only">テーマを読み込み中</span>
			</Button>
		);
	}

	const iconClasses = "h-[1.2rem] w-[1.2rem] transition-all";
	const activeIconClasses = "opacity-100";
	const inactiveIconClasses = "opacity-0 absolute";

	return (
		<Button
			variant="ghost"
			size="icon"
			className="h-9 w-9 relative"
			onClick={toggleTheme}
			title={`${theme === "light" ? "ライト" : "ダーク"}モード（クリックで切替）`}
		>
			<FaSun
				className={`${iconClasses} ${
					theme === "light" ? activeIconClasses : inactiveIconClasses
				}`}
				aria-label="ライトテーマ"
			/>
			<FaMoon
				className={`${iconClasses} ${
					theme === "dark" ? activeIconClasses : inactiveIconClasses
				}`}
				aria-label="ダークテーマ"
			/>
			<span className="sr-only">テーマを切り替える</span>
		</Button>
	);
}
