import type { Metadata } from "next";
import { MapCard } from "@/components/map";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
	title: "マップコンポーネント例",
	description: "Googleマップを使ったアクセス/地図コンポーネントのサンプル",
};

export default function MapExamplesPage() {
	return (
		<>
			<Container as="header" className="space-y-4">
				<h1 className="text-4xl">マップコンポーネント 実装例</h1>
				<p className="text-xl text-muted-foreground">
					Googleマップを使ったアクセス/地図コンポーネント
				</p>
				<div className="mt-4 space-y-2">
					<h2 className="text-lg font-medium">特徴</h2>
					<ul className="list-disc pl-5 space-y-1">
						<li>複数の位置指定方法（住所、緯度経度、検索クエリ）をサポート</li>
						<li>ズームレベル（1〜20）やマップタイプのカスタマイズが可能</li>
						<li>レスポンシブ対応で様々な画面サイズに最適化</li>
						<li>タイトル、説明文、電話番号などの付加情報を表示可能</li>
						<li>Google Maps Embed APIを使用した高品質な地図表示</li>
					</ul>
				</div>
			</Container>

			<Container className="mt-6 space-y-10">
				<div>
					<h2 className="text-xl font-semibold mb-4">基本実装</h2>
					<p className="text-muted-foreground mb-6">
						タイトル、説明文、住所、電話番号を含むシンプルな地図コンポーネントです。
					</p>

					<MapCard
						title="川西能勢口駅"
						description="川西能勢口駅は阪急宝塚本線と能勢電鉄妙見線が交差する川西市の主要駅。大阪や宝塚方面へのアクセスが良好で、周辺に商業施設や市役所が立地し生活利便性が高い。"
						address="兵庫県川西市栄町20-1"
						allowFullScreen={true}
					/>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-4">サイズバリエーション</h2>
					<p className="text-muted-foreground mb-6">
						さまざまなサイズ指定により、レイアウトに合わせた地図を表示できます。
					</p>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
						<div>
							<h3 className="text-lg font-medium mb-2">小サイズ (max-w-sm)</h3>
							<MapCard
								title="新神戸駅"
								description="新幹線が停車する神戸の北部に位置する駅。六甲山へのハイキングコースの玄関口でもある。"
								address="兵庫県神戸市中央区熊内町1丁目"
								zoom={15}
								className="max-w-sm"
							/>
						</div>

						<div>
							<h3 className="text-lg font-medium mb-2">
								標準サイズ (デフォルト)
							</h3>
							<MapCard
								title="宝塚駅"
								description="阪急宝塚線の終点であり、宝塚歌劇団の本拠地がある駅。"
								address="兵庫県宝塚市栄町2丁目"
								zoom={16}
								phone="0797-85-2001"
							/>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-medium mb-2">
							ワイドサイズ (max-w-4xl)
						</h3>
						<MapCard
							title="大阪国際空港（伊丹空港）"
							description="大阪府豊中市と兵庫県伊丹市にまたがる国内線専用の空港。都市に近い立地から「都市型空港」として知られる。"
							address="大阪府豊中市蛍池西町3丁目"
							zoom={14}
							phone="06-6843-1122"
							className="max-w-4xl"
						/>
					</div>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-4">レスポンシブ動作</h2>
					<p className="text-muted-foreground mb-6">
						MapCardコンポーネントはビューポートサイズに応じて最適なアスペクト比に調整されます。
						下記の例では、異なる幅の制約を設けて表示効果を確認できます。
					</p>

					<div className="space-y-8">
						<div>
							<h3 className="text-lg font-medium mb-2">小さめの幅 (300px)</h3>
							<div className="max-w-[300px]">
								<MapCard
									title="神戸三宮駅"
									description="神戸市の中心部にある駅。JR・阪急・阪神・市営地下鉄・ポートライナーが集まる主要ターミナル。"
									address="兵庫県神戸市中央区"
								/>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-medium mb-2">中程度の幅 (450px)</h3>
							<div className="max-w-[450px]">
								<MapCard
									title="西宮北口駅"
									description="阪急神戸線と今津線が交わる駅。商業施設が充実した文教地区。"
									address="兵庫県西宮市甲風園"
								/>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-medium mb-2">広めの幅 (600px)</h3>
							<div className="max-w-[600px]">
								<MapCard
									title="岡本駅"
									description="阪急神戸線と神戸電鉄有馬線が乗り入れる駅。おしゃれな街として人気。"
									address="兵庫県神戸市東灘区岡本"
								/>
							</div>
						</div>
					</div>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-4">
						マップタイプとカスタマイズ
					</h2>
					<p className="text-muted-foreground mb-6">
						様々な地図タイプやズームレベル、位置指定方法を使ってマップを表示できます。
					</p>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
						<div>
							<h3 className="text-lg font-medium mb-2">標準地図（roadmap）</h3>
							<MapCard
								title="東京タワー"
								description="東京のランドマーク的存在の電波塔。高さ333mの展望台からは東京の街並みを一望できる。"
								address="東京都港区芝公園４丁目２−８"
								mapType="roadmap"
								zoom={16}
							/>
						</div>

						<div>
							<h3 className="text-lg font-medium mb-2">
								衛星写真（satellite）
							</h3>
							<MapCard
								title="富士山"
								description="日本最高峰の山（標高3,776m）。世界文化遺産に登録された、日本を代表する名峰。"
								query="富士山"
								mapType="satellite"
								zoom={12}
							/>
						</div>
					</div>
				</div>

				<div>
					<h2 className="text-xl font-semibold mb-4">オプション設定</h2>
					<p className="text-muted-foreground mb-6">
						電話番号の省略や全画面表示ボタンの無効化ができます。
					</p>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
						<div>
							<h3 className="text-lg font-medium mb-2">電話番号なし</h3>
							<MapCard
								title="梅田駅"
								description="大阪の中心部に位置する主要ターミナル駅。JR大阪駅、阪急梅田駅、阪神梅田駅、地下鉄梅田駅が集まる西日本最大級の交通ハブ。"
								address="大阪府大阪市北区梅田3丁目1"
							/>
						</div>

						<div>
							<h3 className="text-lg font-medium mb-2">全画面表示ボタンなし</h3>
							<MapCard
								title="京都駅"
								description="JR、近鉄、地下鉄が乗り入れる京都の玄関口。新幹線の停車駅であり、観光地へのアクセスに便利な立地。駅ビルには商業施設やホテルも入居。"
								address="京都府京都市下京区東塩小路釜殿町"
								zoom={15}
								phone="075-361-4410"
								allowFullScreen={false}
							/>
						</div>
					</div>
				</div>
			</Container>

			<Separator className="my-10" />

			<Container>
				<div className="prose dark:prose-invert max-w-none mb-10">
					<h2 className="text-2xl font-semibold mb-4">使用方法</h2>
					<p className="mb-4">
						MapCardコンポーネントは、Google
						Maps埋め込みを使用して場所を表示するシンプルなコンポーネントです。
						以下のようにインポートして使用できます。
					</p>

					<pre className="bg-muted p-4 rounded-md overflow-x-auto mb-6">
						<code>{`import { MapCard } from "@/components/map";

// 基本的な使用方法（住所指定）
<MapCard
  title="川西能勢口駅"
  description="川西能勢口駅は阪急宝塚本線と能勢電鉄妙見線が交差する川西市の主要駅。"
  address="兵庫県川西市栄町20-1"
  phone="00-0000-0000"
  zoom={15}
  mapType="roadmap"
/>

// 緯度・経度指定
<MapCard
  title="皇居"
  description="天皇と皇族の住まいであり、日本の象徴的な存在。"
  lat={35.685175}
  lng={139.7528}
  zoom={16}
/>

// 検索クエリ指定
<MapCard
  title="富士山"
  description="日本最高峰の山（標高3,776m）。"
  query="富士山"
  mapType="satellite"
  zoom={12}
/>`}</code>
					</pre>

					<h3 className="text-xl font-semibold mb-3">プロパティ</h3>
					<ul className="space-y-2 mb-6 list-disc pl-5">
						<li>
							<code>title</code>: 地図カードのタイトル（必須）
						</li>
						<li>
							<code>description</code>: 地図の説明文（任意）
						</li>
						<li>
							<code>address</code>: 住所（iframeSrcを指定しない場合に使用）
						</li>
						<li>
							<code>lat</code>: 緯度（addressの代わりに使用可能）
						</li>
						<li>
							<code>lng</code>: 経度（addressの代わりに使用可能）
						</li>
						<li>
							<code>query</code>:
							検索クエリ（addressやlat/lngの代わりに使用可能）
						</li>
						<li>
							<code>iframeSrc</code>:
							完全な地図埋め込みURL（指定時は他の位置情報より優先）
						</li>
						<li>
							<code>phone</code>: 電話番号（任意）
						</li>
						<li>
							<code>zoom</code>: ズームレベル（1〜20、デフォルト:15）
						</li>
						<li>
							<code>mapType</code>:
							地図タイプ（roadmap/satellite、デフォルト:roadmap）
						</li>
						<li>
							<code>language</code>: 言語設定（デフォルト:ja）
						</li>
						<li>
							<code>allowFullScreen</code>:
							全画面表示ボタンの有無（任意、デフォルト:true）
						</li>
						<li>
							<code>className</code>: 追加のクラス名（任意）
						</li>
					</ul>

					<h3 className="text-xl font-semibold mb-3">
						マップURL生成ユーティリティ
					</h3>
					<p className="mb-2">
						マップのURLを簡単に生成するためのユーティリティ関数:
					</p>
					<ul className="space-y-2 mb-6 list-disc pl-5">
						<li>
							<code>getMapUrlByAddress(address, zoom, language)</code>:
							住所からマップURLを生成
						</li>
						<li>
							<code>getMapUrlByLatLng(lat, lng, zoom, language)</code>:
							緯度経度からマップURLを生成
						</li>
						<li>
							<code>getMapUrlByQuery(query, zoom, language)</code>:
							検索クエリからマップURLを生成
						</li>
						<li>
							<code>generateGoogleMapEmbedUrl(options)</code>:
							詳細オプションでマップURLを生成
						</li>
					</ul>

					<h3 className="text-xl font-semibold mb-3">レスポンシブ対応</h3>
					<p className="mb-2">
						マップのサイズはビューポートサイズに応じて自動調整されます:
					</p>
					<ul className="space-y-2 list-disc pl-5">
						<li>
							モバイル（デフォルト）: 正方形（aspect-square）+ min-h-[200px]
						</li>
						<li>
							タブレット（sm以上、640px〜）: 4:3比率（aspect-[4/3]）+
							min-h-[280px]
						</li>
						<li>
							デスクトップ（md以上、768px〜）: 16:9比率（aspect-[16/9]）+
							min-h-[360px]
						</li>
					</ul>
				</div>
			</Container>
		</>
	);
}
