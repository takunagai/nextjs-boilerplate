/**
 * TabsContent - タブのコンテンツエリアコンポーネント
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
 * TabsContent のスタイルバリアント定義
 *
 * @description CVAを使用してTabsContentコンポーネントのスタイルを管理
 */
const tabsContentVariants = cva(
	[
		// ベーススタイル
		"flex-1 w-full relative",
		// レイアウト安定化
		"min-h-[2rem]",
		// GPU最適化トランジション（opacityとtransformのみ）
		"transition-opacity duration-150 ease-out",
		"transform-gpu will-change-[opacity]",
		// フォーカス管理
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
		// スムーズなフェード効果（Radix UIとの競合回避）
		"data-[state=active]:opacity-100",
		"data-[state=inactive]:opacity-0 data-[state=inactive]:pointer-events-none",
	],
	{
		variants: {
			variant: {
				default: "pt-2 border-t border-border/20",
				underline: "pt-4 border-t border-transparent",
				pills: "pt-2",
				minimal: "pt-1",
			},
			spacing: {
				none: "pt-0",
				sm: "pt-2",
				md: "pt-4",
				lg: "pt-6",
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

export { TabsContent, tabsContentVariants };
export type { TabsContentProps };
