/**
 * アプリケーション情報
 */
export const APP = {
  /**
   * アプリケーション名
   */
  NAME: "Next.js Boilerplate",
  
  /**
   * バージョン番号
   */
  VERSION: "0.1.0",
  
  /**
   * アプリケーションの説明
   */
  DESCRIPTION:
    "Next.js、TypeScript、Tailwind CSSを組み合わせた最新のボイラープレートで、高速で美しいWebアプリケーションを構築しましょう。",
  
  /**
   * 著作権所有者
   */
  COPYRIGHT_HOLDER: "nagai-shouten.com"
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

	/**
	 * サンプル機能の表示
	 */
	SHOW_EXAMPLES: true,
} as const;
