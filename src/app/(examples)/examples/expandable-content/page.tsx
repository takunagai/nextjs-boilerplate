"use client";

import Image from "next/image";
import { useState } from "react";
import { FaStar, FaHeart, FaBookmark } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ExpandableContent } from "@/components/ui/expandable-content";
import { PageHeader } from "@/components/ui/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ExpandableContentPage() {
	const [customHeight, setCustomHeight] = useState(150);

	return (
		<Container className="my-8" paddingY="lg" paddingX="2xl">
			<PageHeader title="ExpandableContent コンポーネント" />
			<p className="mb-6 text-gray-600 text-center">
				長いコンテンツを折りたたみ可能にするコンポーネントのデモンストレーション。
				SEO・アクセシビリティ・パフォーマンスを考慮した実装です。
			</p>

			<Tabs defaultValue="basic" className="mb-12">
				<TabsList className="mb-6">
					<TabsTrigger value="basic">基本例</TabsTrigger>
					<TabsTrigger value="variants">バリアント</TabsTrigger>
					<TabsTrigger value="content-types">コンテンツタイプ</TabsTrigger>
					<TabsTrigger value="responsive">レスポンシブ</TabsTrigger>
				</TabsList>

				<TabsContent value="basic">
					<div className="border rounded-lg p-6 space-y-8">
						<div>
							<h2 className="text-xl font-semibold mb-4">基本的な使用例</h2>
							<p className="text-gray-600 mb-4">
								デフォルト設定（200px）で長いテキストを折りたたみます。
							</p>
						</div>

						<ExpandableContent>
							<div className="prose prose-gray dark:prose-invert max-w-none">
								<h3>Next.js とは</h3>
								<p>
									Next.js は、React
									ベースの本格的なWebアプリケーションを構築するためのフレームワークです。
									この素晴らしいツールは、最新のWeb開発のベストプラクティスを組み込んでおり、
									開発者に優れた体験を提供します。
								</p>
								<p>
									Next.js
									の主な特徴には、サーバーサイドレンダリング（SSR）、静的サイト生成（SSG）、
									API ルート、画像最適化、ファイルベースのルーティングなどがあります。
									これらの機能により、高性能で SEO
									に優れたWebアプリケーションを簡単に構築できます。
								</p>
								<p>
									また、Next.js は Vercel
									によって開発・メンテナンスされており、React
									チームとの密接な協力により、React
									の最新機能を最初にサポートすることで知られています。
									これにより、開発者は最先端の技術を使用して、モダンなWebアプリケーションを構築できます。
								</p>
								<p>
									パフォーマンスの面でも、Next.js
									は自動的にコード分割、画像最適化、フォント最適化などを行い、
									ユーザーエクスペリエンスの向上に努めています。
									さらに、開発体験の向上にも注力しており、Fast Refresh、TypeScript
									サポート、ESLint統合などの機能を提供しています。
								</p>
							</div>
						</ExpandableContent>

						<div className="pt-4">
							<h4 className="text-lg font-medium mb-2">カスタム高さの例</h4>
							<div className="mb-4">
								<label
									htmlFor="height-slider"
									className="block text-sm font-medium mb-2"
								>
									最大高さ: {customHeight}px
								</label>
								<input
									id="height-slider"
									type="range"
									min="100"
									max="300"
									value={customHeight}
									onChange={(e) => setCustomHeight(Number(e.target.value))}
									className="w-full"
								/>
							</div>
							<ExpandableContent
								maxHeight={customHeight}
								expandText="詳細を見る"
								collapseText="簡潔表示"
								buttonVariant="default"
							>
								<div className="space-y-4">
									<p>
										この例では、スライダーで最大高さを動的に変更できます。
										現在の設定: {customHeight}px
									</p>
									<p>
										ExpandableContent
										コンポーネントは、コンテンツの高さが指定された最大高さを超える場合のみ、
										展開ボタンを表示します。
										高さが十分に低い場合は、ボタンは表示されません。
									</p>
									<p>
										このコンポーネントは、ブログ記事の抜粋表示、FAQ
										の回答、商品説明、ユーザーレビューなど、
										様々な場面で活用できます。
									</p>
									<p>
										ResizeObserver
										を使用してコンテンツサイズの変更を動的に監視し、
										ウィンドウサイズ変更やコンテンツの動的変更にも対応しています。
									</p>
								</div>
							</ExpandableContent>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="variants">
					<div className="border rounded-lg p-6 space-y-8">
						<div>
							<h2 className="text-xl font-semibold mb-2">
								スタイルバリアント
							</h2>
							<p className="text-gray-600 mb-4">
								異なる見た目のバリアントとボタンスタイルの組み合わせ
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<h3 className="text-lg font-medium mb-3">デフォルトスタイル</h3>
								<ExpandableContent maxHeight={120} buttonVariant="outline">
									<div className="p-4">
										<p className="font-medium mb-2">
											ボーダーと背景色付きのカードスタイル
										</p>
										<p>
											デフォルトのスタイルは、ボーダーと背景色を持つカード形式です。
											コンテンツを明確に区別し、視覚的に整理された印象を与えます。
										</p>
										<p>
											このスタイルは、記事のセクション、商品説明、FAQ
											の回答など、
											重要なコンテンツを際立たせたい場合に最適です。
										</p>
									</div>
								</ExpandableContent>
							</div>

							<div>
								<h3 className="text-lg font-medium mb-3">サブトルスタイル</h3>
								<ExpandableContent
									variant="subtle"
									maxHeight={120}
									buttonVariant="ghost"
								>
									<div className="p-4">
										<p className="font-medium mb-2">
											控えめな背景色のスタイル
										</p>
										<p>
											サブトルバリアントは、控えめなミューテッドカラーの背景を使用します。
											メインコンテンツを邪魔せず、さりげなく情報を提供したい場合に適しています。
										</p>
										<p>
											ユーザーレビュー、補足説明、注釈などの
											副次的な情報の表示に最適です。
										</p>
									</div>
								</ExpandableContent>
							</div>

							<div>
								<h3 className="text-lg font-medium mb-3">ミニマルスタイル</h3>
								<ExpandableContent
									variant="minimal"
									maxHeight={120}
									buttonVariant="link"
								>
									<div className="space-y-2">
										<p className="font-medium">装飾なしのシンプルなスタイル</p>
										<p>
											ミニマルバリアントは、ボーダーや背景色を持たない
											最もシンプルな形式です。
										</p>
										<p>
											既存のデザインシステムに溶け込ませたい場合や、
											独自のスタイリングを適用したい場合に便利です。
										</p>
										<p>
											コンテンツそのものに焦点を当て、
											視覚的な装飾を最小限に抑えたい場合に最適です。
										</p>
									</div>
								</ExpandableContent>
							</div>

							<div>
								<h3 className="text-lg font-medium mb-3">プライマリボタン</h3>
								<ExpandableContent
									variant="default"
									maxHeight={120}
									buttonVariant="default"
									expandText="もっと読む"
									collapseText="閉じる"
								>
									<div className="p-4">
										<p className="font-medium mb-2">
											強調されたプライマリボタン
										</p>
										<p>
											プライマリボタンスタイルは、最も目立つ
											アクションボタンとして設計されています。
										</p>
										<p>
											重要なコンテンツや、ユーザーに積極的に読んでもらいたい
											情報がある場合に使用します。
										</p>
										<p>
											カスタムテキストも設定でき、コンテンツの性質に応じて
											適切な表現を選択できます。
										</p>
									</div>
								</ExpandableContent>
							</div>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="content-types">
					<div className="border rounded-lg p-6 space-y-8">
						<div>
							<h2 className="text-xl font-semibold mb-2">
								様々なコンテンツタイプ
							</h2>
							<p className="text-gray-600 mb-4">
								テキスト、リスト、カード、画像など、どんなコンテンツでも対応
							</p>
						</div>

						<div className="space-y-8">
							{/* リストコンテンツ */}
							<div>
								<h3 className="text-lg font-medium mb-3">リストコンテンツ</h3>
								<ExpandableContent maxHeight={180}>
									<div className="space-y-4">
										<h4 className="font-semibold">
											React 開発のベストプラクティス
										</h4>
										<ul className="space-y-2 list-disc list-inside">
											<li>
												コンポーネントは単一責任の原則に従って設計する
											</li>
											<li>
												Propsの型定義を明確にし、TypeScriptを活用する
											</li>
											<li>
												useEffect
												の依存配列を適切に管理し、不要な再レンダリングを避ける
											</li>
											<li>
												カスタムフックを使用してロジックを再利用可能にする
											</li>
											<li>
												パフォーマンス最適化は必要な場合のみ適用する
											</li>
											<li>
												アクセシビリティを考慮したマークアップを心がける
											</li>
											<li>
												テストを書いて品質を保証する（単体テスト、統合テスト）
											</li>
											<li>
												コードレビューを通じてチーム全体のスキル向上を図る
											</li>
											<li>
												最新のReactの機能やベストプラクティスを学び続ける
											</li>
											<li>
												ドキュメント化を習慣とし、保守性を高める
											</li>
										</ul>
									</div>
								</ExpandableContent>
							</div>

							{/* カードレイアウト */}
							<div>
								<h3 className="text-lg font-medium mb-3">
									カードレイアウト
								</h3>
								<ExpandableContent maxHeight={200} variant="minimal">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{Array.from({ length: 6 }, (_, i) => (
											<Card key={i} className="h-fit">
												<CardHeader className="pb-3">
													<CardTitle className="text-base">
														機能 {i + 1}
													</CardTitle>
												</CardHeader>
												<CardContent className="space-y-2">
													<div className="flex items-center gap-2">
														<FaStar className="h-4 w-4 text-yellow-500" />
														<span className="text-sm text-gray-600">
															評価: {(4.0 + Math.random()).toFixed(1)}
														</span>
													</div>
													<p className="text-sm">
														この機能は高いパフォーマンスと使いやすさを提供し、
														ユーザー体験を大幅に向上させます。
													</p>
													<div className="flex gap-1">
														<Badge variant="secondary" className="text-xs">
															機能{i + 1}
														</Badge>
														<Badge variant="outline" className="text-xs">
															おすすめ
														</Badge>
													</div>
												</CardContent>
											</Card>
										))}
									</div>
								</ExpandableContent>
							</div>

							{/* 画像とテキストの組み合わせ */}
							<div>
								<h3 className="text-lg font-medium mb-3">
									画像とテキストの組み合わせ
								</h3>
								<ExpandableContent maxHeight={250} variant="subtle">
									<div className="space-y-6 p-4">
										<div className="flex flex-col md:flex-row gap-4 items-start">
											<div className="flex-shrink-0">
												<Image
													src="/dummy-images/profile-placeholder.jpg"
													alt="サンプル画像"
													width={120}
													height={120}
													className="rounded-lg object-cover"
												/>
											</div>
											<div className="flex-1 space-y-3">
												<h4 className="text-lg font-semibold">
													Web開発の最新トレンド
												</h4>
												<p>
													現代のWeb開発では、ユーザーエクスペリエンスとパフォーマンスが
													重要な要素となっています。React、Next.js、TypeScript
													などの技術スタックが主流となり、
													開発効率と品質の両立が求められています。
												</p>
												<div className="flex items-center gap-4 text-sm text-gray-600">
													<div className="flex items-center gap-1">
														<FaHeart className="h-4 w-4 text-red-500" />
														<span>248いいね</span>
													</div>
													<div className="flex items-center gap-1">
														<FaBookmark className="h-4 w-4 text-blue-500" />
														<span>65ブックマーク</span>
													</div>
												</div>
											</div>
										</div>
										<div className="space-y-3">
											<p>
												また、モバイルファーストの設計思想、アクセシビリティの重視、
												SEO最適化など、包括的な観点からの開発が不可欠です。
											</p>
											<p>
												パフォーマンス面では、Core Web Vitals
												の指標を意識し、ユーザーが快適に利用できる
												Webサイトの構築が求められています。
											</p>
											<p>
												さらに、セキュリティ対策、プライバシー保護、
												多様性への配慮など、社会的責任も
												Web開発者にとって重要な要素となっています。
											</p>
										</div>
									</div>
								</ExpandableContent>
							</div>
						</div>
					</div>
				</TabsContent>

				<TabsContent value="responsive">
					<div className="border rounded-lg p-6 space-y-8">
						<div>
							<h2 className="text-xl font-semibold mb-2">
								レスポンシブ対応
							</h2>
							<p className="text-gray-600 mb-4">
								画面サイズに応じて適切に動作するレスポンシブデザイン
							</p>
						</div>

						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-medium mb-3">
									デバイス別最適化
								</h3>
								<ExpandableContent
									maxHeight="clamp(150px, 20vh, 300px)"
									className="md:p-6 p-4"
								>
									<div className="space-y-4">
										<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
											{["モバイル", "タブレット", "デスクトップ"].map(
												(device, index) => (
													<div
														key={device}
														className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800"
													>
														<h4 className="font-medium mb-2">{device}</h4>
														<p className="text-sm">
															{device}端末に最適化された表示とインタラクション
														</p>
														<ul className="text-xs mt-2 space-y-1 text-gray-600">
															<li>• 適切なタッチターゲットサイズ</li>
															<li>• 読みやすいフォントサイズ</li>
															<li>• 使いやすいナビゲーション</li>
														</ul>
													</div>
												),
											)}
										</div>
										<p>
											ExpandableContentコンポーネントは、CSS
											clamp()関数やビューポート単位を使用して、
											画面サイズに応じた適切な高さを設定できます。
										</p>
										<p>
											ResizeObserverによる動的なサイズ監視により、
											ウィンドウサイズの変更にもリアルタイムで対応します。
										</p>
										<p>
											タッチデバイスでの操作性も考慮し、
											ボタンは十分なタッチターゲットサイズを確保しています。
										</p>
									</div>
								</ExpandableContent>
							</div>

							<div>
								<h3 className="text-lg font-medium mb-3">
									無効化とカスタマイズ
								</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<h4 className="font-medium mb-2">展開機能を無効化</h4>
										<ExpandableContent disabled maxHeight={100}>
											<div className="p-4">
												<p>
													disabledプロパティがtrueの場合、
													コンテンツの高さに関係なく展開ボタンは表示されません。
												</p>
												<p>
													この機能は、管理者権限やユーザー設定によって
													コンテンツの表示制御を行う場合に便利です。
												</p>
											</div>
										</ExpandableContent>
									</div>

									<div>
										<h4 className="font-medium mb-2">ボタンを非表示</h4>
										<ExpandableContent hideButton maxHeight={100}>
											<div className="p-4">
												<p>
													hideButtonプロパティを使用すると、
													ボタンを表示せずにコンテンツの高さ制限のみを適用できます。
												</p>
												<p>
													外部のコントロールで展開状態を管理したい場合や、
													デザイン上ボタンが不要な場合に使用します。
												</p>
											</div>
										</ExpandableContent>
									</div>
								</div>
							</div>
						</div>
					</div>
				</TabsContent>
			</Tabs>

			{/* 技術仕様 */}
			<div className="border rounded-lg p-6 bg-muted/30">
				<h2 className="text-xl font-semibold mb-4">技術仕様</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div>
						<h3 className="font-medium mb-2 text-primary">
							アクセシビリティ
						</h3>
						<ul className="text-sm space-y-1 text-gray-600">
							<li>• ARIA属性による状態通知</li>
							<li>• キーボード操作対応</li>
							<li>• スクリーンリーダー対応</li>
							<li>• フォーカス管理</li>
						</ul>
					</div>
					<div>
						<h3 className="font-medium mb-2 text-primary">SEO対応</h3>
						<ul className="text-sm space-y-1 text-gray-600">
							<li>• 初期状態でコンテンツ全体が存在</li>
							<li>• CSS による表示制御</li>
							<li>• JavaScript無効時も動作</li>
							<li>• 検索エンジンがインデックス可能</li>
						</ul>
					</div>
					<div>
						<h3 className="font-medium mb-2 text-primary">
							パフォーマンス
						</h3>
						<ul className="text-sm space-y-1 text-gray-600">
							<li>• CSS transition アニメーション</li>
							<li>• ResizeObserver による最適化</li>
							<li>• 効率的な状態管理</li>
							<li>• 不要な再レンダリング防止</li>
						</ul>
					</div>
				</div>
			</div>
		</Container>
	);
}