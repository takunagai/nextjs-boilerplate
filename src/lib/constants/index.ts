/**
 * すべての定数をエクスポートするインデックスファイル
 * 従来のインポート方法 `import { XXX } from '@/lib/constants'` を維持するために使用
 */

// アプリケーション全般
export { APP, FEATURES } from "./app";
// メタデータ
export { META } from "./meta";
// ルート
export { ROUTES } from "./routes";

// テーマ
export { THEME, THEME_STORAGE_KEY } from "./theme";

// ビジネス情報
export { BUSINESS } from "./business";

// 問い合わせ
// 現在コメントアウトされているため、エクスポートしない
// export { CONTACT } from './contact';

// ストレージ
// 現在コメントアウトされているため、エクスポートしない
// export { STORAGE_KEYS } from './storage';

// API
// 現在コメントアウトされているため、エクスポートしない
// export { API } from './api';

// 日付
// 現在コメントアウトされているため、エクスポートしない
// export { DATE_FORMAT } from './date';

// UI
// 現在コメントアウトされているため、エクスポートしない
// export {
//   IMAGE_SIZES,
//   PAGINATION
// } from './ui';

// リンク
// 現在コメントアウトされているため、エクスポートしない
// export { SOCIAL_LINKS } from './links';

// フッターナビゲーション
export {
	FOOTER_NAVIGATION,
	type FooterLink,
	type FooterNavGroup,
} from "./footer-navigation";
