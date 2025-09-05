import React from "react";

// ヘッダーのナビゲーションリンク型定義
export interface HeaderLink {
	label: string;
	href: string;
	icon?: React.ReactNode;
	submenu?: HeaderLink[];
	external?: boolean;
}

/**
 * ヘッダーナビゲーションの定数
 * @description ヘッダー部分のナビゲーションリンク
 */
export const HEADER_NAVIGATION: HeaderLink[] = [
	{
		label: "ホーム",
		href: "/",
	},
	{
		label: "About",
		href: "/about",
	},
	{
		label: "サービス",
		href: "/services",
		submenu: [
			{ label: "サービス一覧", href: "/services" },
			{ label: "ウェブ制作・アプリ開発", href: "/services/web-development" },
			{
				label: "AIコンサル＆サポート",
				href: "/services/ai-consulting-and-support",
			},
			{ label: "クリエイティブ", href: "/services/creative" },
		],
	},
	{
		label: "制作実績",
		href: "/portfolio",
	},
	{
		label: "お知らせ",
		href: "/news",
	},
	{
		label: "お問合せ",
		href: "/contact",
	},
	{
		label: "サンプル",
		href: "/examples",
	},
];
