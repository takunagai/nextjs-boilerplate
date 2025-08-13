"use client";

import { memo, useCallback, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	AccessibleFormField,
	DemoSection,
	SizeDemoCard,
	StatCard,
	TabItemRenderer,
	VariantDemoCard,
} from "./components";
import {
	CONTROLLED_TABS,
	DASHBOARD_STATS,
	DEMO_SECTIONS,
	MANY_TABS,
	NAVIGATION_TABS,
	PROFILE_FORM_FIELDS,
	TAB_SIZES,
	TAB_VARIANTS,
	VERTICAL_TABS,
} from "./data";

/**
 * 拡張Tabsコンポーネントのデモページ
 *
 * @description レスポンシブ対応で汎用性の高いタブコンポーネントの
 * 包括的なデモンストレーションページ
 */
const EnhancedTabsPage = memo(() => {
	const [activeTab, setActiveTab] = useState<string>("overview");
	const [formData, setFormData] = useState<Record<string, string>>({});

	// フォームデータ更新のコールバック
	const handleFormFieldChange = useCallback(
		(fieldId: string, value: string) => {
			setFormData((prev) => ({ ...prev, [fieldId]: value }));
		},
		[],
	);

	// アクティブタブ変更のコールバック
	const handleTabChange = useCallback((value: string) => {
		setActiveTab(value);
	}, []);

	return (
		<Container className="my-8" paddingY="lg" paddingX="2xl">
			<PageHeader title="拡張Tabsコンポーネント" />
			<p className="mb-8 text-gray-600">
				レスポンシブ対応で汎用性の高いタブコンポーネントのデモンストレーション
			</p>

			<main className="space-y-12">
				{/* 基本的なバリアント */}
				<DemoSection
					title={DEMO_SECTIONS.variants.title}
					description={DEMO_SECTIONS.variants.description}
				>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						{TAB_VARIANTS.map((variantInfo) => (
							<VariantDemoCard
								key={variantInfo.variant}
								variantInfo={variantInfo}
							/>
						))}
					</div>
				</DemoSection>

				{/* サイズバリアント */}
				<DemoSection
					title={DEMO_SECTIONS.sizes.title}
					description={DEMO_SECTIONS.sizes.description}
				>
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{TAB_SIZES.map((sizeInfo) => (
							<SizeDemoCard key={sizeInfo.size} sizeInfo={sizeInfo} />
						))}
					</div>
				</DemoSection>

				{/* アイコン付きタブ */}
				<DemoSection
					title={DEMO_SECTIONS.icons.title}
					description={DEMO_SECTIONS.icons.description}
				>
					<Card className="p-6">
						{/* アイコン付きタブの特別実装 */}
						<Tabs defaultValue="dashboard" className="w-full">
							<TabsList variant="pills" className="grid w-full grid-cols-4">
								{NAVIGATION_TABS.map((tab) => (
									<TabsTrigger key={tab.id} value={tab.id} variant="pills">
										{tab.icon && <tab.icon className="w-4 h-4 mr-2" />}
										{tab.label}
									</TabsTrigger>
								))}
							</TabsList>
							<TabsContent value="dashboard">
								<div className="p-6 bg-blue-50 rounded-lg">
									<h3 className="text-lg font-semibold mb-3">ダッシュボード</h3>
									<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
										{DASHBOARD_STATS.map((stat) => (
											<StatCard
												key={`${stat.label}-${stat.value}`}
												stat={stat}
											/>
										))}
									</div>
								</div>
							</TabsContent>
							{NAVIGATION_TABS.slice(1).map((tab) => (
								<TabsContent key={tab.id} value={tab.id}>
									<div className="p-6 bg-gray-50 rounded-lg">
										<h3 className="text-lg font-semibold mb-3 flex items-center">
											{tab.icon && <tab.icon className="w-5 h-5 mr-2" />}
											{tab.label}
										</h3>
										<p className="text-gray-600">{tab.content}</p>
									</div>
								</TabsContent>
							))}
						</Tabs>
					</Card>
				</DemoSection>

				{/* スクロール可能なタブ */}
				<DemoSection
					title={DEMO_SECTIONS.scrollable.title}
					description={DEMO_SECTIONS.scrollable.description}
				>
					<Card className="p-6">
						<h3 className="text-lg font-semibold mb-4">
							多数のタブ（モバイル対応）
						</h3>
						<TabItemRenderer items={MANY_TABS} variant="minimal" scrollable />
					</Card>
				</DemoSection>

				{/* 縦方向のタブ */}
				<DemoSection
					title={DEMO_SECTIONS.vertical.title}
					description={DEMO_SECTIONS.vertical.description}
				>
					<Card className="p-6">
						<Tabs defaultValue="profile" className="w-full">
							<div className="flex gap-6">
								<TabsList orientation="vertical" className="w-48">
									{VERTICAL_TABS.map((tab) => (
										<TabsTrigger
											key={tab.id}
											value={tab.id}
											className="w-full justify-start"
										>
											{tab.icon && <tab.icon className="w-4 h-4 mr-2" />}
											{tab.label}
										</TabsTrigger>
									))}
								</TabsList>
								<div className="flex-1">
									<TabsContent value="profile">
										<div className="p-6 bg-blue-50 rounded-lg">
											<h3 className="text-lg font-semibold mb-3">
												プロフィール設定
											</h3>
											<p className="text-gray-600 mb-4">
												あなたのプロフィール情報を管理できます。
											</p>
											<div className="space-y-4">
												{PROFILE_FORM_FIELDS.map((field) => (
													<AccessibleFormField
														key={field.id}
														field={field}
														value={formData[field.id] || ""}
														onChange={(value) =>
															handleFormFieldChange(field.id, value)
														}
													/>
												))}
											</div>
										</div>
									</TabsContent>
									{VERTICAL_TABS.slice(1).map((tab) => (
										<TabsContent key={tab.id} value={tab.id}>
											<div className="p-6 bg-gray-50 rounded-lg">
												<h3 className="text-lg font-semibold mb-3 flex items-center">
													{tab.icon && <tab.icon className="w-5 h-5 mr-2" />}
													{tab.label}
												</h3>
												<p className="text-gray-600">{tab.content}</p>
											</div>
										</TabsContent>
									))}
								</div>
							</div>
						</Tabs>
					</Card>
				</DemoSection>

				{/* 制御されたタブ */}
				<DemoSection
					title={DEMO_SECTIONS.controlled.title}
					description={DEMO_SECTIONS.controlled.description}
				>
					<Card className="p-6">
						<div className="mb-4">
							<p className="text-sm text-gray-600">
								現在のタブ:{" "}
								<Badge variant="secondary" aria-live="polite">
									{CONTROLLED_TABS.find((tab) => tab.id === activeTab)?.label ||
										activeTab}
								</Badge>
							</p>
						</div>
						<Tabs
							value={activeTab}
							onValueChange={handleTabChange}
							className="w-full"
						>
							<TabsList variant="underline" className="grid w-full grid-cols-4">
								{CONTROLLED_TABS.map((tab) => (
									<TabsTrigger key={tab.id} value={tab.id} variant="underline">
										{tab.label}
									</TabsTrigger>
								))}
							</TabsList>
							{CONTROLLED_TABS.map((tab) => (
								<TabsContent key={tab.id} value={tab.id} variant="underline">
									<div className="p-6 bg-gray-50 rounded-lg">
										<h3 className="text-lg font-semibold mb-3">{tab.label}</h3>
										<p className="text-gray-600">{tab.content}</p>
									</div>
								</TabsContent>
							))}
						</Tabs>
					</Card>
				</DemoSection>
			</main>
		</Container>
	);
});
EnhancedTabsPage.displayName = "EnhancedTabsPage";

export default EnhancedTabsPage;
