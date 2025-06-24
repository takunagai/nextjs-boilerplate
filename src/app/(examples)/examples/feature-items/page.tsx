import type { Metadata } from "next";
import Link from "next/link";
import { FiBarChart2, FiCode, FiGlobe, FiMapPin } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeatureItems, FeatureSplit } from "@/components/ui/feature-items";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
	title: "特徴紹介セクション | サンプルページ",
	description: "特徴紹介セクションのサンプルを表示するページです。",
};

// サンプルデータ
const featureItems = [
	{
		id: "feature-1",
		title: "用途に合わせて自由にカスタマイズ",
		description:
			"Mapboxは、地図ソリューションの開発者向けプラットフォームです。社内外の様々な情報を統合し、目的・ユーザー・ブランドに合わせた地図を構築することで企業のロケーションデータ活用を促進させます。",
		imageUrl: "/dummy-images/street-photo-01.jpg",
		buttonText: "詳細を見る",
		buttonUrl: "#",
		icon: <FiMapPin className="w-6 h-6" />,
	},
	{
		id: "feature-2",
		title: "業界トップレベルの地図精度",
		description:
			"世界中の地理情報を網羅しているため、海外でもご利用が可能。日本国内はゼンリン社をベースとした高精度な地図情報を標準でご提供。",
		imageUrl: "/dummy-images/street-photo-02.jpg",
		buttonText: "事例を確認",
		buttonUrl: "#",
		icon: <FiGlobe className="w-6 h-6" />,
	},
	{
		id: "feature-3",
		title: "高度なデータ分析と可視化",
		description:
			"位置情報データを活用して、ユーザーの行動パターンやトレンドを分析。直感的なビジュアライゼーションツールで複雑なデータも簡単に理解できます。",
		imageUrl: "/dummy-images/street-photo-03.jpg",
		buttonText: "API情報",
		buttonUrl: "#",
		icon: <FiBarChart2 className="w-6 h-6" />,
	},
	{
		id: "feature-4",
		title: "シームレスな統合と拡張性",
		description:
			"既存のシステムやアプリケーションとの統合が容易で、ビジネスの成長に合わせて拡張可能。柔軟なAPIとSDKで、あらゆるプラットフォームに対応します。",
		imageUrl: "/dummy-images/street-photo-04.jpg",
		buttonText: "開発者向け情報",
		buttonUrl: "#",
		icon: <FiCode className="w-6 h-6" />,
	},
];

export default function FeatureItemsPage() {
	return (
		<div className="py-12">
			<Container width="lg">
				<div className="mb-12 text-center">
					<PageHeader title="特徴紹介セクション" />
					<p className="text-xl text-muted-foreground">
						特徴を効果的に紹介するためのレイアウトコンポーネント
					</p>
					<div className="mt-8">
						<Button asChild>
							<Link href="/examples">サンプル一覧に戻る</Link>
						</Button>
					</div>
				</div>

				<div className="mt-16 border-t pt-12">
					<h2 className="text-2xl font-bold mb-8">交互レイアウトなし</h2>
					<FeatureItems
						items={featureItems.slice(0, 3)}
						variant="split"
						alternateLayout={false}
					/>
				</div>

				<div className="mt-16 border-t pt-12">
					<h2 className="text-2xl font-bold mb-8">左右交互レイアウト</h2>
					<FeatureItems
						items={featureItems.slice(0, 3)}
						variant="split"
						alternateLayout={true}
					/>
				</div>

				<div className="mt-16 border-t pt-12">
					<h2 className="text-2xl font-bold mb-8">背景色あり</h2>
					<FeatureItems
						items={featureItems.slice(0, 3)}
						variant="split"
						alternateLayout={true}
						renderItem={(item, index) => (
							<FeatureSplit
								key={item.id}
								item={item}
								isReversed={index % 2 === 1}
								className="bg-secondary/50 rounded-lg p-8"
							/>
						)}
					/>
				</div>

				<div className="mt-16 border-t pt-12">
					<h2 className="text-2xl font-bold mb-8">オーバーレイ型（ダーク）</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{featureItems.slice(0, 3).map((item) => (
							<FeatureItems
								key={item.id}
								items={[item]}
								variant="overlay"
								overlayStyle="dark"
								overlayHeight="auto"
								spacing="small"
							/>
						))}
					</div>
				</div>

				<div className="mt-16 border-t pt-12">
					<h2 className="text-2xl font-bold mb-8">
						オーバーレイ型（グラデーション）
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{featureItems.slice(2, 4).map((item) => (
							<FeatureItems
								key={item.id}
								items={[item]}
								variant="overlay"
								overlayStyle="gradient"
								overlayHeight="auto"
								spacing="small"
							/>
						))}
					</div>
				</div>

				<div className="mt-16 border-t pt-12">
					<h2 className="text-2xl font-bold mb-8">
						オーバーレイ高さバリエーション
					</h2>
					<div className="mb-8">
						<h3 className="text-xl font-medium mb-4">1/3サイズ (third)</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FeatureItems
								items={[featureItems[0]]}
								variant="overlay"
								overlayStyle="dark"
								overlayHeight="third"
								spacing="small"
							/>
							<FeatureItems
								items={[featureItems[1]]}
								variant="overlay"
								overlayStyle="gradient"
								overlayHeight="third"
								spacing="small"
							/>
						</div>
					</div>

					<div className="mb-8">
						<h3 className="text-xl font-medium mb-4">1/2サイズ (half)</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FeatureItems
								items={[featureItems[2]]}
								variant="overlay"
								overlayStyle="dark"
								overlayHeight="half"
								spacing="small"
							/>
							<FeatureItems
								items={[featureItems[3]]}
								variant="overlay"
								overlayStyle="gradient"
								overlayHeight="half"
								spacing="small"
							/>
						</div>
					</div>

					<div>
						<h3 className="text-xl font-medium mb-4">全体 (full)</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<FeatureItems
								items={[featureItems[0]]}
								variant="overlay"
								overlayStyle="dark"
								overlayHeight="full"
								spacing="small"
							/>
							<FeatureItems
								items={[featureItems[1]]}
								variant="overlay"
								overlayStyle="gradient"
								overlayHeight="full"
								spacing="small"
							/>
						</div>
					</div>
				</div>

				<div className="mt-16 border-t pt-12">
					<h2 className="text-2xl font-bold mb-8">シンプル型（カード）</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{featureItems.map((item) => (
							<FeatureItems
								key={item.id}
								items={[item]}
								variant="simple"
								spacing="small"
							/>
						))}
					</div>
				</div>
			</Container>
		</div>
	);
}
