/**
 * Tabsコンポーネント群（統一エクスポート）
 * 
 * このファイルは後方互換性のため、分割されたコンポーネントを
 * 再エクスポートする役割を果たします。
 * 
 * 実際の実装は /tabs/ ディレクトリ内の個別ファイルに分割されています：
 * - /tabs/tabs-root.tsx
 * - /tabs/tab-list.tsx  
 * - /tabs/tab-trigger.tsx
 * - /tabs/tab-content.tsx
 */

export {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsContent,
	tabsListVariants,
	tabsTriggerVariants,
	tabsContentVariants,
} from "./tabs/";

export type {
	TabsListProps,
	TabsTriggerProps,
	TabsContentProps,
} from "./tabs/";
