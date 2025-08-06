/**
 * TabsTrigger - 個別のタブボタンコンポーネント
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
					"rounded-t-md px-3 py-1.5",
					"hover:bg-accent/50 hover:text-accent-foreground",
					"data-[state=active]:bg-background data-[state=active]:text-foreground",
					"data-[state=active]:shadow-[0_-1px_3px_0_rgb(0_0_0_/_0.1),1px_0_2px_0_rgb(0_0_0_/_0.1),-1px_0_2px_0_rgb(0_0_0_/_0.1)]",
					"data-[state=active]:border data-[state=active]:border-border/20",
					"data-[state=active]:border-b-0",
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

export { TabsTrigger, tabsTriggerVariants };
export type { TabsTriggerProps };