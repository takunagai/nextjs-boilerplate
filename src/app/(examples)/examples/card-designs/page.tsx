"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { GlassmorphismCards } from "./components/glassmorphism-cards";
import { NeumorphismCards } from "./components/neumorphism-cards";
import { SplitCards } from "./components/split-cards";
import { AuroraCards } from "./components/aurora-cards";

const designs = [
	{
		id: "glassmorphism",
		name: "グラスモーフィズム",
		description: "半透明のガラス質感と美しいグラデーション効果",
		features: [
			"マウス追従の光エフェクト",
			"アニメーション背景",
			"グロウエフェクト",
			"レスポンシブ対応",
		],
		component: GlassmorphismCards,
		difficulty: "中級",
		performance: "良好",
		compatibility: "iOS 9+, Chrome 76+",
	},
	{
		id: "neumorphism",
		name: "ネオモーフィズム",
		description: "柔らかい影による立体的な凹凸表現",
		features: [
			"リアルな影による立体感",
			"押し込み効果",
			"刻印風数字",
			"ダークモード対応",
		],
		component: NeumorphismCards,
		difficulty: "初級",
		performance: "最優秀",
		compatibility: "全ブラウザ対応",
	},
	{
		id: "split",
		name: "スプリットカード",
		description: "斜めに分割された大胆なデザイン",
		features: [
			"ダイアゴナル分割",
			"マウス追従エフェクト",
			"境界線上アイコン配置",
			"グロウアニメーション",
		],
		component: SplitCards,
		difficulty: "上級",
		performance: "良好",
		compatibility: "Chrome 55+, Firefox 53+",
	},
	{
		id: "aurora",
		name: "オーロラエフェクト",
		description: "流動的なオーロラのような美しいアニメーション",
		features: [
			"複数レイヤーアニメーション",
			"ノイズテクスチャ",
			"ダークテーマ専用",
			"グラデーションライン",
		],
		component: AuroraCards,
		difficulty: "上級",
		performance: "中程度",
		compatibility: "Chrome 60+, Safari 12+",
	},
];

const difficultyColors = {
	初級: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
	中級: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
	上級: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
};

const performanceColors = {
	最優秀:
		"bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
	良好: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
	中程度:
		"bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400",
};

