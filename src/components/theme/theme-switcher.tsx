"use client";

import { FEATURES } from "@/lib/constants";
import dynamic from "next/dynamic";

// プレースホルダーをコンポーネントとして分離
const ThemeSwitcherPlaceholder = dynamic(
	() => import("./theme-switcher-placeholder"),
	{ ssr: true }, // プレースホルダーはSSRでも問題ないので有効化
);

// 動的インポートでテーマスイッチャーの内部コンポーネントをロード
const ThemeSwitcherContent = dynamic(() => import("./theme-switcher-content"), {
	ssr: false,
	loading: () => <ThemeSwitcherPlaceholder />,
});

export function ThemeSwitcher() {
	// 機能フラグがOFFの場合は何も表示しない
	if (!FEATURES.THEME_SWITCHER) {
		return null;
	}

	return <ThemeSwitcherContent />;
}
