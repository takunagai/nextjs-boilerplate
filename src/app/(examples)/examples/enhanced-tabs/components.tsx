"use client";

import { memo, useId } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
	Tabs,
	TabsContent,
	TabsList,
	type TabsListProps,
	TabsTrigger,
} from "@/components/ui/tabs";
import type {
	DashboardStat,
	DemoSectionProps,
	FormField,
	TabItem,
	TabSizeInfo,
	TabVariantInfo,
} from "./types";

/**
 * デモセクションのラッパーコンポーネント
 */
export const DemoSection = memo<DemoSectionProps>(
	({ title, description, children }) => (
		<section>
			<h2 className="text-2xl font-bold mb-2">{title}</h2>
			{description && <p className="text-gray-600 mb-6">{description}</p>}
			{children}
		</section>
	),
);
DemoSection.displayName = "DemoSection";

/**
 * バリアントデモカード
 */
export const VariantDemoCard = memo<{
	variantInfo: TabVariantInfo;
}>(({ variantInfo }) => (
	<Card className="p-6">
		<h3 className="text-lg font-semibold mb-2">{variantInfo.name}スタイル</h3>
		{variantInfo.description && (
			<p className="text-sm text-gray-600 mb-4">{variantInfo.description}</p>
		)}
		<Tabs defaultValue="tab1" className="w-full">
			<TabsList
				variant={variantInfo.variant}
				className="grid w-full grid-cols-3"
			>
				<TabsTrigger value="tab1" variant={variantInfo.variant}>
					タブ1
				</TabsTrigger>
				<TabsTrigger value="tab2" variant={variantInfo.variant}>
					タブ2
				</TabsTrigger>
				<TabsTrigger value="tab3" variant={variantInfo.variant}>
					タブ3
				</TabsTrigger>
			</TabsList>
			<TabsContent value="tab1" variant={variantInfo.variant}>
				<div className="p-4 bg-gray-50 rounded-lg">
					<h4 className="font-medium mb-2">タブ1の内容</h4>
					<p className="text-sm text-gray-600">
						これは{variantInfo.name}スタイルのタブ1の内容です。
					</p>
				</div>
			</TabsContent>
			<TabsContent value="tab2" variant={variantInfo.variant}>
				<div className="p-4 bg-gray-50 rounded-lg">
					<h4 className="font-medium mb-2">タブ2の内容</h4>
					<p className="text-sm text-gray-600">
						これは{variantInfo.name}スタイルのタブ2の内容です。
					</p>
				</div>
			</TabsContent>
			<TabsContent value="tab3" variant={variantInfo.variant}>
				<div className="p-4 bg-gray-50 rounded-lg">
					<h4 className="font-medium mb-2">タブ3の内容</h4>
					<p className="text-sm text-gray-600">
						これは{variantInfo.name}スタイルのタブ3の内容です。
					</p>
				</div>
			</TabsContent>
		</Tabs>
	</Card>
));
VariantDemoCard.displayName = "VariantDemoCard";

/**
 * サイズデモカード
 */
export const SizeDemoCard = memo<{
	sizeInfo: TabSizeInfo;
}>(({ sizeInfo }) => (
	<Card className="p-6">
		<h3 className="text-lg font-semibold mb-2">{sizeInfo.name}サイズ</h3>
		{sizeInfo.description && (
			<p className="text-sm text-gray-600 mb-4">{sizeInfo.description}</p>
		)}
		<Tabs defaultValue="tab1" className="w-full">
			<TabsList size={sizeInfo.size} className="grid w-full grid-cols-2">
				<TabsTrigger value="tab1" size={sizeInfo.size}>
					タブ1
				</TabsTrigger>
				<TabsTrigger value="tab2" size={sizeInfo.size}>
					タブ2
				</TabsTrigger>
			</TabsList>
			<TabsContent value="tab1">
				<div className="p-4 bg-gray-50 rounded-lg">
					<p className="text-sm text-gray-600">
						{sizeInfo.name}サイズのタブ1の内容です。
					</p>
				</div>
			</TabsContent>
			<TabsContent value="tab2">
				<div className="p-4 bg-gray-50 rounded-lg">
					<p className="text-sm text-gray-600">
						{sizeInfo.name}サイズのタブ2の内容です。
					</p>
				</div>
			</TabsContent>
		</Tabs>
	</Card>
));
SizeDemoCard.displayName = "SizeDemoCard";

