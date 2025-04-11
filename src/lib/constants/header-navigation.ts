// ヘッダーのナビゲーションリンク型定義
export interface HeaderLink {
	label: string;
	href: string;
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
			{ label: "コンサルティング", href: "/services/consulting" },
			{ label: "開発", href: "/services/development" },
			{ label: "トレーニング", href: "/services/training" },
		],
	},
	{
		label: "お知らせ",
		href: "/news",
	},
	{
		label: "お問合せ",
		href: "/contact",
	},
];
