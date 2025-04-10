// ヘッダーのナビゲーションリンク型定義
export interface HeaderLink {
	label: string;
	href: string;
	external?: boolean;
}

/**
 * ヘッダーナビゲーションの定数
 * @description ヘッダー部分のナビゲーションリンク
 */
export const HEADER_NAVIGATION: HeaderLink[] = [
	{ label: "ホーム", href: "/" },
	{ label: "自己紹介", href: "/about" },
	{ label: "お問い合わせ", href: "/contact" },
	{ label: "プライバシーポリシー", href: "/privacy" },
];