/**
 * ダッシュボード統計カード
 */
export const StatCard = memo<{
	stat: DashboardStat;
}>(({ stat }) => {
	const colorClasses = {
		blue: "text-blue-600",
		green: "text-green-600",
		purple: "text-purple-600",
		yellow: "text-yellow-600",
		red: "text-red-600",
	};

	const badgeVariants = {
		positive: "secondary" as const,
		negative: "destructive" as const,
		neutral: "outline" as const,
	};

	return (
		<div className="bg-white p-4 rounded-lg">
			<div className="flex items-center justify-between">
				<span className="text-sm text-gray-600">{stat.label}</span>
				{stat.change && (
					<Badge
						variant={badgeVariants[stat.changeType ?? "neutral"]}
						className="text-xs"
					>
						{stat.change}
					</Badge>
				)}
			</div>
			<div className={`text-2xl font-bold ${colorClasses[stat.color]}`}>
				{stat.value}
			</div>
		</div>
	);
});
StatCard.displayName = "StatCard";

/**
 * アクセシブルなフォームフィールド
 */
export const AccessibleFormField = memo<{
	field: FormField;
	value?: string;
	onChange?: (value: string) => void;
}>(({ field, value = "", onChange }) => {
	const id = useId();
	const fieldId = `${id}-${field.id}`;

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		onChange?.(e.target.value);
	};

	return (
		<div>
			<label htmlFor={fieldId} className="block text-sm font-medium mb-1">
				{field.label}
				{field.required && <span className="text-red-500 ml-1">*</span>}
			</label>
			{field.type === "textarea" ? (
				<textarea
					id={fieldId}
					className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					placeholder={field.placeholder}
					rows={field.rows}
					value={value}
					onChange={handleChange}
					aria-describedby={field.required ? `${fieldId}-required` : undefined}
				/>
			) : (
				<input
					id={fieldId}
					type={field.type}
					className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					placeholder={field.placeholder}
					value={value}
					onChange={handleChange}
					aria-describedby={field.required ? `${fieldId}-required` : undefined}
				/>
			)}
			{field.required && (
				<div id={`${fieldId}-required`} className="sr-only">
					この項目は必須です
				</div>
			)}
		</div>
	);
});
AccessibleFormField.displayName = "AccessibleFormField";

/**
 * タブアイテムレンダラー
 */
export const TabItemRenderer = memo<{
	items: readonly TabItem[];
	variant?: TabsListProps["variant"];
	size?: TabsListProps["size"];
	orientation?: TabsListProps["orientation"];
	scrollable?: boolean;
	showContent?: boolean;
	contentClassName?: string;
}>(
	({
		items,
		variant,
		size,
		orientation,
		scrollable,
		showContent = true,
		contentClassName,
	}) => (
		<Tabs defaultValue={items[0]?.id} className="w-full">
			<TabsList
				variant={variant}
				size={size}
				orientation={orientation}
				scrollable={scrollable}
				className={
					scrollable || orientation === "vertical"
						? undefined
						: `grid w-full grid-cols-${Math.min(items.length, 4)}`
				}
			>
				{items.map((item) => (
					<TabsTrigger
						key={item.id}
						value={item.id}
						variant={variant}
						size={size}
						disabled={item.disabled}
						className={
							orientation === "vertical"
								? "w-full justify-start"
								: scrollable
									? "flex-shrink-0"
									: undefined
						}
					>
						{item.icon && <item.icon className="w-4 h-4 mr-2" />}
						{item.label}
					</TabsTrigger>
				))}
			</TabsList>
			{showContent &&
				items.map((item) => (
					<TabsContent
						key={item.id}
						value={item.id}
						variant={variant}
						className={contentClassName}
					>
						<div className="p-6 bg-gray-50 rounded-lg">
							<h3 className="text-lg font-semibold mb-3 flex items-center">
								{item.icon && <item.icon className="w-5 h-5 mr-2" />}
								{item.label}
							</h3>
							<p className="text-gray-600">
								{item.content ??
									`${item.label}に関する詳細な情報と機能がここに表示されます。`}
							</p>
						</div>
					</TabsContent>
				))}
		</Tabs>
	),
);
TabItemRenderer.displayName = "TabItemRenderer";
