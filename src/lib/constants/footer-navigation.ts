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
			{ label: "機能紹介", href: "/features" },
			{ label: "料金プラン", href: "/pricing" },
			{ label: "導入事例", href: "/case-studies" },
			{ label: "お問い合わせ", href: "/contact" },
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
