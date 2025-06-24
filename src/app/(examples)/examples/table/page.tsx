import type { Metadata } from "next";
import { FaCaretDown } from "react-icons/fa6";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Table } from "@/components/ui/table";

export const metadata: Metadata = {
	title: "テーブルサンプル | Next.js Boilerplate",
	description: "様々なバリエーションを持つテーブルコンポーネントのサンプル集",
};

// 型定義
type BasicDataItem = {
	id: number;
	product: string;
	price: string;
	stock: number;
	status: string;
};

type AnalyticsDataItem = {
	page: string;
	views: number;
	uniqueUsers: number;
	bounceRate: string;
	avgTime: string;
};

type SalesDataItem = {
	quarter: string;
	tokyo: number;
	osaka: number;
	nagoya: number;
	fukuoka: number;
};

type EmployeeDataItem = {
	id: string;
	name: string;
	department: string;
	position: string;
	joinDate: string;
};

// JSONデータ
const tableData = {
	// 製品在庫リスト
	basicData: [
		{
			id: 1,
			product: "ノートPC",
			price: "98,000円",
			stock: 12,
			status: "在庫あり",
		},
		{
			id: 2,
			product: "デスクトップPC",
			price: "145,000円",
			stock: 7,
			status: "在庫あり",
		},
		{
			id: 3,
			product: "タブレット",
			price: "65,000円",
			stock: 0,
			status: "在庫切れ",
		},
		{
			id: 4,
			product: "スマートフォン",
			price: "78,000円",
			stock: 3,
			status: "残りわずか",
		},
		{
			id: 5,
			product: "モニター",
			price: "35,000円",
			stock: 8,
			status: "在庫あり",
		},
	] as BasicDataItem[],

	// アクセス解析データ
	analyticsData: [
		{
			page: "トップページ",
			views: 12500,
			uniqueUsers: 8420,
			bounceRate: "35%",
			avgTime: "2:15",
		},
		{
			page: "商品一覧",
			views: 8750,
			uniqueUsers: 5230,
			bounceRate: "42%",
			avgTime: "1:45",
		},
		{
			page: "お問い合わせ",
			views: 3200,
			uniqueUsers: 2890,
			bounceRate: "28%",
			avgTime: "3:10",
		},
		{
			page: "企業情報",
			views: 2100,
			uniqueUsers: 1950,
			bounceRate: "40%",
			avgTime: "1:30",
		},
		{
			page: "ブログ",
			views: 4500,
			uniqueUsers: 3850,
			bounceRate: "25%",
			avgTime: "4:05",
		},
	] as AnalyticsDataItem[],

	// 売上実績データ
	salesData: [
		{ quarter: "Q1", tokyo: 1250, osaka: 980, nagoya: 820, fukuoka: 650 },
		{ quarter: "Q2", tokyo: 1420, osaka: 1050, nagoya: 890, fukuoka: 720 },
		{ quarter: "Q3", tokyo: 1320, osaka: 1100, nagoya: 950, fukuoka: 780 },
		{ quarter: "Q4", tokyo: 1550, osaka: 1250, nagoya: 1020, fukuoka: 850 },
	] as SalesDataItem[],

	// 社員情報データ
	employeeData: [
		{
			id: "E001",
			name: "田中太郎",
			department: "営業部",
			position: "部長",
			joinDate: "2015/04/01",
		},
		{
			id: "E025",
			name: "佐藤花子",
			department: "マーケティング部",
			position: "課長",
			joinDate: "2018/07/15",
		},
		{
			id: "E042",
			name: "鈴木一郎",
			department: "開発部",
			position: "主任",
			joinDate: "2019/10/01",
		},
		{
			id: "E078",
			name: "山田健太",
			department: "営業部",
			position: "社員",
			joinDate: "2022/04/01",
		},
		{
			id: "E103",
			name: "伊藤さくら",
			department: "人事部",
			position: "課長",
			joinDate: "2017/01/10",
		},
	] as EmployeeDataItem[],
};

