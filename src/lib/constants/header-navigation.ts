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
			{ label: "サービス一覧", href: "/services" },
			{ label: "ウェブ制作", href: "/services/web-development" },
			{ label: "アプリ開発", href: "/services/app-development" },
			{ label: "コンサルティング", href: "/services/consulting" },
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
