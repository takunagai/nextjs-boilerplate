/**
 * Tabs - ルートタブコンテナコンポーネント
 */
"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
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

export { Tabs };
