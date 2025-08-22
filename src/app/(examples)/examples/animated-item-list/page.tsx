"use client";

import { useState } from "react";
import { AnimatedItemList } from "@/components/ui/animated-item-list";
import { Container } from "@/components/ui/container";

/**
 * サンプルデータ
 */
// 一次元配列（静的表示用）
const staticItems = [
	"高品質なWebサイト制作",
	"迅速な対応とサポート",
	"競争力のある価格設定",
	"最新技術の活用",
];

// 二次元配列（アニメーション表示用）
const animatedProblems = [
	[
		"Webサイトの表示速度が遅くてユーザーが離脱してしまう",
		"スマートフォンでの表示が崩れている",
		"検索エンジンで上位表示されない",
		"コンバージョン率が低い",
	],
	[
		"競合他社のサイトに見劣りする",
		"更新作業に時間がかかりすぎる",
		"セキュリティ面での不安がある",
		"アクセス解析ができていない",
	],
	[
		"お問い合わせフォームが使いにくい",
		"商品やサービスの魅力が伝わらない",
		"ブランディングが統一されていない",
		"多言語対応ができていない",
	],
];

// サービス特徴（異なるアイテム数の例）
const serviceFeatures = [
	["24時間365日サポート体制", "専任担当者による一貫対応", "定期的な改善提案"],
	[
		"最新のセキュリティ対策",
		"高速な表示速度を実現",
		"SEO対策込みの実装",
		"アクセシビリティ対応",
		"多言語対応可能",
	],
	["柔軟なカスタマイズ", "豊富なテンプレート"],
];

// 成果・実績データ
const achievements = [
	[
		"導入企業数 1,000社突破",
		"顧客満足度 98%達成",
		"平均レスポンスタイム 1時間以内",
	],
	["売上向上率 平均150%", "ページ表示速度 3秒以内", "SEOランキング TOP10入り"],
];

/**
 * AnimatedItemListコンポーネントの例を表示するページ
 */
