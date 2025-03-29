/**
 * アプリケーション全体で使用する定数
 * 環境変数に依存しない固定値を定義します
 */

/**
 * サイト名
 * 環境変数 NEXT_PUBLIC_SITE_NAME から取得し、未設定の場合はデフォルト値を使用
 */
export const SITE_NAME =
	process.env.NEXT_PUBLIC_SITE_NAME || "Next.js Boilerplate";

/**
 * 著作権所有者
 */
export const COPYRIGHT_HOLDER = "nagai-shouten.com";

/**
 * アプリケーション情報
 */
export const APP = {
	NAME: SITE_NAME,
	DESCRIPTION:
		"Next.js、TypeScript、Tailwind CSSを組み合わせた最新のボイラープレートで、高速で美しいWebアプリケーションを構築しましょう。",
	VERSION: "0.1.0",
} as const;

/**
 * ルート情報
 */
export const ROUTES = {
	HOME: "/",
	ABOUT: "/about",
	CONTACT: "/contact",
	PRIVACY: "/privacy",
} as const;

/**
 * メタデータ
 */
export const META = {
	TITLE_TEMPLATE: `%s | ${SITE_NAME}`,
	DEFAULT_TITLE: SITE_NAME,
	DEFAULT_DESCRIPTION: APP.DESCRIPTION,
	SITE_URL: "https://nextjs-boilerplate.example.com",
	OG_IMAGE: "/images/og-image.jpg",
	LOCALE: "ja_JP",
	TYPE: "website",
	TWITTER_HANDLE: "@yourhandle",
	TWITTER_CARD_TYPE: "summary_large_image",
	FAVICON: "/favicon.ico",
	APPLE_TOUCH_ICON: "/apple-touch-icon.png",
	MANIFEST: "/site.webmanifest",
} as const;

/**
 * 問い合わせフォーム
 */
export const CONTACT = {
	EMAIL: "contact@example.com",
	PHONE: "03-1234-5678",
	LINE_URL: "https://line.me/ti/p/example",
} as const;

/**
 * 外部リンク
 */
export const EXTERNAL_LINKS = {
	GITHUB: "https://github.com/example/nextjs-boilerplate",
	TWITTER: "https://twitter.com/example",
	FACEBOOK: "https://facebook.com/example",
} as const;

/**
 * 日付フォーマット
 */
export const DATE_FORMAT = {
	FULL: "yyyy年MM月dd日 HH:mm",
	DATE_ONLY: "yyyy年MM月dd日",
	TIME_ONLY: "HH:mm",
	ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const;

/**
 * ページネーション
 */
export const PAGINATION = {
	DEFAULT_PAGE: 1,
	DEFAULT_PER_PAGE: 10,
	MAX_PER_PAGE: 100,
} as const;

/**
 * 機能フラグ
 * 機能のON/OFFを制御する定数
 */
export const FEATURES = {
	/**
	 * テーマ切り替え機能
	 * falseに設定すると、テーマ切り替えボタンが非表示になり、デフォルトのテーマのみが使用されます
	 */
	THEME_SWITCHER: true,
} as const;

/**
 * テーマ設定
 */
export const THEME = {
	/**
	 * デフォルトテーマ
	 * "light", "dark", "system" のいずれかを指定
	 */
	DEFAULT: "light",
} as const;

/**
 * ローカルストレージキー
 */
export const STORAGE_KEYS = {
	THEME: "theme",
	AUTH_TOKEN: "auth_token",
	USER_PREFERENCES: "user_preferences",
} as const;

/**
 * API エンドポイント
 */
export const API = {
	BASE_URL: "/api",
	ENDPOINTS: {
		AUTH: "/auth",
		USERS: "/users",
		CONTACT: "/contact",
	},
} as const;

/**
 * 画像サイズ
 */
export const IMAGE_SIZES = {
	THUMBNAIL: { width: 100, height: 100 },
	SMALL: { width: 300, height: 200 },
	MEDIUM: { width: 600, height: 400 },
	LARGE: { width: 1200, height: 800 },
} as const;
