// フッターのナビゲーションリンク型定義
export interface FooterLink {
	label: string;
	href: string;
	external?: boolean;
}

// フッターのナビゲーショングループ型定義
export interface FooterNavGroup {
	title: string;
	links: FooterLink[];
}

// 要素数を最大4つに制限するタプル型
export type MaxFourNavGroups =
	| [FooterNavGroup]
	| [FooterNavGroup, FooterNavGroup]
	| [FooterNavGroup, FooterNavGroup, FooterNavGroup]
	| [FooterNavGroup, FooterNavGroup, FooterNavGroup, FooterNavGroup];

/**
 * フッターナビゲーションの定数
 * @note 配列の最大数は4です。これを超える場合、最初の4つのみが表示されます。
 */
export const FOOTER_NAVIGATION: MaxFourNavGroups = [
	{
		title: "サービス",
		links: [
			{ label: "サービス一覧", href: "/services" },
			{ label: "ウェブ制作・アプリ開発", href: "/services/web-development" },
			{ label: "AIコンサル＆サポート", href: "/services/ai-consulting-and-support" },
			{ label: "クリエイティブ", href: "/services/creative" },
		],
	},
	{
		title: "サポート",
		links: [
			{ label: "ドキュメント", href: "/docs" },
			{ label: "FAQ", href: "/faq" },
			{ label: "開発者向け", href: "/developers" },
		],
	},
	{
		title: "会社情報",
		links: [
			{ label: "About Us", href: "/about" },
			{ label: "採用情報", href: "/careers" },
			{ label: "プライバシーポリシー", href: "/privacy" },
		],
	},
];
