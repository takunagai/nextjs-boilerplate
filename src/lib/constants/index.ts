/**
 * すべての定数をエクスポートするインデックスファイル
 * 従来のインポート方法 `import { XXX } from '@/lib/constants'` を維持するために使用
 */

// アプリケーション全般
import { APP } from './app';
export { APP, FEATURES } from './app';

// APP定数からの再エクスポート（後方互換性のため）
export const SITE_NAME = APP.NAME;
export const COPYRIGHT_HOLDER = APP.COPYRIGHT_HOLDER;

// ルート
export { ROUTES } from './routes';

// メタデータ
export { META } from './meta';

// テーマ
export { THEME, THEME_STORAGE_KEY } from './theme';

// 問い合わせ
export { CONTACT } from './contact';

// ストレージ
export { STORAGE_KEYS } from './storage';

// API
export { API } from './api';

// 日付
export { DATE_FORMAT } from './date';

// UI
export { 
  IMAGE_SIZES, 
  PAGINATION
} from './ui';

// リンク
export { SOCIAL_LINKS } from './links';
