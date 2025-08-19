/**
 * UI関連の定数定義
 */

// アニメーション・タイミング関連
export const UI_TIMING = {
	/** デモギャラリーの遅延時間（ms） */
	DEMO_DELAY: 2000,
	/** クリックデバウンス時間（ms） */
	CLICK_DEBOUNCE: 300,
	/** デフォルトアニメーション持続時間（ms） */
	DEFAULT_ANIMATION_DURATION: 300,
	/** フェードトランジション時間（ms） */
	FADE_TRANSITION: 150,
	/** ホバートランジション時間（ms） */
	HOVER_TRANSITION: 200,
} as const;

// ブレークポイント関連
export const UI_BREAKPOINTS = {
	/** モバイル最大幅 */
	MOBILE_MAX: 768,
	/** タブレット最大幅 */
	TABLET_MAX: 1024,
	/** デスクトップ最小幅 */
	DESKTOP_MIN: 1025,
} as const;

// レイアウト関連
export const UI_LAYOUT = {
	/** ヘッダー高さ（px） */
	HEADER_HEIGHT: 64,
	/** フッター高さ（px） */
	FOOTER_HEIGHT: 200,
	/** サイドバー幅（px） */
	SIDEBAR_WIDTH: 280,
	/** コンテナ最大幅（px） */
	CONTAINER_MAX_WIDTH: 1200,
} as const;

// ギャラリー関連
export const UI_GALLERY = {
	/** ライトボックスzIndex */
	LIGHTBOX_Z_INDEX: 9999,
	/** 画像読み込み遅延（ms） */
	IMAGE_LOAD_DELAY: 100,
	/** スワイプ感度（px） */
	SWIPE_THRESHOLD: 50,
	/** キーボードナビゲーション遅延（ms） */
	KEYBOARD_NAV_DELAY: 100,
} as const;

// フォーム関連
export const UI_FORM = {
	/** 送信ボタン無効化時間（ms） */
	SUBMIT_DEBOUNCE: 1000,
	/** バリデーション遅延（ms） */
	VALIDATION_DELAY: 300,
	/** エラーメッセージ表示時間（ms） */
	ERROR_DISPLAY_DURATION: 5000,
} as const;

// 通知・トースト関連
export const UI_TOAST = {
	/** デフォルト表示時間（ms） */
	DEFAULT_DURATION: 4000,
	/** 成功メッセージ表示時間（ms） */
	SUCCESS_DURATION: 3000,
	/** エラーメッセージ表示時間（ms） */
	ERROR_DURATION: 6000,
	/** 最大表示数 */
	MAX_VISIBLE: 5,
} as const;

// 検索・フィルタリング関連
export const UI_SEARCH = {
	/** 検索入力デバウンス（ms） */
	INPUT_DEBOUNCE: 500,
	/** 最小検索文字数 */
	MIN_SEARCH_LENGTH: 2,
	/** 検索結果最大表示数 */
	MAX_RESULTS: 50,
} as const;

// パフォーマンス関連
export const UI_PERFORMANCE = {
	/** 仮想化開始アイテム数 */
	VIRTUALIZATION_THRESHOLD: 100,
	/** 遅延読み込み開始距離（px） */
	LAZY_LOAD_OFFSET: 200,
	/** リサイズデバウンス（ms） */
	RESIZE_DEBOUNCE: 150,
} as const;

// FlowingComments関連
export const UI_FLOWING_COMMENTS = {
	/** デスクトップブレークポイント（px） */
	DESKTOP_BREAKPOINT: 768,
	/** デスクトップ基本フォントサイズ（rem） */
	DESKTOP_BASE_SIZE: 1.2,
	/** デスクトップサイズ範囲（rem） */
	DESKTOP_SIZE_RANGE: 0.6,
	/** モバイル基本フォントサイズ（rem） */
	MOBILE_BASE_SIZE: 0.7,
	/** モバイルサイズ範囲（rem） */
	MOBILE_SIZE_RANGE: 0.3,
	/** アニメーション継続時間最小値（秒） */
	DURATION_MIN: 15,
	/** アニメーション継続時間最大値（秒） */
	DURATION_MAX: 25,
	/** 初期遅延最大値（秒） */
	INITIAL_DELAY_MAX: 20,
	/** 更新時遅延最大値（秒） */
	UPDATE_DELAY_MAX: 5,
	/** コメント更新間隔（ms） */
	UPDATE_INTERVAL: 30000,
	/** 配置範囲上部制限（%） */
	TOP_LIMIT: 10,
	/** 配置範囲下部制限（%） */
	BOTTOM_LIMIT: 90,
	/** デフォルト最大コメント数 */
	DEFAULT_MAX_COMMENTS: 15,
	/** モバイル向け最大コメント数 */
	MOBILE_MAX_COMMENTS: 8,
	/** デスクトップ向け最大コメント数 */
	DESKTOP_MAX_COMMENTS: 20,
} as const;

// AnimatedItemList関連
export const UI_ANIMATED_LIST = {
	/** デフォルト切り替え間隔（秒） */
	DEFAULT_INTERVAL_SECONDS: 5,
	/** デフォルトアニメーション継続時間（秒） */
	DEFAULT_ANIMATION_DURATION: 1,
	/** デフォルト時差遅延（秒） */
	DEFAULT_STAGGER_DELAY: 0.1,
	/** アニメーション時間を秒からミリ秒に変換する係数 */
	SECONDS_TO_MILLISECONDS: 1000,
	/** アニメーション切り替えタイミング（アニメーション時間の50%地点） */
	ANIMATION_SWITCH_RATIO: 2,
	/** インジゲーター表示最小アイテム数 */
	MIN_ITEMS_FOR_INDICATOR: 1,
	/** アニメーションキー増分値 */
	ANIMATION_KEY_INCREMENT: 1,
	/** インジゲーターボタンサイズ（Tailwind w-2 h-2に対応） */
	INDICATOR_SIZE: 8,
	/** アクティブインジゲーターのスケール */
	ACTIVE_INDICATOR_SCALE: 110,
	/** ホバー時インジゲーターのスケール */
	HOVER_INDICATOR_SCALE: 105,
	/** インジゲータートランジション時間（ms） */
	INDICATOR_TRANSITION_DURATION: 300,
} as const;
