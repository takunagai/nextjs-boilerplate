/**
 * アプリケーション全般の設定に関する定数
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
 * 機能フラグ
 * 機能のON/OFFを制御する定数
 */
export const FEATURES = {
  /**
   * テーマ切り替え機能 (ダークモード)
   * falseに設定すると、テーマ切り替えボタンが非表示になり、デフォルトのテーマのみが使用されます
   */
  THEME_SWITCHER: true,
} as const;