export default function AnimatedItemListExamplesPage() {
	// セット変更状態の管理
	const [currentSetIndex, setCurrentSetIndex] = useState(0);

	return (
		<>
			<Container as="header" className="space-y-4">
				<h1 className="text-4xl">AnimatedItemListコンポーネントのサンプル</h1>
				<p className="text-xl text-muted-foreground">
					縦フリップアニメーション付きアイテムリストの様々な使用例です。
				</p>
			</Container>

			{/* 基本的な静的リスト */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">基本的な静的リスト</h2>
					<p className="mb-6 text-muted-foreground">
						一次元配列を渡すと、アニメーションなしの静的リストとして表示されます。
					</p>

					<div className="border rounded-lg p-6 bg-card">
						<h3 className="text-xl font-bold mb-4">サービスの特徴</h3>
						<AnimatedItemList items={staticItems} />
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>
							シンプルなチェックリスト形式での表示。アニメーションは実行されません。
						</p>
					</div>
				</section>
			</Container>

			{/* アニメーション付きリスト */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">アニメーション付きリスト</h2>
					<p className="mb-6 text-muted-foreground">
						二次元配列を渡すと、自動的にフリップアニメーションが実行されます。
					</p>

					<div className="border rounded-lg p-6 bg-card">
						<h3 className="text-xl font-bold mb-4">
							こんなお悩み、ありませんか？
						</h3>
						<AnimatedItemList
							items={animatedProblems}
							intervalSeconds={5}
							className="max-w-2xl mx-auto space-y-4"
						/>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>5秒ごとに自動的に切り替わります。高さは固定されています。</p>
					</div>
				</section>
			</Container>

			{/* インジゲーター付きアニメーション */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">インジゲーター付き</h2>
					<p className="mb-6 text-muted-foreground">
						現在の位置と総数を表示し、ドットクリックで手動切り替えも可能です。
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* 上部インジゲーター */}
						<div className="border rounded-lg p-6 bg-card">
							<h3 className="text-lg font-bold mb-4">
								インジゲーター（上部表示）
							</h3>
							<AnimatedItemList
								items={animatedProblems}
								intervalSeconds={4}
								showIndicator={true}
								indicatorPosition="top"
								className="max-w-md mx-auto space-y-3"
							/>
						</div>

						{/* 下部インジゲーター */}
						<div className="border rounded-lg p-6 bg-card">
							<h3 className="text-lg font-bold mb-4">
								インジゲーター（下部表示）
							</h3>
							<AnimatedItemList
								items={animatedProblems}
								intervalSeconds={4}
								showIndicator={true}
								indicatorPosition="bottom"
								className="max-w-md mx-auto space-y-3"
							/>
						</div>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>
							インジゲータードットをクリックすると、該当するセットに即座に切り替わります。
						</p>
					</div>
				</section>
			</Container>

			{/* カスタムアイコン */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">カスタムアイコン</h2>
					<p className="mb-6 text-muted-foreground">
						デフォルトのチェックアイコンを変更できます。
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{/* スターアイコン */}
						<div className="border rounded-lg p-6 bg-card">
							<h4 className="text-base font-bold mb-3">スターアイコン</h4>
							<AnimatedItemList
								items={staticItems.slice(0, 3)}
								icon="star"
								iconClassName="w-4 h-4 text-yellow-500"
							/>
						</div>

						{/* ロケットアイコン */}
						<div className="border rounded-lg p-6 bg-card">
							<h4 className="text-base font-bold mb-3">ロケットアイコン</h4>
							<AnimatedItemList
								items={staticItems.slice(0, 3)}
								icon="thumbsUp"
								iconClassName="w-4 h-4 text-blue-500"
							/>
						</div>

						{/* ライトバルブアイコン */}
						<div className="border rounded-lg p-6 bg-card">
							<h4 className="text-base font-bold mb-3">アイデアアイコン</h4>
							<AnimatedItemList
								items={staticItems.slice(0, 3)}
								icon="diamond"
								iconClassName="w-4 h-4 text-orange-500"
							/>
						</div>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>react-iconsなどのアイコンライブラリを使用できます。</p>
					</div>
				</section>
			</Container>

			{/* カスタムスタイリング */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">カスタムスタイリング</h2>
					<p className="mb-6 text-muted-foreground">
						Tailwind CSSクラスでスタイルをカスタマイズできます。
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* ダークテーマ風 */}
						<div className="border rounded-lg p-6 bg-slate-900">
							<h3 className="text-lg font-bold mb-4 text-white">
								ダークテーマスタイル
							</h3>
							<AnimatedItemList
								items={serviceFeatures}
								intervalSeconds={3}
								showIndicator={true}
								className="space-y-3"
								itemClassName="flex items-start gap-3 p-4 bg-slate-800 rounded-lg border border-slate-700 text-slate-100"
								iconClassName="w-4 h-4 text-green-400 mt-0.5"
								textClassName="text-slate-200 flex-1"
								indicatorClassName="justify-center mt-4"
							/>
						</div>

						{/* グラデーション風 */}
						<div className="border rounded-lg p-6 bg-gradient-to-br from-purple-50 to-pink-50">
							<h3 className="text-lg font-bold mb-4 text-purple-900">
								グラデーションスタイル
							</h3>
							<AnimatedItemList
								items={achievements}
								intervalSeconds={3}
								showIndicator={true}
								icon="star"
								className="space-y-3"
								itemClassName="flex items-start gap-3 p-4 bg-white/80 backdrop-blur rounded-xl shadow-md hover:shadow-lg transition-shadow"
								iconClassName="w-5 h-5 text-purple-600 mt-0.5"
								textClassName="text-purple-800 font-medium flex-1"
							/>
						</div>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>
							className props
							を使用して、コンテナ、アイテム、アイコン、テキストのスタイルを個別に設定できます。
						</p>
					</div>
				</section>
			</Container>

			{/* 異なるアニメーション速度 */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">アニメーション速度の調整</h2>
					<p className="mb-6 text-muted-foreground">
						切り替え間隔やアニメーション時間を調整できます。
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{/* 高速 */}
						<div className="border rounded-lg p-6 bg-card">
							<h4 className="text-base font-bold mb-3">高速（2秒間隔）</h4>
							<AnimatedItemList
								items={[
									["項目1-A", "項目1-B"],
									["項目2-A", "項目2-B"],
									["項目3-A", "項目3-B"],
								]}
								intervalSeconds={2}
								animationDuration={0.5}
								showIndicator={true}
							/>
						</div>

						{/* 標準 */}
						<div className="border rounded-lg p-6 bg-card">
							<h4 className="text-base font-bold mb-3">標準（5秒間隔）</h4>
							<AnimatedItemList
								items={[
									["項目1-A", "項目1-B"],
									["項目2-A", "項目2-B"],
									["項目3-A", "項目3-B"],
								]}
								intervalSeconds={5}
								animationDuration={1}
								showIndicator={true}
							/>
						</div>

						{/* 低速 */}
						<div className="border rounded-lg p-6 bg-card">
							<h4 className="text-base font-bold mb-3">低速（8秒間隔）</h4>
							<AnimatedItemList
								items={[
									["項目1-A", "項目1-B"],
									["項目2-A", "項目2-B"],
									["項目3-A", "項目3-B"],
								]}
								intervalSeconds={8}
								animationDuration={1.5}
								showIndicator={true}
							/>
						</div>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>
							intervalSecondsで切り替え間隔、animationDurationでフリップ時間を設定できます。
						</p>
					</div>
				</section>
			</Container>

			{/* カスタムレンダリング */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">カスタムアイテムスタイル</h2>
					<p className="mb-6 text-muted-foreground">
						itemClassNameでアイテムのスタイルをカスタマイズできます。
					</p>

					<div className="border rounded-lg p-6 bg-card">
						<h3 className="text-xl font-bold mb-4">製品の特徴</h3>
						<AnimatedItemList
							items={[
								[
									"高速処理: 従来比3倍の処理速度",
									"省エネ設計: 消費電力を50%削減",
									"コンパクト: 設置面積を40%削減",
								],
								[
									"簡単操作: 直感的なタッチパネル",
									"多言語対応: 10ヶ国語に対応",
									"リモート管理: スマートフォンから操作可能",
								],
							]}
							intervalSeconds={4}
							showIndicator={true}
							itemClassName="p-4 rounded-lg border-2 border-blue-200 bg-blue-50"
							className="max-w-2xl mx-auto space-y-4"
						/>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>
							itemClassNameプロパティで各アイテムのスタイルをカスタマイズできます。
						</p>
					</div>
				</section>
			</Container>

			{/* 手動切り替えの無効化 */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">手動切り替えの制御</h2>
					<p className="mb-6 text-muted-foreground">
						enableManualSwitch propで手動切り替えを無効化できます。
					</p>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* 手動切り替え有効 */}
						<div className="border rounded-lg p-6 bg-card">
							<h4 className="text-base font-bold mb-3">
								手動切り替え有効（デフォルト）
							</h4>
							<AnimatedItemList
								items={animatedProblems}
								intervalSeconds={5}
								showIndicator={true}
								enableManualSwitch={true}
								className="space-y-3"
							/>
							<p className="text-sm text-muted-foreground mt-4">
								インジゲーターをクリックして切り替え可能
							</p>
						</div>

						{/* 手動切り替え無効 */}
						<div className="border rounded-lg p-6 bg-card">
							<h4 className="text-base font-bold mb-3">手動切り替え無効</h4>
							<AnimatedItemList
								items={animatedProblems}
								intervalSeconds={5}
								showIndicator={true}
								enableManualSwitch={false}
								className="space-y-3"
							/>
							<p className="text-sm text-muted-foreground mt-4">
								インジゲーターは表示のみ（クリック不可）
							</p>
						</div>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>
							プレゼンテーションモードなど、自動再生のみにしたい場合に便利です。
						</p>
					</div>
				</section>
			</Container>

			{/* セット変更時のコールバック */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">イベントハンドリング</h2>
					<p className="mb-6 text-muted-foreground">
						onSetChange propでセット変更時の処理を実装できます。
					</p>

					<div className="border rounded-lg p-6 bg-card">
						<h3 className="text-xl font-bold mb-4">変更通知の例</h3>
						<div className="mb-4 p-4 bg-muted rounded-lg">
							<p className="text-sm">
								現在のセット:{" "}
								<span className="font-bold">{currentSetIndex + 1}</span> / 3
							</p>
						</div>
						<AnimatedItemList
							items={animatedProblems}
							intervalSeconds={3}
							showIndicator={true}
							onSetChange={(index) => {
								setCurrentSetIndex(index);
							}}
							className="max-w-2xl mx-auto space-y-4"
						/>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<p>
							セットが変更されるたびにコールバック関数が呼び出されます。分析やトラッキングに活用できます。
						</p>
					</div>
				</section>
			</Container>

			{/* アクセシビリティ */}
			<Container>
				<section className="mb-16">
					<h2 className="text-2xl font-bold mb-4">アクセシビリティ対応</h2>
					<p className="mb-6 text-muted-foreground">
						ARIA属性とキーボード操作に対応しています。
					</p>

					<div className="border rounded-lg p-6 bg-card">
						<h3 className="text-xl font-bold mb-2">
							アクセシブルなアニメーションリスト
						</h3>
						<p className="text-sm text-muted-foreground mb-4">
							Tabキーでインジゲーターにフォーカス、Enterキーで選択できます。
						</p>
						<AnimatedItemList
							items={serviceFeatures}
							intervalSeconds={5}
							showIndicator={true}
							className="max-w-2xl mx-auto space-y-4"
						/>
					</div>

					<div className="mt-4 text-sm text-muted-foreground">
						<h4 className="font-medium mb-2">
							実装されているアクセシビリティ機能:
						</h4>
						<ul className="list-disc ml-5 space-y-1">
							<li>インジゲーターに role="tab" と aria-selected 属性</li>
							<li>各インジゲーターに aria-label で位置情報を提供</li>
							<li>フォーカスリングの表示</li>
							<li>キーボードでの操作に対応</li>
							<li>スクリーンリーダーでの読み上げに対応</li>
						</ul>
					</div>
				</section>
			</Container>
		</>
	);
}
