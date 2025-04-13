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
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

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
			</Tabs>
		</Container>
	);
}
