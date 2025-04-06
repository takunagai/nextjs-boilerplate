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

// デフォルトのナビゲーショングループ
export const FOOTER_NAVIGATION: FooterNavGroup[] = [
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
