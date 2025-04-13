"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Container } from "@/components/ui/container";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Timeline,
	TimelineContent,
	TimelineDate,
	TimelineDescription,
	TimelineIcon,
	TimelineItem,
	TimelineTitle,
} from "@/components/ui/timeline";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
import { 
	FaCheckCircle, 
	FaExclamationCircle, 
	FaInfoCircle, 
	FaStar, 
	FaUserCircle 
} from "react-icons/fa";

export default function UIComponentsPage() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedColor, setSelectedColor] = useState("blue");
	const [toggleState, setToggleState] = useState(false);
	const [toggleGroupValue, setToggleGroupValue] = useState<string[]>([]);

	return (
		<Container className="my-8" paddingY="lg" paddingX="2xl">
			<h1 className="mb-8 text-3xl font-bold">UIコンポーネント</h1>
			<p className="mb-6 text-gray-600">
				shadcn/uiコンポーネントライブラリのサンプル集です。
				これらのコンポーネントは、アクセシビリティを考慮した再利用可能なUIコンポーネントです。
			</p>

			<Tabs defaultValue="buttons" className="mb-12">
				<TabsList className="mb-6">
					<TabsTrigger value="buttons">ボタン</TabsTrigger>
					<TabsTrigger value="inputs">入力</TabsTrigger>
					<TabsTrigger value="dialogs">ダイアログ</TabsTrigger>
					<TabsTrigger value="toggles">トグル</TabsTrigger>
					<TabsTrigger value="timeline">タイムライン</TabsTrigger>
				</TabsList>

				<TabsContent value="buttons">
					<div className="border rounded-lg p-6 space-y-6">
						<div>
							<h2 className="text-xl font-semibold mb-2">ボタンコンポーネント</h2>
							<p className="text-gray-600 mb-4">
								さまざまなスタイルとバリエーションのボタンコンポーネント
							</p>
						</div>
						<div className="flex flex-wrap gap-4">
							<Button>デフォルト</Button>
							<Button variant="secondary">セカンダリ</Button>
							<Button variant="destructive">デストラクティブ</Button>
							<Button variant="outline">アウトライン</Button>
							<Button variant="ghost">ゴースト</Button>
							<Button variant="link">リンク</Button>
						</div>

						<div className="flex flex-wrap gap-4">
							<Button size="sm">小</Button>
							<Button>中（デフォルト）</Button>
							<Button size="lg">大</Button>
						</div>

						<div className="flex flex-wrap gap-4">
							<Button disabled>無効</Button>
							<Button variant="outline" disabled>
								無効アウトライン
							</Button>
						</div>

						<div className="flex flex-wrap gap-4">
							<Badge>バッジ</Badge>
							<Badge variant="secondary">セカンダリ</Badge>
							<Badge variant="outline">アウトライン</Badge>
							<Badge variant="destructive">デストラクティブ</Badge>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="inputs">
					<div className="border rounded-lg p-6 space-y-6">
						<div>
							<h2 className="text-xl font-semibold mb-2">入力コンポーネント</h2>
							<p className="text-gray-600 mb-4">
								テキスト入力、ラジオボタン、チェックボックスなどの入力コンポーネント
							</p>
						</div>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">名前</Label>
								<Input
									id="name"
									placeholder="山田 太郎"
									className="max-w-md"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="email">メールアドレス</Label>
								<Input
									id="email"
									type="email"
									placeholder="example@example.com"
									className="max-w-md"
								/>
							</div>

							<div className="space-y-2">
								<Label>お気に入りの色</Label>
								<RadioGroup
									value={selectedColor}
									onValueChange={setSelectedColor}
								>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="blue" id="blue" />
										<Label htmlFor="blue">青</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="red" id="red" />
										<Label htmlFor="red">赤</Label>
									</div>
									<div className="flex items-center space-x-2">
										<RadioGroupItem value="green" id="green" />
										<Label htmlFor="green">緑</Label>
									</div>
								</RadioGroup>
							</div>

							<div className="space-y-2">
								<Label>興味のある分野</Label>
								<div className="space-y-2">
									<div className="flex items-center space-x-2">
										<Checkbox id="tech" />
										<Label htmlFor="tech">テクノロジー</Label>
									</div>
									<div className="flex items-center space-x-2">
										<Checkbox id="design" />
										<Label htmlFor="design">デザイン</Label>
									</div>
									<div className="flex items-center space-x-2">
										<Checkbox id="business" />
										<Label htmlFor="business">ビジネス</Label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="dialogs">
					<div className="border rounded-lg p-6 space-y-6">
						<div>
							<h2 className="text-xl font-semibold mb-2">ダイアログコンポーネント</h2>
							<p className="text-gray-600 mb-4">
								モーダルダイアログとポップアップのコンポーネント
							</p>
						</div>
						<div>
							<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
								<DialogTrigger asChild>
									<Button>ダイアログを開く</Button>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle>ダイアログのタイトル</DialogTitle>
										<DialogDescription>
											これはダイアログの説明文です。ダイアログの内容について説明します。
										</DialogDescription>
									</DialogHeader>
									<div className="py-4">
										<p>ダイアログの本文コンテンツがここに表示されます。</p>
										<p className="mt-2">
											ダイアログは、ユーザーの注意を必要とする重要な情報や操作を表示するために使用されます。
										</p>
									</div>
									<DialogFooter>
										<Button
											variant="outline"
											onClick={() => setDialogOpen(false)}
										>
											キャンセル
										</Button>
										<Button onClick={() => setDialogOpen(false)}>
											確認
										</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="toggles">
					<div className="border rounded-lg p-6 space-y-6">
						<div>
							<h2 className="text-xl font-semibold mb-2">トグルコンポーネント</h2>
							<p className="text-gray-600 mb-4">
								トグルとトグルグループのコンポーネント
							</p>
						</div>
						<div className="space-y-4">
							<div className="space-y-2">
								<Label>シンプルトグル</Label>
								<Toggle
									pressed={toggleState}
									onPressedChange={setToggleState}
									aria-label="トグルボタン"
								>
									{toggleState ? "オン" : "オフ"}
								</Toggle>
							</div>

							<div className="space-y-2">
								<Label>トグルグループ</Label>
								<ToggleGroup
									type="multiple"
									value={toggleGroupValue}
									onValueChange={setToggleGroupValue}
								>
									<ToggleGroupItem value="bold" aria-label="太字">
										太字
									</ToggleGroupItem>
									<ToggleGroupItem value="italic" aria-label="斜体">
										斜体
									</ToggleGroupItem>
									<ToggleGroupItem value="underline" aria-label="下線">
										下線
									</ToggleGroupItem>
								</ToggleGroup>
								<p className="mt-2 text-sm text-gray-500">
									選択された値: {toggleGroupValue.join(", ") || "なし"}
								</p>
							</div>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="timeline">
					<div className="border rounded-lg p-6 space-y-6">
						<div>
							<h2 className="text-xl font-semibold mb-2">タイムラインコンポーネント</h2>
							<p className="text-gray-600 mb-4">
								時系列の流れを視覚的に表現するためのタイムラインコンポーネント
							</p>
						</div>
						
						<div className="space-y-8">
							<div>
								<h3 className="text-lg font-medium mb-3">基本的なタイムライン</h3>
								<Timeline>
									<TimelineItem>
										<TimelineIcon>
											<FaInfoCircle className="h-4 w-4" />
										</TimelineIcon>
										<TimelineContent>
											<TimelineTitle>プロジェクト開始</TimelineTitle>
											<TimelineDate>2024年4月1日</TimelineDate>
											<TimelineDescription>
												プロジェクトの計画と要件の収集を開始しました。
											</TimelineDescription>
										</TimelineContent>
									</TimelineItem>
									<TimelineItem>
										<TimelineIcon>
											<FaUserCircle className="h-4 w-4" />
										</TimelineIcon>
										<TimelineContent>
											<TimelineTitle>チーム結成</TimelineTitle>
											<TimelineDate>2024年4月5日</TimelineDate>
											<TimelineDescription>
												プロジェクトのメンバーが集まり、初回ミーティングを実施しました。
											</TimelineDescription>
										</TimelineContent>
									</TimelineItem>
									<TimelineItem>
										<TimelineIcon>
											<FaCheckCircle className="h-4 w-4" />
										</TimelineIcon>
										<TimelineContent>
											<TimelineTitle>設計フェーズ完了</TimelineTitle>
											<TimelineDate>2024年4月15日</TimelineDate>
											<TimelineDescription>
												アプリケーションの設計と基本仕様の策定が完了しました。
											</TimelineDescription>
										</TimelineContent>
									</TimelineItem>
								</Timeline>
							</div>

							<div>
								<h3 className="text-lg font-medium mb-3">カラーバリアント</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<Timeline>
										<TimelineItem variant="primary">
											<TimelineIcon variant="primary">
												<FaInfoCircle className="h-4 w-4" />
											</TimelineIcon>
											<TimelineContent>
												<TimelineTitle>プライマリカラー</TimelineTitle>
												<TimelineDate>2024年4月1日</TimelineDate>
											</TimelineContent>
										</TimelineItem>
										<TimelineItem variant="primary">
											<TimelineIcon variant="primary">
												<FaCheckCircle className="h-4 w-4" />
											</TimelineIcon>
											<TimelineContent>
												<TimelineTitle>第2ステップ</TimelineTitle>
												<TimelineDate>2024年4月5日</TimelineDate>
											</TimelineContent>
										</TimelineItem>
									</Timeline>

									<Timeline>
										<TimelineItem variant="secondary">
											<TimelineIcon variant="secondary">
												<FaInfoCircle className="h-4 w-4" />
											</TimelineIcon>
											<TimelineContent>
												<TimelineTitle>セカンダリカラー</TimelineTitle>
												<TimelineDate>2024年4月1日</TimelineDate>
											</TimelineContent>
										</TimelineItem>
										<TimelineItem variant="secondary">
											<TimelineIcon variant="secondary">
												<FaCheckCircle className="h-4 w-4" />
											</TimelineIcon>
											<TimelineContent>
												<TimelineTitle>第2ステップ</TimelineTitle>
												<TimelineDate>2024年4月5日</TimelineDate>
											</TimelineContent>
										</TimelineItem>
									</Timeline>

									<Timeline>
										<TimelineItem variant="success">
											<TimelineIcon variant="success">
												<FaCheckCircle className="h-4 w-4" />
											</TimelineIcon>
											<TimelineContent>
												<TimelineTitle>成功カラー</TimelineTitle>
												<TimelineDate>2024年4月1日</TimelineDate>
											</TimelineContent>
										</TimelineItem>
										<TimelineItem variant="success">
											<TimelineIcon variant="success">
												<FaStar className="h-4 w-4" />
											</TimelineIcon>
											<TimelineContent>
												<TimelineTitle>第2ステップ</TimelineTitle>
												<TimelineDate>2024年4月5日</TimelineDate>
											</TimelineContent>
										</TimelineItem>
									</Timeline>

									<Timeline>
										<TimelineItem variant="danger">
											<TimelineIcon variant="danger">
												<FaExclamationCircle className="h-4 w-4" />
											</TimelineIcon>
											<TimelineContent>
												<TimelineTitle>警告カラー</TimelineTitle>
												<TimelineDate>2024年4月1日</TimelineDate>
											</TimelineContent>
										</TimelineItem>
										<TimelineItem variant="danger">
											<TimelineIcon variant="danger">
												<FaExclamationCircle className="h-4 w-4" />
											</TimelineIcon>
											<TimelineContent>
												<TimelineTitle>第2ステップ</TimelineTitle>
												<TimelineDate>2024年4月5日</TimelineDate>
											</TimelineContent>
										</TimelineItem>
									</Timeline>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-medium mb-3">アイコン位置バリアント</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<Timeline>
										<TimelineItem>
											<TimelineIcon position="left">
												<FaInfoCircle className="h-4 w-4" />
											</TimelineIcon>
											<TimelineContent>
												<TimelineTitle>左位置アイコン（デフォルト）</TimelineTitle>
												<TimelineDate>2024年4月1日</TimelineDate>
											</TimelineContent>
										</TimelineItem>
										<TimelineItem>
											<TimelineIcon position="center">
												<FaInfoCircle className="h-4 w-4" />
											</TimelineIcon>
											<TimelineContent>
												<TimelineTitle>中央位置アイコン</TimelineTitle>
												<TimelineDate>2024年4月5日</TimelineDate>
											</TimelineContent>
										</TimelineItem>
										<TimelineItem>
											<TimelineIcon position="right">
												<FaCheckCircle className="h-4 w-4" />
											</TimelineIcon>
											<TimelineContent>
												<TimelineTitle>右位置アイコン</TimelineTitle>
												<TimelineDate>2024年4月10日</TimelineDate>
											</TimelineContent>
										</TimelineItem>
									</Timeline>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-medium mb-3">カードスタイル</h3>
								<Timeline>
									<TimelineItem variant="primary">
										<TimelineIcon variant="primary">
											<FaInfoCircle className="h-4 w-4" />
										</TimelineIcon>
										<TimelineContent variant="card">
											<div className="flex justify-between items-start">
												<TimelineTitle>カードスタイル</TimelineTitle>
												<TimelineDate>2024年4月1日</TimelineDate>
											</div>
											<TimelineDescription className="mt-2">
												ボーダーとシャドウを使用したカード形式のコンテンツです。
											</TimelineDescription>
										</TimelineContent>
									</TimelineItem>
									<TimelineItem variant="primary">
										<TimelineIcon variant="primary">
											<img 
												src="/dummy-images/profile-placeholder.jpg" 
												alt="プロフィール" 
												className="h-full w-full object-cover rounded-full" 
											/>
										</TimelineIcon>
										<TimelineContent variant="card">
											<div className="flex justify-between items-start">
												<TimelineTitle>画像を使用したアイコン</TimelineTitle>
												<TimelineDate>2024年4月5日</TimelineDate>
											</div>
											<TimelineDescription className="mt-2">
												アイコン部分に画像を使用することもできます。画像は丸くトリミングされます。
											</TimelineDescription>
										</TimelineContent>
									</TimelineItem>
									<TimelineItem variant="primary">
										<TimelineIcon variant="primary">
											<FaCheckCircle className="h-4 w-4" />
										</TimelineIcon>
										<TimelineContent variant="card">
											<div className="flex justify-between items-start">
												<TimelineTitle>最終ステップ</TimelineTitle>
												<TimelineDate>2024年4月15日</TimelineDate>
											</div>
											<TimelineDescription className="mt-2">
												タイムラインの最終ステップです。さまざまなスタイルやバリアントを組み合わせて使用できます。
											</TimelineDescription>
										</TimelineContent>
									</TimelineItem>
								</Timeline>
							</div>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</Container>
	);
}
