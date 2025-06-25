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