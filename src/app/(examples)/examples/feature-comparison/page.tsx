import { Container } from "@/components/ui/container";
import { FeatureComparison } from "@/components/ui/feature-comparison";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "機能比較表サンプル - Next.js Boilerplate",
	description: "機能比較表（FeatureComparison）コンポーネントのサンプル",
};

// 共通データ - 再利用のために定義
const features = [
	{ key: "price", label: "価格帯", description: "標準的な案件の価格帯" },
	{
		key: "delivery",
		label: "納期",
		description: "標準的なWebサイト制作の納期",
	},
	{
		key: "ai",
		label: "AI活用",
		description: "プロジェクトへのAI導入・自動化割合",
	},
	{
		key: "revisions",
		label: "修正回数",
		description: "無料で対応可能な修正回数",
	},
	{
		key: "support",
		label: "サポート体制",
		description: "制作後のサポート対応時間",
	},
	{
		key: "custom",
		label: "カスタマイズ対応",
		description: "特殊要件への対応可否",
	},
	{
		key: "mobile",
		label: "モバイル最適化",
		description: "スマートフォン・タブレット対応",
	},
	{
		key: "maintenance",
		label: "保守プラン",
		description: "継続的な保守・管理プラン",
	},
];

const plans = [
	{ key: "otherA", label: "他社A", description: "大手制作会社" },
	{ key: "our", label: "当社", highlight: true, description: "AI活用型" },
	{ key: "otherB", label: "他社B", description: "個人事業主" },
];

const matrix = {
	price: { otherA: "80万円〜", our: "50万円〜", otherB: "30万円〜" },
	delivery: { otherA: "2〜3ヶ月", our: "最短2週間", otherB: "1〜2ヶ月" },
	ai: { otherA: false, our: true, otherB: false },
	revisions: { otherA: "2回", our: "無制限", otherB: "3回" },
	support: { otherA: "平日9-18時", our: "365日対応", otherB: "平日のみ" },
	custom: { otherA: true, our: true, otherB: false },
	mobile: { otherA: true, our: true, otherB: true },
	maintenance: { otherA: "別途契約", our: "基本プラン込", otherB: "なし" },
};

export default function FeatureComparisonPage() {
	return (
		<>
			<Container as="header" width="lg" className="space-y-4">
				<h1 className="text-4xl">機能比較表サンプル</h1>
				<p className="text-xl text-muted-foreground">
					機能比較表コンポーネントを使用した様々なデザインバリエーションのサンプルです。
				</p>
			</Container>

			<Container width="lg" paddingY="lg">
				<div className="space-y-16">
					{/* デフォルトスタイル */}
					<section>
						<h2 className="text-2xl font-bold mb-4">デフォルトスタイル</h2>
						<p className="text-muted-foreground mb-8">
							基本的なデザインのFeatureComparisonコンポーネントです。
						</p>

						<FeatureComparison
							title="サービス比較表 - デフォルト"
							features={features}
							plans={plans}
							matrix={matrix}
						/>
					</section>

					{/* ボーダードスタイル */}
					<section>
						<h2 className="text-2xl font-bold mb-4">ボーダードスタイル</h2>
						<p className="text-muted-foreground mb-8">
							境界線とアクセントカラーを強調したスタイルバリエーションです。
						</p>

						<FeatureComparison
							title="サービス比較表 - ボーダード"
							features={features}
							plans={plans}
							matrix={matrix}
							tableClassName="border-2 border-primary rounded-lg shadow-lg"
							headerClassName="bg-primary/10"
							headerCellClassName="font-bold text-primary"
							rowClassName="hover:bg-muted/20"
							cellClassName="py-3"
							highlightColumnClassName="bg-primary/10 border-l border-r border-primary/20"
						/>
					</section>

					{/* コンパクトスタイル */}
					<section>
						<h2 className="text-2xl font-bold mb-4">コンパクトスタイル</h2>
						<p className="text-muted-foreground mb-8">
							よりコンパクトでシンプルなデザインバリエーションです。パディングを減らし、文字サイズを小さくしています。
						</p>

						<FeatureComparison
							title="サービス比較表 - コンパクト"
							features={features}
							plans={plans}
							matrix={matrix}
							tableClassName="text-xs border border-muted rounded"
							headerClassName="bg-muted/50"
							headerCellClassName="p-1.5 text-xs font-medium"
							rowClassName="border-b border-muted hover:bg-muted/10"
							cellClassName="p-1.5 text-xs"
							highlightColumnClassName="bg-accent/10"
						/>
					</section>

					{/* モダンスタイル */}
					<section>
						<h2 className="text-2xl font-bold mb-4">モダンスタイル</h2>
						<p className="text-muted-foreground mb-8">
							角丸と微妙な影を取り入れた現代的なデザインバリエーションです。
						</p>

						<FeatureComparison
							title="サービス比較表 - モダン"
							features={features}
							plans={plans}
							matrix={matrix}
							tableClassName="rounded-xl overflow-hidden shadow-md bg-foreground/5"
							headerClassName="bg-secondary text-secondary-foreground"
							headerCellClassName="p-4 font-medium"
							rowClassName="border-b border-secondary/10 hover:bg-secondary/5 transition-colors"
							cellClassName="p-4"
							highlightColumnClassName="bg-primary/5 border-l-4 border-l-primary"
						/>
					</section>

					<div className="mt-12">
						<h2 className="text-2xl font-bold mb-4">なぜ当社が選ばれるのか</h2>
						<p className="text-muted-foreground mb-4">
							当社はAI技術を活用することで、従来よりも短納期・高品質なサービスを提供しています。
							特に以下の点で他社と差別化しています：
						</p>

						<ul className="list-disc pl-5 space-y-2 mb-8">
							<li>AIを活用した効率的な開発プロセス</li>
							<li>柔軟な対応と無制限の修正サポート</li>
							<li>24時間365日のサポート体制</li>
							<li>継続的な保守管理を基本プランに含む安心設計</li>
						</ul>
					</div>
				</div>
			</Container>
		</>
	);
}