export default function TableExamplePage() {
	// JSONデータから各データセットを取得
	const { basicData, analyticsData, salesData, employeeData } = tableData;

	return (
		<Container>
			<div className="py-10">
				<PageHeader title="テーブルコンポーネント サンプル集" />
				<p className="text-lg text-muted-foreground mb-8">
					様々なバリエーションと組み合わせのテーブルサンプルです。
				</p>

				{/* セクション1: 基本的なテーブルとバリエーション */}
				<section className="space-y-10 mb-16">
					<h2 className="text-2xl font-bold tracking-tight">基本のテーブル</h2>
					<p className="text-muted-foreground">
						cvaを利用した様々なバリエーションを持つテーブルコンポーネントです。
					</p>

					{/* 基本形 */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">1. デフォルトスタイル</h3>
						<p className="text-sm text-muted-foreground">
							特にオプションを指定しないデフォルトのテーブルスタイルです。
						</p>
						<Table>
							<Table.caption>
								<FaCaretDown />
								製品在庫リスト
							</Table.caption>
							<Table.thead>
								<Table.tr>
									<Table.th>製品ID</Table.th>
									<Table.th>製品名</Table.th>
									<Table.th>価格</Table.th>
									<Table.th>在庫数</Table.th>
									<Table.th>ステータス</Table.th>
								</Table.tr>
							</Table.thead>
							<Table.tbody>
								{basicData.map((item) => (
									<Table.tr key={`basic-${item.id}`}>
										<Table.td>{item.id}</Table.td>
										<Table.td className="font-medium">{item.product}</Table.td>
										<Table.td>{item.price}</Table.td>
										<Table.td>{item.stock}</Table.td>
										<Table.td>{item.status}</Table.td>
									</Table.tr>
								))}
							</Table.tbody>
						</Table>
					</div>

					{/* ストライプ + カード */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">
							2. ストライプ + カード表示
						</h3>
						<p className="text-sm text-muted-foreground">
							交互に背景色が変わるストライプスタイルと、カード型表示の組み合わせです。
						</p>
						<Table variant="card" striped={true} captionPosition="top">
							<Table.caption>
								<FaCaretDown />
								ページアクセス解析データ
							</Table.caption>
							<Table.thead>
								<Table.tr>
									<Table.th>ページ名</Table.th>
									<Table.th>ページビュー</Table.th>
									<Table.th>ユニークユーザー</Table.th>
									<Table.th>直帰率</Table.th>
									<Table.th>平均滞在時間</Table.th>
								</Table.tr>
							</Table.thead>
							<Table.tbody>
								{analyticsData.map((item) => (
									<Table.tr key={`analytics-${item.page}`}>
										<Table.td className="font-medium">{item.page}</Table.td>
										<Table.td>{item.views.toLocaleString()}</Table.td>
										<Table.td>{item.uniqueUsers.toLocaleString()}</Table.td>
										<Table.td>{item.bounceRate}</Table.td>
										<Table.td>{item.avgTime}</Table.td>
									</Table.tr>
								))}
							</Table.tbody>
						</Table>
					</div>

					{/* 罫線あり + 中央揃え */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">
							3. 全セル罫線 + 中央揃え + コンパクト
						</h3>
						<p className="text-sm text-muted-foreground">
							全てのセルに罫線を表示し、テキストは中央揃え、コンパクトサイズです。
						</p>
						<Table borderedCells="all" align="center" size="sm">
							<Table.caption>
								<FaCaretDown />
								地域別売上実績（単位：万円）
							</Table.caption>
							<Table.thead>
								<Table.tr>
									<Table.th>四半期</Table.th>
									<Table.th>東京</Table.th>
									<Table.th>大阪</Table.th>
									<Table.th>名古屋</Table.th>
									<Table.th>福岡</Table.th>
								</Table.tr>
							</Table.thead>
							<Table.tbody>
								{salesData.map((item) => (
									<Table.tr key={`sales-${item.quarter}`}>
										<Table.th scope="row">{item.quarter}</Table.th>
										<Table.td>{item.tokyo}</Table.td>
										<Table.td>{item.osaka}</Table.td>
										<Table.td>{item.nagoya}</Table.td>
										<Table.td>{item.fukuoka}</Table.td>
									</Table.tr>
								))}
							</Table.tbody>
							<Table.tfoot>
								<Table.tr>
									<Table.th scope="row">合計</Table.th>
									<Table.td>
										{salesData.reduce((sum, item) => sum + item.tokyo, 0)}
									</Table.td>
									<Table.td>
										{salesData.reduce((sum, item) => sum + item.osaka, 0)}
									</Table.td>
									<Table.td>
										{salesData.reduce((sum, item) => sum + item.nagoya, 0)}
									</Table.td>
									<Table.td>
										{salesData.reduce((sum, item) => sum + item.fukuoka, 0)}
									</Table.td>
								</Table.tr>
							</Table.tfoot>
						</Table>
					</div>

					{/* ボーダード + 縦罫線 + 大きめサイズ */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">
							4. 外枠罫線 + 垂直罫線 + 大きめサイズ
						</h3>
						<p className="text-sm text-muted-foreground">
							テーブル全体に枠線を表示し、縦方向の罫線と大きめのサイズを組み合わせています。
						</p>
						<Table variant="bordered" borderedCells="vertical" size="lg">
							<Table.caption>
								<FaCaretDown />
								社員情報一覧
							</Table.caption>
							<Table.thead>
								<Table.tr>
									<Table.th>社員ID</Table.th>
									<Table.th>氏名</Table.th>
									<Table.th>部署</Table.th>
									<Table.th>役職</Table.th>
									<Table.th>入社日</Table.th>
								</Table.tr>
							</Table.thead>
							<Table.tbody>
								{employeeData.map((item) => (
									<Table.tr key={`employee-${item.id}`}>
										<Table.td>{item.id}</Table.td>
										<Table.td className="font-medium">{item.name}</Table.td>
										<Table.td>{item.department}</Table.td>
										<Table.td>{item.position}</Table.td>
										<Table.td>{item.joinDate}</Table.td>
									</Table.tr>
								))}
							</Table.tbody>
						</Table>
					</div>
				</section>

				{/* セクション2: 応用パターン */}
				<section className="space-y-10 mb-16">
					<h2 className="text-2xl font-bold tracking-tight">応用パターン</h2>
					<p className="text-muted-foreground">
						特殊なレイアウトや表現を含むテーブルの応用例です。
					</p>

					{/* 入れ子テーブル */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">5. 入れ子テーブル</h3>
						<p className="text-sm text-muted-foreground">
							テーブル内に別のテーブルを入れ子にした構造です。
						</p>
						<Table variant="bordered" striped={true}>
							<Table.caption>
								<FaCaretDown />
								プロジェクト内訳
							</Table.caption>
							<Table.thead>
								<Table.tr>
									<Table.th>プロジェクト名</Table.th>
									<Table.th>予算</Table.th>
									<Table.th>担当部署</Table.th>
									<Table.th>詳細</Table.th>
								</Table.tr>
							</Table.thead>
							<Table.tbody>
								<Table.tr>
									<Table.td className="font-medium">
										Webサイトリニューアル
									</Table.td>
									<Table.td>850万円</Table.td>
									<Table.td>マーケティング部</Table.td>
									<Table.td className="p-0">
										<div className="p-2">
											<h4 className="text-sm font-semibold mb-2">工程別予算</h4>
											<Table size="sm" className="text-xs">
												<Table.thead>
													<Table.tr>
														<Table.th>工程</Table.th>
														<Table.th>予算</Table.th>
														<Table.th>期間</Table.th>
													</Table.tr>
												</Table.thead>
												<Table.tbody>
													<Table.tr>
														<Table.td>企画</Table.td>
														<Table.td>150万円</Table.td>
														<Table.td>2週間</Table.td>
													</Table.tr>
													<Table.tr>
														<Table.td>デザイン</Table.td>
														<Table.td>300万円</Table.td>
														<Table.td>4週間</Table.td>
													</Table.tr>
													<Table.tr>
														<Table.td>開発</Table.td>
														<Table.td>400万円</Table.td>
														<Table.td>8週間</Table.td>
													</Table.tr>
												</Table.tbody>
											</Table>
										</div>
									</Table.td>
								</Table.tr>
								<Table.tr>
									<Table.td className="font-medium">
										モバイルアプリ開発
									</Table.td>
									<Table.td>1,200万円</Table.td>
									<Table.td>開発部</Table.td>
									<Table.td className="p-0">
										<div className="p-2">
											<h4 className="text-sm font-semibold mb-2">工程別予算</h4>
											<Table size="sm" className="text-xs">
												<Table.thead>
													<Table.tr>
														<Table.th>工程</Table.th>
														<Table.th>予算</Table.th>
														<Table.th>期間</Table.th>
													</Table.tr>
												</Table.thead>
												<Table.tbody>
													<Table.tr>
														<Table.td>企画</Table.td>
														<Table.td>200万円</Table.td>
														<Table.td>3週間</Table.td>
													</Table.tr>
													<Table.tr>
														<Table.td>デザイン</Table.td>
														<Table.td>350万円</Table.td>
														<Table.td>5週間</Table.td>
													</Table.tr>
													<Table.tr>
														<Table.td>開発</Table.td>
														<Table.td>650万円</Table.td>
														<Table.td>12週間</Table.td>
													</Table.tr>
												</Table.tbody>
											</Table>
										</div>
									</Table.td>
								</Table.tr>
							</Table.tbody>
						</Table>
					</div>

					{/* ステータス表示テーブル */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">6. ステータス表示</h3>
						<p className="text-sm text-muted-foreground">
							ステータスを視覚的に表示するテーブルです。
						</p>
						<Table variant="card" borderedCells="horizontal">
							<Table.caption>
								<FaCaretDown />
								タスク管理リスト
							</Table.caption>
							<Table.thead>
								<Table.tr>
									<Table.th>タスク名</Table.th>
									<Table.th>担当者</Table.th>
									<Table.th>期限</Table.th>
									<Table.th>優先度</Table.th>
									<Table.th>ステータス</Table.th>
								</Table.tr>
							</Table.thead>
							<Table.tbody>
								<Table.tr>
									<Table.td className="font-medium">ログイン機能実装</Table.td>
									<Table.td>鈴木</Table.td>
									<Table.td>2025/05/15</Table.td>
									<Table.td>
										<span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
											高
										</span>
									</Table.td>
									<Table.td>
										<span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
											完了
										</span>
									</Table.td>
								</Table.tr>
								<Table.tr>
									<Table.td className="font-medium">
										画像アップロード機能
									</Table.td>
									<Table.td>田中</Table.td>
									<Table.td>2025/05/20</Table.td>
									<Table.td>
										<span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
											中
										</span>
									</Table.td>
									<Table.td>
										<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
											進行中
										</span>
									</Table.td>
								</Table.tr>
								<Table.tr>
									<Table.td className="font-medium">UI改善</Table.td>
									<Table.td>佐藤</Table.td>
									<Table.td>2025/05/25</Table.td>
									<Table.td>
										<span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
											低
										</span>
									</Table.td>
									<Table.td>
										<span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
											レビュー中
										</span>
									</Table.td>
								</Table.tr>
								<Table.tr>
									<Table.td className="font-medium">セキュリティ強化</Table.td>
									<Table.td>伊藤</Table.td>
									<Table.td>2025/05/18</Table.td>
									<Table.td>
										<span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
											高
										</span>
									</Table.td>
									<Table.td>
										<span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
											遅延
										</span>
									</Table.td>
								</Table.tr>
								<Table.tr>
									<Table.td className="font-medium">API連携</Table.td>
									<Table.td>山田</Table.td>
									<Table.td>2025/06/01</Table.td>
									<Table.td>
										<span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
											中
										</span>
									</Table.td>
									<Table.td>
										<span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
											未着手
										</span>
									</Table.td>
								</Table.tr>
							</Table.tbody>
						</Table>
					</div>

					{/* 右揃えテーブル */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">
							7. 右揃えテキスト + 反転ヘッダー
						</h3>
						<p className="text-sm text-muted-foreground">
							数値を右揃えにした財務情報テーブルの例です。ヘッダーと本文でスタイルを反転しています。
						</p>
						<div className="dark">
							<Table
								align="right"
								className="bg-white/80 text-primary-foreground [&_th]:text-center [&_th]:bg-primary-background [&_th]:text-primary-foreground [&_tbody_th]:text-left"
							>
								<Table.caption className="text-foreground">
									2025年度 四半期財務報告（単位：百万円）
								</Table.caption>
								<Table.thead>
									<Table.tr>
										<Table.th>項目</Table.th>
										<Table.th>Q1</Table.th>
										<Table.th>Q2</Table.th>
										<Table.th>Q3</Table.th>
										<Table.th>Q4</Table.th>
										<Table.th>年間</Table.th>
									</Table.tr>
								</Table.thead>
								<Table.tbody>
									<Table.tr>
										<Table.th scope="row" className="text-left">
											売上高
										</Table.th>
										<Table.td>3,250</Table.td>
										<Table.td>3,850</Table.td>
										<Table.td>4,120</Table.td>
										<Table.td>5,330</Table.td>
										<Table.td className="font-bold">16,550</Table.td>
									</Table.tr>
									<Table.tr>
										<Table.th scope="row" className="text-left">
											売上原価
										</Table.th>
										<Table.td>1,950</Table.td>
										<Table.td>2,310</Table.td>
										<Table.td>2,470</Table.td>
										<Table.td>3,200</Table.td>
										<Table.td className="font-bold">9,930</Table.td>
									</Table.tr>
									<Table.tr>
										<Table.th scope="row" className="text-left">
											売上総利益
										</Table.th>
										<Table.td>1,300</Table.td>
										<Table.td>1,540</Table.td>
										<Table.td>1,650</Table.td>
										<Table.td>2,130</Table.td>
										<Table.td className="font-bold">6,620</Table.td>
									</Table.tr>
									<Table.tr>
										<Table.th scope="row" className="text-left">
											営業利益
										</Table.th>
										<Table.td>650</Table.td>
										<Table.td>770</Table.td>
										<Table.td>825</Table.td>
										<Table.td>1,065</Table.td>
										<Table.td className="font-bold">3,310</Table.td>
									</Table.tr>
									<Table.tr>
										<Table.th scope="row" className="text-left">
											当期純利益
										</Table.th>
										<Table.td>455</Table.td>
										<Table.td>539</Table.td>
										<Table.td>578</Table.td>
										<Table.td>745</Table.td>
										<Table.td className="font-bold">2,317</Table.td>
									</Table.tr>
								</Table.tbody>
							</Table>
						</div>
					</div>
				</section>

				{/* セクション3: レスポンシブ対応テーブル */}
				<section className="space-y-10 mb-16">
					<h2 className="text-2xl font-bold tracking-tight">
						レスポンシブデザイン対応テーブル
					</h2>
					<p className="text-muted-foreground">
						モバイル画面などの小さな画面サイズに対応したテーブルのサンプルです。
					</p>

					{/* スタック表示型テーブル */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">8. スタック表示型テーブル</h3>
						<p className="text-sm text-muted-foreground">
							小さな画面ではテーブルをカード形式に変更表示します。カラム名がラベルとして表示されます。
						</p>
						<div className="rounded-md border container">
							<div className="grid gap-4 p-4 @container md:hidden">
								{employeeData.slice(0, 3).map((employee) => (
									<div
										key={`employee-card-${employee.id}`}
										className="space-y-2 rounded-md border p-4"
									>
										<div className="font-medium">{employee.name}</div>
										<div className="grid grid-cols-2 gap-1 text-sm">
											<div className="text-muted-foreground">ID:</div>
											<div>{employee.id}</div>
											<div className="text-muted-foreground">部署:</div>
											<div>{employee.department}</div>
											<div className="text-muted-foreground">役職:</div>
											<div>{employee.position}</div>
											<div className="text-muted-foreground">入社日:</div>
											<div>{employee.joinDate}</div>
										</div>
									</div>
								))}
							</div>
							<div className="hidden @container md:block">
								<Table>
									<Table.thead>
										<Table.tr>
											<Table.th>ID</Table.th>
											<Table.th>氏名</Table.th>
											<Table.th>部署</Table.th>
											<Table.th>役職</Table.th>
											<Table.th>入社日</Table.th>
										</Table.tr>
									</Table.thead>
									<Table.tbody>
										{employeeData.map((item) => (
											<Table.tr key={`employee-row-${item.id}`}>
												<Table.td>{item.id}</Table.td>
												<Table.td className="font-medium">{item.name}</Table.td>
												<Table.td>{item.department}</Table.td>
												<Table.td>{item.position}</Table.td>
												<Table.td>{item.joinDate}</Table.td>
											</Table.tr>
										))}
									</Table.tbody>
								</Table>
							</div>
						</div>
					</div>

					{/* 横スクロール */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">9. 横スクロール</h3>
						<p className="text-sm text-muted-foreground">
							テーブルが幅広い場合は、コンテナをオーバーフロー設定して横スクロールで表示します。
						</p>
						<div className="w-full overflow-x-auto container">
							<Table>
								<Table.caption>
									<FaCaretDown />
									広範なデータを含むテーブル - 横スクロールで全体を閲覧
								</Table.caption>
								<Table.thead>
									<Table.tr>
										<Table.th className="min-w-[150px]">製品コード</Table.th>
										<Table.th className="min-w-[200px]">製品名</Table.th>
										<Table.th className="min-w-[120px]">カテゴリ</Table.th>
										<Table.th className="min-w-[100px]">価格</Table.th>
										<Table.th className="min-w-[80px]">在庫数</Table.th>
										<Table.th className="min-w-[120px]">入荷日</Table.th>
										<Table.th className="min-w-[120px]">
											販売数（今月）
										</Table.th>
										<Table.th className="min-w-[120px]">
											販売数（先月）
										</Table.th>
										<Table.th className="min-w-[100px]">評価</Table.th>
										<Table.th className="min-w-[150px]">供給元</Table.th>
										<Table.th className="min-w-[200px]">備考</Table.th>
									</Table.tr>
								</Table.thead>
								<Table.tbody>
									<Table.tr>
										<Table.td>PRD-001</Table.td>
										<Table.td className="font-medium">
											超軽量ノートPC XPS-1500
										</Table.td>
										<Table.td>パソコン</Table.td>
										<Table.td>198,000円</Table.td>
										<Table.td>15</Table.td>
										<Table.td>2025/03/15</Table.td>
										<Table.td>27</Table.td>
										<Table.td>32</Table.td>
										<Table.td>4.5/5.0</Table.td>
										<Table.td>テックインダストリー</Table.td>
										<Table.td>SSDモデル、メモリ16GB</Table.td>
									</Table.tr>
									<Table.tr>
										<Table.td>PRD-002</Table.td>
										<Table.td className="font-medium">
											ハイスペックデスクトップ DS-200
										</Table.td>
										<Table.td>パソコン</Table.td>
										<Table.td>245,000円</Table.td>
										<Table.td>8</Table.td>
										<Table.td>2025/03/10</Table.td>
										<Table.td>12</Table.td>
										<Table.td>15</Table.td>
										<Table.td>4.7/5.0</Table.td>
										<Table.td>コンピュートマスター</Table.td>
										<Table.td>ゲーミング仕様、RTX4080搭載</Table.td>
									</Table.tr>
									<Table.tr>
										<Table.td>PRD-003</Table.td>
										<Table.td className="font-medium">
											タブレット TabOne Pro
										</Table.td>
										<Table.td>タブレット</Table.td>
										<Table.td>85,000円</Table.td>
										<Table.td>23</Table.td>
										<Table.td>2025/04/02</Table.td>
										<Table.td>45</Table.td>
										<Table.td>38</Table.td>
										<Table.td>4.2/5.0</Table.td>
										<Table.td>デジタルワークス</Table.td>
										<Table.td>ペン対応、256GBストレージ</Table.td>
									</Table.tr>
								</Table.tbody>
							</Table>
						</div>
					</div>

					{/* レスポンシブ＋横スクロール併用 */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">
							10. レスポンシブで出し分け ＋ 横スクロール
						</h3>
						<p className="text-sm text-muted-foreground">
							小画面では重要な列のみを表示し、他の列は横スクロールで表示する例です。
						</p>
						<div className="rounded-md container">
							<div className="w-full overflow-x-auto">
								<Table captionPosition="top">
									<Table.caption>
										<FaCaretDown />
										ハイブリッドアプローチ - レスポンシブと横スクロールの併用
									</Table.caption>
									<Table.thead>
										<Table.tr>
											<Table.th>製品名</Table.th>
											<Table.th>価格</Table.th>
											<Table.th className="hidden @container md:table-cell whitespace-nowrap">
												カテゴリ
											</Table.th>
											<Table.th className="hidden @container lg:table-cell whitespace-nowrap">
												入荷日
											</Table.th>
											<Table.th className="hidden @container xl:table-cell whitespace-nowrap">
												供給元
											</Table.th>
											<Table.th>在庫</Table.th>
											<Table.th className="hidden @container md:table-cell whitespace-nowrap">
												評価
											</Table.th>
											<Table.th className="hidden @container lg:table-cell whitespace-nowrap">
												販売数
											</Table.th>
											<Table.th className="hidden @container xl:table-cell whitespace-nowrap">
												備考
											</Table.th>
										</Table.tr>
									</Table.thead>
									<Table.tbody>
										<Table.tr>
											<Table.td className="font-medium whitespace-nowrap">
												超軽量ノートPC
											</Table.td>
											<Table.td className="whitespace-nowrap">
												198,000円
											</Table.td>
											<Table.td className="hidden @container md:table-cell whitespace-nowrap">
												パソコン
											</Table.td>
											<Table.td className="hidden @container lg:table-cell whitespace-nowrap">
												2025/03/15
											</Table.td>
											<Table.td className="hidden @container xl:table-cell whitespace-nowrap">
												テックインダストリー
											</Table.td>
											<Table.td className="whitespace-nowrap">15</Table.td>
											<Table.td className="hidden @container md:table-cell whitespace-nowrap">
												4.5/5.0
											</Table.td>
											<Table.td className="hidden @container lg:table-cell whitespace-nowrap">
												27
											</Table.td>
											<Table.td className="hidden @container xl:table-cell whitespace-nowrap">
												SSDモデル、メモリ16GB
											</Table.td>
										</Table.tr>
										<Table.tr>
											<Table.td className="font-medium whitespace-nowrap">
												ハイスペックデスクトップ
											</Table.td>
											<Table.td className="whitespace-nowrap">
												245,000円
											</Table.td>
											<Table.td className="hidden @container md:table-cell whitespace-nowrap">
												パソコン
											</Table.td>
											<Table.td className="hidden @container lg:table-cell whitespace-nowrap">
												2025/03/10
											</Table.td>
											<Table.td className="hidden @container xl:table-cell whitespace-nowrap">
												コンピュートマスター
											</Table.td>
											<Table.td className="whitespace-nowrap">8</Table.td>
											<Table.td className="hidden @container md:table-cell whitespace-nowrap">
												4.7/5.0
											</Table.td>
											<Table.td className="hidden @container lg:table-cell whitespace-nowrap">
												12
											</Table.td>
											<Table.td className="hidden @container xl:table-cell whitespace-nowrap">
												ゲーミング仕様、RTX4080搭載
											</Table.td>
										</Table.tr>
										<Table.tr>
											<Table.td className="font-medium whitespace-nowrap">
												タブレット TabOne Pro
											</Table.td>
											<Table.td className="whitespace-nowrap">
												85,000円
											</Table.td>
											<Table.td className="hidden @container md:table-cell whitespace-nowrap">
												タブレット
											</Table.td>
											<Table.td className="hidden @container lg:table-cell whitespace-nowrap">
												2025/04/02
											</Table.td>
											<Table.td className="hidden @container xl:table-cell whitespace-nowrap">
												デジタルワークス
											</Table.td>
											<Table.td className="whitespace-nowrap">23</Table.td>
											<Table.td className="hidden @container md:table-cell whitespace-nowrap">
												4.2/5.0
											</Table.td>
											<Table.td className="hidden @container lg:table-cell whitespace-nowrap">
												45
											</Table.td>
											<Table.td className="hidden @container xl:table-cell whitespace-nowrap">
												ペン対応、256GBストレージ
											</Table.td>
										</Table.tr>
									</Table.tbody>
								</Table>
							</div>
						</div>
					</div>
				</section>

				{/* セクション4: アクセシビリティ */}
				<section className="space-y-10 mb-16">
					<h2 className="text-2xl font-bold tracking-tight">
						アクセシビリティ
					</h2>
					<p className="text-muted-foreground">
						アクセシビリティを考慮したテーブルのサンプルです。
					</p>

					{/* アクセシビリティ属性の解説 */}
					<div className="space-y-4">
						<div className="rounded-md border p-6 space-y-6">
							<h3 className="text-xl font-semibold">
								アクセシビリティ属性の解説
							</h3>
							<p className="text-sm text-muted-foreground">
								テーブルで使用される主なアクセシビリティ属性の解説です。
							</p>

							<ul className="space-y-4 list-disc pl-6">
								<li>
									<div className="font-medium">aria-label</div>
									<p className="text-sm text-muted-foreground">
										aria-label属性を使用して、スクリーンリーダーで読み上げるテキストを指定します。要素の内容を補足または置き換えるために使用されます。
									</p>
								</li>
								<li>
									<div className="font-medium">aria-labelledby</div>
									<p className="text-sm text-muted-foreground">
										aria-labelledby属性を使用して、ページ内の他の要素（通常はIDで指定）を参照し、その要素のテキストを読み上げテキストとして使用します。複数の要素を参照することも可能です。
									</p>
								</li>
								<li>
									<div className="font-medium">role</div>
									<p className="text-sm text-muted-foreground">
										role属性を使用して、要素のARIA（Accessible Rich Internet
										Applications）ロールを指定します。これにより、要素の意味的な役割をスクリーンリーダーに伝えることができます。
									</p>
								</li>
								<li>
									<div className="font-medium">tabIndex</div>
									<p className="text-sm text-muted-foreground">
										tabIndex属性を使用して、要素のタブナビゲーションの順序を指定します。これにより、キーボードユーザーが論理的な順序で要素を操作できるようになります。
									</p>
								</li>
								<li>
									<div className="font-medium">aria-sort</div>
									<p className="text-sm text-muted-foreground">
										テーブルヘッダーのソート状態を示します。値には「ascending」「descending」「none」「other」があります。
									</p>
								</li>
								<li>
									<div className="font-medium">aria-describedby</div>
									<p className="text-sm text-muted-foreground">
										補足的な説明を含む要素のIDを参照します。aria-labelledbyが要素の主な識別に使われるのに対し、こちらは追加の説明に使われます。
									</p>
								</li>
							</ul>
						</div>
					</div>

					{/* アクセシビリティ */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">
							11. スクリーンリーダー対応テーブル
						</h3>
						<p className="text-sm text-muted-foreground">
							aria-sort属性によるソート状態表現と、aria-labelledbyによる説明を付与しています。
							これらはスクリーンリーダーでの読み上げに影響します。
						</p>

						<Table
							variant="bordered"
							size="md"
							aria-labelledby="sales-table-heading"
							aria-describedby="sales-table-desc"
							className="[&_th:has([aria-sort=ascending]):bg-primary/10]"
						>
							<Table.caption id="sales-table-heading">
								四半期ごとの売上データ
							</Table.caption>
							<Table.thead>
								<Table.tr>
									<Table.th scope="col" aria-sort="none">
										<div className="inline-flex items-center">
											四半期
											<span className="ml-1 text-muted-foreground">⇅</span>
										</div>
									</Table.th>
									<Table.th scope="col" aria-sort="ascending">
										<div className="inline-flex items-center">
											東京
											<span className="ml-1">↑</span>
										</div>
									</Table.th>
									<Table.th scope="col" aria-sort="none">
										<div className="inline-flex items-center">
											大阪
											<span className="ml-1 text-muted-foreground">⇅</span>
										</div>
									</Table.th>
									<Table.th scope="col" aria-sort="none">
										<div className="inline-flex items-center">
											名古屋
											<span className="ml-1 text-muted-foreground">⇅</span>
										</div>
									</Table.th>
								</Table.tr>
							</Table.thead>
							<Table.tbody>
								{salesData.map((item, index) => (
									<Table.tr key={`sales-row-${item.quarter}`}>
										<Table.th scope="row">{item.quarter}</Table.th>
										<Table.td>{item.tokyo.toLocaleString()}</Table.td>
										<Table.td>{item.osaka.toLocaleString()}</Table.td>
										<Table.td>{item.nagoya.toLocaleString()}</Table.td>
									</Table.tr>
								))}
								<Table.tr>
									<Table.th scope="row">合計</Table.th>
									<Table.td>
										{salesData
											.reduce((sum, item) => sum + item.tokyo, 0)
											.toLocaleString()}
									</Table.td>
									<Table.td>
										{salesData
											.reduce((sum, item) => sum + item.osaka, 0)
											.toLocaleString()}
									</Table.td>
									<Table.td>
										{salesData
											.reduce((sum, item) => sum + item.nagoya, 0)
											.toLocaleString()}
									</Table.td>
								</Table.tr>
							</Table.tbody>
						</Table>
						<p
							id="sales-table-desc"
							className="text-sm text-muted-foreground mb-2"
						>
							aria-sort属性によるソート状態表現と、aria-labelledbyによる説明を付与しています。
							これらはスクリーンリーダーでの読み上げに影響します。
						</p>
					</div>

					{/* 複雑な表のアクセシビリティ対応 */}
					<div className="mb-6">
						<h4 className="text-base font-medium mb-2">
							11-2. 複雑な表構造のアクセシビリティ対応
						</h4>
						<p className="text-sm text-muted-foreground mb-2">
							複雑な表構造では、headers属性を使用してセルと見出しの関係を明示します。
							これにより、スクリーンリーダーが適切にセルと見出しの関係を伝えられます。
						</p>

						<Table variant="bordered" size="md">
							<Table.caption>
								<FaCaretDown />
								部門別四半期実績（単位：百万円）
							</Table.caption>
							<Table.thead>
								<Table.tr>
									<Table.th id="empty" scope="col">
										{""}
									</Table.th>
									<Table.th id="q1" scope="col" colSpan={2}>
										Q1
									</Table.th>
									<Table.th id="q2" scope="col" colSpan={2}>
										Q2
									</Table.th>
								</Table.tr>
								<Table.tr>
									<Table.th id="department" scope="col">
										部門
									</Table.th>
									<Table.th id="q1_sales" headers="q1" scope="col">
										売上
									</Table.th>
									<Table.th id="q1_profit" headers="q1" scope="col">
										利益
									</Table.th>
									<Table.th id="q2_sales" headers="q2" scope="col">
										売上
									</Table.th>
									<Table.th id="q2_profit" headers="q2" scope="col">
										利益
									</Table.th>
								</Table.tr>
							</Table.thead>
							<Table.tbody>
								<Table.tr>
									<Table.th id="sales_dept" scope="row">
										営業部
									</Table.th>
									<Table.td
										headers="q1 q1_sales sales_dept"
										aria-label="営業部、第1四半期、売上"
									>
										320
									</Table.td>
									<Table.td
										headers="q1 q1_profit sales_dept"
										aria-label="営業部、第1四半期、利益"
									>
										128
									</Table.td>
									<Table.td
										headers="q2 q2_sales sales_dept"
										aria-label="営業部、第2四半期、売上"
									>
										380
									</Table.td>
									<Table.td
										headers="q2 q2_profit sales_dept"
										aria-label="営業部、第2四半期、利益"
									>
										152
									</Table.td>
								</Table.tr>
								<Table.tr>
									<Table.th id="marketing_dept" scope="row">
										マーケティング部
									</Table.th>
									<Table.td headers="q1 q1_sales marketing_dept">250</Table.td>
									<Table.td headers="q1 q1_profit marketing_dept">85</Table.td>
									<Table.td headers="q2 q2_sales marketing_dept">310</Table.td>
									<Table.td headers="q2 q2_profit marketing_dept">105</Table.td>
								</Table.tr>
							</Table.tbody>
						</Table>
					</div>

					{/* フォーカス可視化とキーボードアクセシビリティ */}
					<div>
						<h4 className="text-base font-medium mb-2">
							11-3. フォーカス可視化と隠し説明
						</h4>
						<p className="text-sm text-muted-foreground mb-2">
							アクセシブルな表には、sr-only（スクリーンリーダーオンリー）の補足説明と
							キーボードユーザー向けの適切なフォーカス表示が重要です。
						</p>

						<div id="employee-table-desc" className="sr-only">
							この表は社員情報を表示しています。スクリーンリーダーでは追加の説明が読み上げられます。
						</div>
						<div id="id-desc" className="sr-only">
							社員番号です
						</div>
						<div id="dept-desc" className="sr-only">
							所属部署を示します
						</div>

						<Table
							variant="bordered"
							size="md"
							aria-describedby="employee-table-desc"
						>
							<Table.caption>
								<FaCaretDown />
								社員情報（キーボードフォーカス可視化）
							</Table.caption>
							<Table.thead>
								<Table.tr>
									<Table.th scope="col" id="col-id" aria-describedby="id-desc">
										ID
									</Table.th>
									<Table.th scope="col" id="col-name">
										氏名
									</Table.th>
									<Table.th
										scope="col"
										id="col-dept"
										aria-describedby="dept-desc"
									>
										部署
									</Table.th>
									<Table.th scope="col" id="col-role">
										役職
									</Table.th>
								</Table.tr>
							</Table.thead>
							<Table.tbody>
								{employeeData.slice(0, 3).map((employee) => (
									<Table.tr
										key={employee.id}
										tabIndex={0}
										className="focus:outline-none focus:bg-primary-foreground focus:ring-2 focus:ring-primary"
										aria-label={`${employee.name}の詳細情報`}
									>
										<Table.td headers="col-id">{employee.id}</Table.td>
										<Table.td headers="col-name" className="font-medium">
											{employee.name}
										</Table.td>
										<Table.td headers="col-dept">
											{employee.department}
										</Table.td>
										<Table.td headers="col-role">{employee.position}</Table.td>
									</Table.tr>
								))}
							</Table.tbody>
						</Table>
						<div className="text-xs text-muted-foreground p-2 border-t">
							* 行にTabキーでフォーカスできます（フォーカス時にハイライト表示）
						</div>
					</div>
				</section>

				{/* セクション5: ソート対応テーブル */}
				<section className="space-y-10 mb-16">
					<h2 className="text-2xl font-bold tracking-tight">
						ソート対応テーブル
					</h2>
					<p className="text-muted-foreground">
						ソート機能を実装したテーブルのサンプルです。
					</p>

					{/* ソート対応テーブル */}
					<div className="space-y-4">
						<h3 className="text-xl font-semibold">12. ソート対応テーブル</h3>
						<p className="text-sm text-muted-foreground">
							aria-sort属性によるソート状態表現と、aria-labelledbyによる説明を付与しています。
							これらはスクリーンリーダーでの読み上げに影響します。
						</p>

						<Table
							variant="bordered"
							size="md"
							aria-labelledby="sales-table-heading"
							aria-describedby="sales-table-desc"
							className="[&_th:has([aria-sort=ascending]):bg-primary/10]"
						>
							<Table.caption id="sales-table-heading">
								四半期ごとの売上データ
							</Table.caption>
							<Table.thead>
								<Table.tr>
									<Table.th scope="col" aria-sort="none">
										<div className="inline-flex items-center">
											四半期
											<span className="ml-1 text-muted-foreground">⇅</span>
										</div>
									</Table.th>
									<Table.th scope="col" aria-sort="ascending">
										<div className="inline-flex items-center">
											東京
											<span className="ml-1">↑</span>
										</div>
									</Table.th>
									<Table.th scope="col" aria-sort="none">
										<div className="inline-flex items-center">
											大阪
											<span className="ml-1 text-muted-foreground">⇅</span>
										</div>
									</Table.th>
									<Table.th scope="col" aria-sort="none">
										<div className="inline-flex items-center">
											名古屋
											<span className="ml-1 text-muted-foreground">⇅</span>
										</div>
									</Table.th>
								</Table.tr>
							</Table.thead>
							<Table.tbody>
								{salesData.map((item, index) => (
									<Table.tr key={`sales-row-${item.quarter}`}>
										<Table.th scope="row">{item.quarter}</Table.th>
										<Table.td>{item.tokyo.toLocaleString()}</Table.td>
										<Table.td>{item.osaka.toLocaleString()}</Table.td>
										<Table.td>{item.nagoya.toLocaleString()}</Table.td>
									</Table.tr>
								))}
								<Table.tr>
									<Table.th scope="row">合計</Table.th>
									<Table.td>
										{salesData
											.reduce((sum, item) => sum + item.tokyo, 0)
											.toLocaleString()}
									</Table.td>
									<Table.td>
										{salesData
											.reduce((sum, item) => sum + item.osaka, 0)
											.toLocaleString()}
									</Table.td>
									<Table.td>
										{salesData
											.reduce((sum, item) => sum + item.nagoya, 0)
											.toLocaleString()}
									</Table.td>
								</Table.tr>
							</Table.tbody>
						</Table>
						<p
							id="sales-table-desc"
							className="text-sm text-muted-foreground mb-2"
						>
							aria-sort属性によるソート状態表現と、aria-labelledbyによる説明を付与しています。
							これらはスクリーンリーダーでの読み上げに影響します。
						</p>
					</div>
				</section>
			</div>
		</Container>
	);
}
