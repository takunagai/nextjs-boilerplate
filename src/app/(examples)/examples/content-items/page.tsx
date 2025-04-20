import {
	type ContentItem,
	ContentItems,
} from "@/components/ui/content-items/index";
import {
	FiBox,
	FiCpu,
	FiGlobe,
	FiLayers,
	FiShield,
	FiZap,
} from "react-icons/fi";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
	title: "ContentItems コンポーネント - サンプル",
	description:
		"ContentItemsコンポーネントの全バリエーションを表示するサンプルページです。",
};

// サンプルデータ
const sampleItems: ContentItem[] = [
	{
		id: "performance",
		title: "高速なパフォーマンス",
		description:
			"最新のテクノロジーを駆使し、高速なレスポンスと快適な操作性を実現します。",
		icon: <FiZap className="w-6 h-6" />,
		imageUrl: "/dummy-images/street-photo-01.jpg",
	},
	{
		id: "security",
		title: "堅牢なセキュリティ",
		description:
			"最新のセキュリティ対策を実装し、安全なサービス運用を提供します。",
		icon: <FiShield className="w-6 h-6" />,
		imageUrl: "/dummy-images/street-photo-02.jpg",
	},
	{
		id: "scalable",
		title: "スケーラブルな設計",
		description:
			"将来の拡張性を考慮した設計で、ビジネスの成長に合わせて柔軟に対応します。",
		icon: <FiLayers className="w-6 h-6" />,
		imageUrl: "/dummy-images/street-photo-03.jpg",
	},
	{
		id: "global",
		title: "グローバル対応",
		description:
			"多言語・多通貨対応で、グローバルなビジネス展開をサポートします。",
		icon: <FiGlobe className="w-6 h-6" />,
		imageUrl: "/dummy-images/street-photo-04.jpg",
	},
	{
		id: "innovation",
		title: "先進的な機能",
		description:
			"AI・機械学習などの最新技術を活用し、革新的な機能を提供します。",
		icon: <FiCpu className="w-6 h-6" />,
		imageUrl: "/dummy-images/street-photo-01.jpg",
	},
	{
		id: "integration",
		title: "統合ソリューション",
		description: "複数のサービスを統合し、シームレスな業務フローを実現します。",
		icon: <FiBox className="w-6 h-6" />,
		imageUrl: "/dummy-images/street-photo-02.jpg",
	},
];

export default function ContentItemsExamplePage() {
	return (
		<div className="min-h-screen">
			{/* ページヘッダー */}
			<div className="py-12 space-y-2">
				<PageHeader title="ContentItems コンポーネント" />
				<p className="text-xl text-muted-foreground">
					ContentItemsコンポーネントの全バリエーションを表示するサンプルページです。
				</p>
			</div>

			{/* グリッドレイアウト */}
			<section className="py-16">
				<div className="space-y-4 mb-12">
					<h2 className="text-3xl font-bold tracking-tighter">
						グリッドレイアウト
					</h2>
					<p className="text-muted-foreground">
						3カラムのグリッドレイアウトでカードとして表示します。画像は上部に配置されます。
					</p>
				</div>

				<ContentItems
					items={sampleItems}
					layout="grid"
					columns={3}
					gap="medium"
					variant="card"
					aspectRatio="landscape"
					imagePosition="top"
				/>
			</section>

			{/* グリッドレイアウト + カードバリアント */}
			<section className="py-16">
				<div className="space-y-4 mb-12">
					<h2 className="text-3xl font-bold tracking-tighter">
						グリッドレイアウト + カード
					</h2>
					<p className="text-muted-foreground">
						3カラムのグリッドレイアウトでカードとして表示します。画像は上部に配置されます。
					</p>
				</div>

				<ContentItems
					items={sampleItems}
					layout="grid"
					columns={3}
					gap="medium"
					variant="simple"
					aspectRatio="landscape"
					imagePosition="top"
				/>
			</section>

			{/* リストレイアウト + パネルバリアント */}
			<section className="py-16">
				<div className="space-y-4 mb-12">
					<h2 className="text-3xl font-bold tracking-tighter">
						リストレイアウト + パネル
					</h2>
					<p className="text-muted-foreground">
						縦に並ぶリストレイアウトでパネルとして表示します。
					</p>
				</div>

				<ContentItems
					items={sampleItems}
					layout="list"
					gap="medium"
					variant="panel"
					aspectRatio="landscape"
				/>
			</section>

			{/* カルーセルレイアウト + カードバリアント */}
			<section className="py-16">
				<div className="space-y-4 mb-12">
					<h2 className="text-3xl font-bold tracking-tighter">
						カルーセルレイアウト + カード
					</h2>
					<p className="text-muted-foreground">
						横スクロールのカルーセルレイアウトでカードとして表示します。画像は正方形です。
					</p>
				</div>

				<ContentItems
					items={sampleItems}
					layout="carousel"
					gap="medium"
					variant="card"
					aspectRatio="square"
					imagePosition="top"
				/>
			</section>

			{/* マスリーレイアウト + シンプルバリアント */}
			<section className="w-full py-16 bg-muted/50">
				<div className="space-y-4 mb-12">
					<h2 className="text-3xl font-bold tracking-tighter">
						マスリーレイアウト + シンプル
					</h2>
					<p className="text-muted-foreground">
						新聞のような段組レイアウトでシンプルに表示します。
					</p>
				</div>

				<ContentItems
					items={sampleItems}
					layout="masonry"
					gap="medium"
					variant="simple"
				/>
			</section>

			{/* グリッドレイアウト + カード（左右画像） */}
			<section className="py-16">
				<div className="space-y-4 mb-12">
					<h2 className="text-3xl font-bold tracking-tighter">
						グリッドレイアウト + カード（左右画像）
					</h2>
					<p className="text-muted-foreground">
						2カラムのグリッドレイアウトで画像を左に配置したカードとして表示します。
					</p>
				</div>

				<ContentItems
					items={sampleItems}
					layout="grid"
					columns={1}
					gap="large"
					variant="card"
					aspectRatio="auto"
					imagePosition="left"
				/>
			</section>

			{/* グリッドレイアウト + カード（左右画像） */}
			<section className="py-16">
				<div className="space-y-4 mb-12">
					<h2 className="text-3xl font-bold tracking-tighter">
						グリッドレイアウト + カード（左右画像）
					</h2>
					<p className="text-muted-foreground">
						2カラムのグリッドレイアウトで画像を左に配置したカードとして表示します。
					</p>
				</div>

				<ContentItems
					items={sampleItems}
					layout="grid"
					columns={2}
					gap="large"
					variant="card"
					aspectRatio="auto"
					imagePosition="left"
				/>
			</section>
		</div>
	);
}
