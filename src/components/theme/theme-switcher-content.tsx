"use client";

import { FaMoon, FaSun } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { useThemeToggle } from "@/hooks/use-theme-toggle";

export default function ThemeSwitcherContent() {
	const { theme, toggleTheme, mounted } = useThemeToggle();

	// マウントされるまではnullを返す
	// (親コンポーネントのプレースホルダーが表示される)
	if (!mounted) {
		return null;
	}

	// アイコンの共通スタイル
	const iconClass = "h-[1.2rem] w-[1.2rem] transition-all";

	return (
		<Button
			variant="ghost"
			size="icon"
			className="h-9 w-9 relative"
			onClick={toggleTheme}
			title={`${theme === "dark" ? "ダーク" : "ライト"}モード（クリックで切替）`}
		>
			<FaSun
				className={`${iconClass} ${
					theme === "light" ? "opacity-100" : "opacity-0 absolute"
				}`}
				aria-label="ライトテーマ"
			/>
			<FaMoon
				className={`${iconClass} ${
					theme === "dark" ? "opacity-100" : "opacity-0 absolute"
				}`}
				aria-label="ダークテーマ"
			/>
			<span className="sr-only">テーマを切り替える</span>
		</Button>
	);
}
