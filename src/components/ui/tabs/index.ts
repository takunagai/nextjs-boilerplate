/**
 * Tabsコンポーネント群の統合エクスポート
 *
 * 各コンポーネントは独立したファイルに分割され、
 * 統一したエクスポートインターフェースを提供する
 */

export type { TabsContentProps } from "./tab-content";
// コンテンツエリア
export { TabsContent, tabsContentVariants } from "./tab-content";
export type { TabsListProps } from "./tab-list";
// リストコンテナ
export { TabsList, tabsListVariants } from "./tab-list";
export type { TabsTriggerProps } from "./tab-trigger";
// トリガー（個別タブボタン）
export { TabsTrigger, tabsTriggerVariants } from "./tab-trigger";
// ルートコンテナ
export { Tabs } from "./tabs-root";
