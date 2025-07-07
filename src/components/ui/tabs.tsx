"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import {
	type ComponentPropsWithoutRef,
	type ElementRef,
	forwardRef,
} from "react";

import { cn } from "@/lib/utils";

/**
 * Tabs - ルートタブコンテナ
 *
 * @description タブパネルのセットを管理するルートコンポーネント
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">タブ1</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">内容1</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = forwardRef<
	ElementRef<typeof TabsPrimitive.Root>,
	ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => (
	<TabsPrimitive.Root
		ref={ref}
		data-slot="tabs"
		className={cn("flex flex-col gap-2", className)}
		{...props}
	/>
));
Tabs.displayName = TabsPrimitive.Root.displayName;

/**
 * TabsList のスタイルバリアント定義
 *
 * @description CVAを使用してTabsListコンポーネントのスタイルを管理
 */
const tabsListVariants = cva(
	[
		// 共通のベーススタイル
		"inline-flex items-center justify-center",
		"text-muted-foreground",
		"transition-colors duration-200",
		// フォーカス管理
		"focus-within:outline-none",
	],
	{
		variants: {
			variant: {
				default: [
					"bg-muted rounded-lg p-1",
					"shadow-sm border border-border/20",
				],
				underline: ["bg-transparent border-b border-border", "pb-0"],
				pills: ["bg-transparent gap-1", "p-1"],
				minimal: ["bg-transparent", "gap-0.5"],
			},
			size: {
				sm: "h-8 text-sm",
				md: "h-9 text-sm",
				lg: "h-10 text-base",
			},
			orientation: {
				horizontal: "flex-row",
				vertical: ["flex-col h-auto w-fit", "space-y-1"],
			},
			scrollable: {
				true: [
					"overflow-x-auto",
					"[-webkit-scrollbar]:hidden [scrollbar-width:none]",
					"snap-x snap-mandatory",
				],
				false: "w-fit",
			},
		},
		compoundVariants: [
			{
				variant: "underline",
				orientation: "vertical",
				class: "border-b-0 border-r border-border",
			},
			{
				scrollable: true,
				orientation: "horizontal",
				class: "w-full",
			},
		],
		defaultVariants: {
			variant: "default",
			size: "md",
			orientation: "horizontal",
			scrollable: false,
		},
	},
);

/**
 * TabsList - タブトリガーのコンテナ
 *
 * @description タブトリガーを配置するコンテナコンポーネント
 * @param variant - スタイルバリアント (default | underline | pills | minimal)
 * @param size - サイズバリアント (sm | md | lg)
 * @param orientation - 方向 (horizontal | vertical)
 * @param scrollable - スクロール可能かどうか
 *
 * @example
 * ```tsx
 * <TabsList variant="underline" size="lg" scrollable>
 *   <TabsTrigger value="tab1">タブ1</TabsTrigger>
 *   <TabsTrigger value="tab2">タブ2</TabsTrigger>
 * </TabsList>
 * ```
 */
interface TabsListProps
	extends ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
		VariantProps<typeof tabsListVariants> {
	/** スクロール可能にするかどうか */
	scrollable?: boolean;
}

const TabsList = forwardRef<
	ElementRef<typeof TabsPrimitive.List>,
	TabsListProps
>(({ className, variant, size, orientation, scrollable, ...props }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		data-slot="tabs-list"
		role="tablist"
		aria-orientation={orientation || undefined}
		className={cn(
			tabsListVariants({ variant, size, orientation, scrollable }),
			className,
		)}
		{...props}
	/>
));
TabsList.displayName = TabsPrimitive.List.displayName;

/**
 * TabsTrigger のスタイルバリアント定義
 *
 * @description CVAを使用してTabsTriggerコンポーネントのスタイルを管理
 */
