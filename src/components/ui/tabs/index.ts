/**
 * Tabsコンポーネント群の統合エクスポート
 * 
 * 各コンポーネントは独立したファイルに分割され、
 * 統一したエクスポートインターフェースを提供する
 */

// ルートコンテナ
export { Tabs } from "./tabs-root";

// リストコンテナ
export { TabsList, tabsListVariants } from "./tab-list";
export type { TabsListProps } from "./tab-list";

// トリガー（個別タブボタン）
export { TabsTrigger, tabsTriggerVariants } from "./tab-trigger";
export type { TabsTriggerProps } from "./tab-trigger";

// コンテンツエリア
export { TabsContent, tabsContentVariants } from "./tab-content";
export type { TabsContentProps } from "./tab-content";