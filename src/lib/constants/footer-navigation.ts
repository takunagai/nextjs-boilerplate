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
			{
				label: "AIコンサル＆サポート",
				href: "/services/ai-consulting-and-support",
			},
			{ label: "クリエイティブ", href: "/services/creative" },
			{ label: "フロントエンドリペア", href: "/services/web-development/frontend-repair" },
			{ label: "写真撮影", href: "/services/photography" },
			{ label: "AI画像生成・画像補正", href: "/services/ai-image-generation" },
		],
	},
	{
		title: "情報",
		links: [
			{ label: "ニュース", href: "/news" },
			{ label: "ポートフォリオ", href: "/portfolio" },
			{ label: "お問い合わせ", href: "/contact" },
		],
	},
	{
		title: "会社情報",
		links: [
			{ label: "プロフィール", href: "/about" },
			{ label: "プライバシーポリシー", href: "/privacy" },
		],
	},
];