const tabsTriggerVariants = cva(
	[
		// ベーススタイル
		"inline-flex items-center justify-center gap-2",
		"whitespace-nowrap font-medium",
		"transition-all duration-200",
		// フォーカス管理
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
		// 無効状態
		"disabled:pointer-events-none disabled:opacity-50",
		// アイコンのスタイル
		"[&_svg]:pointer-events-none [&_svg]:shrink-0",
		// スクロールスナップ
		"snap-start",
	],
	{
		variants: {
			variant: {
				default: [
					"rounded-md px-3 py-1.5",
					"hover:bg-accent/50 hover:text-accent-foreground",
					"data-[state=active]:bg-background data-[state=active]:text-foreground",
					"data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-border/20",
				],
				underline: [
					"rounded-none border-b-2 border-transparent px-3 py-2",
					"hover:text-foreground hover:border-border",
					"data-[state=active]:border-primary data-[state=active]:text-foreground",
					"data-[state=active]:bg-accent/20",
				],
				pills: [
					"rounded-full px-4 py-2 bg-transparent",
					"hover:bg-muted hover:text-muted-foreground",
					"data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
					"data-[state=active]:shadow-md",
				],
				minimal: [
					"rounded-md px-3 py-1.5 bg-transparent",
					"hover:bg-muted/70 hover:text-foreground",
					"data-[state=active]:bg-muted data-[state=active]:text-foreground",
					"data-[state=active]:font-semibold",
				],
			},
			size: {
				sm: [
					"text-xs h-8 min-w-[60px] px-2",
					"[&_svg:not([class*='size-'])]:size-3",
				],
				md: [
					"text-sm h-9 min-w-[80px] px-3",
					"[&_svg:not([class*='size-'])]:size-4",
				],
				lg: [
					"text-base h-10 min-w-[100px] px-4",
					"[&_svg:not([class*='size-'])]:size-5",
				],
			},
		},
		compoundVariants: [
			{
				variant: "underline",
				size: "sm",
				class: "py-1.5",
			},
			{
				variant: "pills",
				size: "lg",
				class: "px-5",
			},
		],
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

/**
 * TabsTrigger - 個別のタブボタン
 *
 * @description クリック可能なタブトリガーコンポーネント
 * @param variant - スタイルバリアント (default | underline | pills | minimal)
 * @param size - サイズバリアント (sm | md | lg)
 * @param value - タブの一意識別子（必須）
 * @param disabled - 無効状態
 *
 * @example
 * ```tsx
 * <TabsTrigger value="tab1" variant="pills" size="lg">
 *   <Icon className="w-4 h-4" />
 *   タブ1
 * </TabsTrigger>
 * ```
 */
interface TabsTriggerProps
	extends ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
		VariantProps<typeof tabsTriggerVariants> {
	/** タブの一意識別子 */
	value: string;
}

const TabsTrigger = forwardRef<
	ElementRef<typeof TabsPrimitive.Trigger>,
	TabsTriggerProps
>(({ className, variant, size, ...props }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		data-slot="tabs-trigger"
		role="tab"
		className={cn(tabsTriggerVariants({ variant, size }), className)}
		{...props}
	/>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

/**
 * TabsContent のスタイルバリアント定義
 *
 * @description CVAを使用してTabsContentコンポーネントのスタイルを管理
 */
const tabsContentVariants = cva(
	[
		// ベーススタイル
		"flex-1 w-full",
		"transition-all duration-300 ease-in-out",
		// フォーカス管理
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
		// アニメーション
		"data-[state=active]:animate-in data-[state=active]:fade-in-0",
		"data-[state=inactive]:animate-out data-[state=inactive]:fade-out-0",
	],
	{
		variants: {
			variant: {
				default: "mt-2 pt-2",
				underline: "mt-4 pt-4 border-t border-transparent",
				pills: "mt-4 pt-2",
				minimal: "mt-2 pt-1",
			},
			spacing: {
				none: "mt-0 pt-0",
				sm: "mt-2 pt-2",
				md: "mt-4 pt-4",
				lg: "mt-6 pt-6",
			},
		},
		compoundVariants: [
			{
				variant: "underline",
				spacing: "lg",
				class: "border-t-border",
			},
		],
		defaultVariants: {
			variant: "default",
			spacing: "md",
		},
	},
);

/**
 * TabsContent - タブのコンテンツエリア
 *
 * @description 選択されたタブに対応するコンテンツを表示するコンポーネント
 * @param variant - スタイルバリアント (default | underline | pills | minimal)
 * @param spacing - コンテンツの間隔 (none | sm | md | lg)
 * @param value - 対応するタブの識別子（必須）
 * @param forceMount - 非アクティブでもマウントするかどうか
 *
 * @example
 * ```tsx
 * <TabsContent value="tab1" variant="underline" spacing="lg">
 *   <div>タブ1の内容</div>
 * </TabsContent>
 * ```
 */
interface TabsContentProps
	extends ComponentPropsWithoutRef<typeof TabsPrimitive.Content>,
		VariantProps<typeof tabsContentVariants> {
	/** 対応するタブの識別子 */
	value: string;
	/** コンテンツの間隔 */
	spacing?: "none" | "sm" | "md" | "lg";
}

const TabsContent = forwardRef<
	ElementRef<typeof TabsPrimitive.Content>,
	TabsContentProps
>(({ className, variant, spacing, ...props }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		data-slot="tabs-content"
		role="tabpanel"
		className={cn(tabsContentVariants({ variant, spacing }), className)}
		{...props}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

// エクスポート
export { Tabs, TabsContent, TabsList, TabsTrigger };
export type { TabsListProps, TabsTriggerProps, TabsContentProps };
