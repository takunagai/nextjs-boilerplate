import { Container } from "@/components/ui/container";
import { FaCode, FaPaintbrush, FaRocket } from "react-icons/fa6";

const OVERVIEW_ITEMS = [
	{
		icon: <FaCode className="w-8 h-8 text-orange-600" />,
		title: "コードリペア",
		description:
			"React/Next.js コードの品質向上、バグ修正、TypeScript対応まで。AI生成コードを安心品質に改善します。",
		features: [
			"コード品質の向上",
			"バグ修正・エラー解決",
			"TypeScript対応",
			"パフォーマンス最適化",
		],
	},
	{
		icon: <FaPaintbrush className="w-8 h-8 text-orange-600" />,
		title: "デザインブラッシュアップ",
		description:
			"レスポンシブ対応、UI/UX改善、アクセシビリティ対応まで。プロのデザイナーが最終調整します。",
		features: [
			"レスポンシブデザイン対応",
			"UI/UX改善",
			"アクセシビリティ対応",
			"デザインシステム統一",
		],
	},
	{
		icon: <FaRocket className="w-8 h-8 text-orange-600" />,
		title: "デプロイ支援",
		description:
			"Vercel、Netlify等へのデプロイ設定、ドメイン設定、SSL設定まで。安心してリリースできるよう完全サポート。",
		features: [
			"デプロイ環境設定",
			"ドメイン・SSL設定",
			"パフォーマンス監視",
			"運用保守サポート",
		],
	},
] as const;

export function ServiceOverviewSection() {
	return (
		<section className="py-16 md:py-24 bg-gradient-to-b from-background to-orange-50/30 dark:to-orange-950/10">
			<Container>
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						3つの専門サービスで
						<br />
						<span className="text-primary">安心品質</span>を実現
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						AI で作成したフロントエンドを、プロの技術とデザイン経験で
						<br />
						安心してリリースできる品質に仕上げます
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{OVERVIEW_ITEMS.map((item, index) => (
						<div
							key={index}
							className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-105"
						>
							<div className="flex flex-col items-center text-center">
								<div className="mb-6 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-2xl">
									{item.icon}
								</div>
								<h3 className="text-xl font-bold mb-4">{item.title}</h3>
								<p className="text-muted-foreground mb-6 leading-relaxed">
									{item.description}
								</p>
								<ul className="space-y-2 w-full">
									{item.features.map((feature, featureIndex) => (
										<li
											key={featureIndex}
											className="flex items-center gap-2 text-sm"
										>
											<div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
											<span>{feature}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}