/**
 * TabsList - タブトリガーのコンテナコンポーネント
 */
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
					"bg-muted rounded-t-lg pt-1 px-1",
					"shadow-sm border border-border/20 border-b-0",
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

export { TabsList, tabsListVariants };
export type { TabsListProps };