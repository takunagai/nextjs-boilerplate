"use client";

import { Button } from "@/components/ui/button";
import { STORAGE_KEYS } from "@/lib/constants";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeSwitcherContent() {
	const [theme, setThemeState] = useState<Theme>("light");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
		if (storedTheme) {
			setThemeState(storedTheme);
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
			<Sun
				className={`${iconClasses} ${
					theme === "light" ? activeIconClasses : inactiveIconClasses
				}`}
				aria-label="ライトテーマ"
			/>
			<Moon
				className={`${iconClasses} ${
					theme === "dark" ? activeIconClasses : inactiveIconClasses
				}`}
				aria-label="ダークテーマ"
			/>
			<span className="sr-only">テーマを切り替える</span>
		</Button>
	);
}