export default function CardDesignsPage() {
	const [activeTab, setActiveTab] = useState("glassmorphism");

	const activeDesign = designs.find((d) => d.id === activeTab);

	return (
		<div className="min-h-screen py-16">
			<Container width="full" paddingX="lg">
				{/* ヘッダー */}
				<div className="text-center mb-16">
					<Heading as="h1" align="center" className="mb-4">
						カードデザインコレクション
					</Heading>
					<p className="text-muted-foreground max-w-3xl mx-auto text-lg">
						4つの異なるデザインアプローチで作られたカードコンポーネント。
						<br />
						グラスモーフィズム、ネオモーフィズム、スプリット、オーロラの各スタイルを比較できます。
					</p>
				</div>

				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					{/* タブナビゲーション */}
					<TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 h-auto p-2 bg-muted/50">
						{designs.map((design) => (
							<TabsTrigger
								key={design.id}
								value={design.id}
								className="flex flex-col items-center gap-2 p-4 h-auto data-[state=active]:bg-background data-[state=active]:shadow-sm"
							>
								<span className="font-semibold text-sm">{design.name}</span>
								<div className="flex gap-2">
									<Badge
										variant="outline"
										className={`text-xs ${difficultyColors[design.difficulty as keyof typeof difficultyColors]}`}
									>
										{design.difficulty}
									</Badge>
									<Badge
										variant="outline"
										className={`text-xs ${performanceColors[design.performance as keyof typeof performanceColors]}`}
									>
										{design.performance}
									</Badge>
								</div>
							</TabsTrigger>
						))}
					</TabsList>

					{/* コンテンツエリア */}
					{designs.map((design) => (
						<TabsContent
							key={design.id}
							value={design.id}
							className="space-y-8"
						>
							{/* デザイン情報 */}
							<Card>
								<CardHeader>
									<CardTitle className="flex items-center gap-4">
										{design.name}
										<div className="flex gap-2">
											<Badge
												className={
													difficultyColors[
														design.difficulty as keyof typeof difficultyColors
													]
												}
											>
												{design.difficulty}
											</Badge>
											<Badge
												className={
													performanceColors[
														design.performance as keyof typeof performanceColors
													]
												}
											>
												{design.performance}
											</Badge>
										</div>
									</CardTitle>
									<CardDescription className="text-base">
										{design.description}
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{/* 特徴 */}
										<div>
											<h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
												主な特徴
											</h4>
											<ul className="space-y-2">
												{design.features.map((feature, index) => (
													<li
														key={index}
														className="flex items-center gap-2 text-sm"
													>
														<div className="w-1.5 h-1.5 bg-primary rounded-full" />
														{feature}
													</li>
												))}
											</ul>
										</div>

										{/* 技術情報 */}
										<div>
											<h4 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
												技術情報
											</h4>
											<div className="space-y-2 text-sm">
												<div>
													<span className="font-medium">難易度: </span>
													<span>{design.difficulty}</span>
												</div>
												<div>
													<span className="font-medium">パフォーマンス: </span>
													<span>{design.performance}</span>
												</div>
												<div>
													<span className="font-medium">ブラウザ対応: </span>
													<span className="text-muted-foreground">
														{design.compatibility}
													</span>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* デザインプレビュー */}
							<div className="bg-card border rounded-xl overflow-hidden">
								<div className="p-4 border-b bg-muted/30">
									<h3 className="font-semibold text-lg">プレビュー</h3>
									<p className="text-sm text-muted-foreground mt-1">
										実際のカードデザインをご確認ください
									</p>
								</div>
								<div className="p-8">
									<design.component />
								</div>
							</div>

							{/* 使用方法 */}
							<Card>
								<CardHeader>
									<CardTitle>使用方法</CardTitle>
									<CardDescription>
										このデザインを実際のプロジェクトで使用する際のガイドライン
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									{design.id === "glassmorphism" && (
										<div className="space-y-2">
											<p className="text-sm">
												• backdrop-filter
												が必要なため、対応ブラウザを確認してください
											</p>
											<p className="text-sm">
												• マウスイベントの処理でパフォーマンスを考慮してください
											</p>
											<p className="text-sm">
												•
												背景にコントラストのある要素を配置すると効果が向上します
											</p>
										</div>
									)}
									{design.id === "neumorphism" && (
										<div className="space-y-2">
											<p className="text-sm">
												• 影の値は環境に合わせて調整してください
											</p>
											<p className="text-sm">
												• ダークモードとライトモードで異なる影を使用します
											</p>
											<p className="text-sm">
												• 背景色との調和を重視してください
											</p>
										</div>
									)}
									{design.id === "split" && (
										<div className="space-y-2">
											<p className="text-sm">
												• clip-path を使用しているため、IE
												では代替手段が必要です
											</p>
											<p className="text-sm">
												• マウス位置の計算でわずかなパフォーマンス負荷があります
											</p>
											<p className="text-sm">
												•
												テキストの可読性を確保するため、コントラストを十分に確保してください
											</p>
										</div>
									)}
									{design.id === "aurora" && (
										<div className="space-y-2">
											<p className="text-sm">
												• アニメーションが多いため、reduced-motion
												の対応を検討してください
											</p>
											<p className="text-sm">
												• ダークテーマでの使用を前提としています
											</p>
											<p className="text-sm">
												• CSS-in-JS が必要な場合があります
											</p>
										</div>
									)}
								</CardContent>
							</Card>
						</TabsContent>
					))}
				</Tabs>
			</Container>
		</div>
	);
}
