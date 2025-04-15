import ColumnLayout from "@/components/layout/column-layout";

/**
 * ColumnLayout サンプルページ
 * - 2カラム（左+メイン、メイン+右）
 * - 3カラム
 * - 幅・gap・レスポンシブの指定例
 */
export default function ColumnLayoutExamplePage() {
	return (
		<main className="space-y-12 p-6">
			<h1 className="text-2xl font-bold mb-6">
				ColumnLayout コンポーネント サンプル
			</h1>

			{/* モバイルでのレスポンシブ挙動の説明 */}
			<section className="mt-10">
				<h2 className="font-bold text-lg">レスポンシブデザインについて</h2>
				<p className="text-muted-foreground">
					すべてのレイアウトはモバイルファーストで設計されています。
				</p>
				<ul className="list-disc ml-5 mt-4 space-y-1">
					<li>モバイル: すべてのカラムが縦に積み重なります（w-full）</li>
					<li>タブレット以上（md）: 横並びレイアウトに切り替わります</li>
					<li>デスクトップ（lg）: カラム比率が最適化されます</li>
				</ul>
			</section>

			{/* 使用方法の説明 */}
			<section className="mt-8">
				<h2 className="font-bold text-lg">使用方法</h2>
				<p className="text-muted-foreground">
					コンポーネント合成パターンを使用しています。
					<br />
					各カラムは {"<ColumnLayout>"}{" "}
					の子コンポーネントとして提供され、レイアウトのカスタマイズが柔軟に行えます。
					<br />
					また、各カラムにはclassNameを渡すことで、幅や他のスタイルを簡単に調整できます。
				</p>
				<pre className="bg-gray-800 text-gray-100 p-4 mt-4 overflow-x-auto text-sm">
					{`<ColumnLayout variant="2col-left" gap="gap-6">
  <ColumnLayout.Left className="md:w-1/3">
    サイドバーコンテンツ
  </ColumnLayout.Left>
  <ColumnLayout.Main className="md:w-2/3">
    メインコンテンツ
  </ColumnLayout.Main>
</ColumnLayout>`}
				</pre>
			</section>

			{/* 2カラム（左+メイン）例 */}
			<section className="space-y-4">
				<h2 className="text-xl font-semibold pb-2 border-b">
					2カラム（左+メイン）
				</h2>
				<ColumnLayout
					variant="2col-left"
					gap="gap-6"
					containerClassName="items-stretch"
				>
					<ColumnLayout.Left className="md:w-1/3">
						<div className="bg-blue-100/50 p-6 h-full">
							<h3 className="font-medium mb-2">Left Column</h3>
							<p>サイドバー、ナビゲーション、フィルターなどに適しています。</p>
							<p className="mt-4 text-sm text-blue-500">md:w-1/3</p>
						</div>
					</ColumnLayout.Left>

					<ColumnLayout.Main className="md:w-2/3">
						<div className="bg-white/50 p-6 shadow-sm h-full border">
							<h3 className="font-medium mb-2">Main Column</h3>
							<p>
								メインコンテンツを表示するエリアです。最も広いスペースを確保します。
							</p>
							<p className="mt-4 text-sm text-gray-500">md:w-2/3</p>
						</div>
					</ColumnLayout.Main>
				</ColumnLayout>

				<div className="text-sm text-gray-500 mt-2">
					注: 子コンポーネントでコンテンツを定義する合成パターン
				</div>
			</section>

			{/* 2カラム（メイン+右）例 */}
			<section className="space-y-4">
				<h2 className="text-xl font-semibold pb-2 border-b">
					2カラム（メイン+右）
				</h2>
				<ColumnLayout
					variant="2col-right"
					gap="gap-6"
					containerClassName="items-stretch"
				>
					<ColumnLayout.Main className="md:w-3/4">
						<div className="bg-white/50 p-6 shadow-sm border h-full">
							<h3 className="font-medium mb-2">Main Column</h3>
							<p>メインコンテンツを表示するエリアです。</p>
							<p className="mt-4">
								右サイドにサブコンテンツがあるレイアウトです。
							</p>
						</div>
					</ColumnLayout.Main>

					<ColumnLayout.Right className="md:w-1/4">
						<div className="bg-green-100/50 p-6 h-full">
							<h3 className="font-medium mb-2">Right Column</h3>
							<p>広告、関連コンテンツ、補足情報などに適しています。</p>
							<p className="mt-4 text-sm text-green-500">md:w-1/4</p>
						</div>
					</ColumnLayout.Right>
				</ColumnLayout>

				<div className="text-sm text-gray-500 mt-2">
					注: カスタム幅指定あり（md:w-3/4 + md:w-1/4）
				</div>
			</section>

			{/* 3カラム例 */}
			<section className="space-y-4">
				<h2 className="text-xl font-semibold pb-2 border-b">3カラム</h2>
				<ColumnLayout
					variant="3col"
					gap="gap-4 md:gap-6"
					containerClassName="items-stretch"
				>
					<ColumnLayout.Left className="md:w-1/5">
						<div className="bg-blue-100/50 p-6 h-full">
							<h3 className="font-medium mb-2">Left Column</h3>
							<p>ナビゲーションやカテゴリリストなど。</p>
						</div>
					</ColumnLayout.Left>

					<ColumnLayout.Main className="md:w-3/5">
						<div className="bg-white/50 p-6 shadow-sm border h-full">
							<h3 className="font-medium mb-2">Main Column</h3>
							<p>メインコンテンツ。3カラムレイアウトの中心エリア。</p>
						</div>
					</ColumnLayout.Main>

					<ColumnLayout.Right className="md:w-1/5">
						<div className="bg-green-100/50 p-6 h-full">
							<h3 className="font-medium mb-2">Right Column</h3>
							<p>補足情報やサイドバーウィジェットなど。</p>
						</div>
					</ColumnLayout.Right>
				</ColumnLayout>

				<div className="text-sm text-gray-500 mt-2">
					注: カスタム幅指定あり（md:w-1/5 + md:w-3/5 + md:w-1/5）
				</div>
			</section>
		</main>
	);
}
