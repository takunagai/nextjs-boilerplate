import type { ReactNode } from "react";
import { FaCode, FaLightbulb, FaPaintbrush } from "react-icons/fa6";

// ヘッダーのナビゲーションリンク型定義
export interface HeaderLink {
	label: string;
	href: string;
	icon?: ReactNode;
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
			{ 
				label: "ウェブ制作・アプリ開発", 
				href: "/services/web-development",
				icon: <FaCode className="w-3.5 h-3.5 text-muted-foreground" />
			},
			{
				label: "AIコンサル＆サポート",
				href: "/services/ai-consulting-and-support",
				icon: <FaLightbulb className="w-3.5 h-3.5 text-muted-foreground" />
			},
			{ 
				label: "クリエイティブ", 
				href: "/services/creative",
				icon: <FaPaintbrush className="w-3.5 h-3.5 text-muted-foreground" />
			},
			{ label: "写真撮影", href: "/services/photography" },
			{ label: "AI画像生成・画像補正", href: "/services/ai-image-generation" },
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
