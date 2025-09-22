import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { FaMagnifyingGlass, FaPalette, FaCode, FaRocket, FaCircleCheck } from "react-icons/fa6";

const processSteps = [
	{
		step: "01",
		icon: <FaMagnifyingGlass className="w-6 h-6 text-blue-500" />,
		title: "要件定義・サイト設計",
		description: "コンテンツ管理方法・必要機能を詳細ヒアリング。WordPressの特性を最大限活用したサイト設計を提案。",
		deliverables: ["要件定義書", "サイトマップ", "機能一覧"],
		duration: "2-3日"
	},
	{
		step: "02",
		icon: <FaPalette className="w-6 h-6 text-green-600" />,
		title: "デザイン・ワイヤー作成",
		description: "ブランドイメージを反映したオリジナルデザイン。WordPressの管理画面も使いやすくカスタマイズ。",
		deliverables: ["ワイヤーフレーム", "デザインカンプ", "管理画面設計"],
		duration: "3-5日"
	},
	{
		step: "03",
		icon: <FaCode className="w-6 h-6 text-purple-600" />,
		title: "WordPress開発",
		description: "カスタムテーマ作成・プラグイン開発。SEO・セキュリティ・高速化対策も同時実装。",
		deliverables: ["カスタムテーマ", "プラグイン開発", "SEO最適化"],
		duration: "7-14日"
	},
	{
		step: "04",
		icon: <FaRocket className="w-6 h-6 text-orange-600" />,
		title: "デプロイ・公開",
		description: "本番環境へのデプロイ・ドメイン設定。セキュリティ対策・バックアップ設定まで一括対応。",
		deliverables: ["本番環境構築", "ドメイン設定", "セキュリティ対策"],
		duration: "1-2日"
	},
	{
		step: "05",
		icon: <FaCircleCheck className="w-6 h-6 text-pink-600" />,
		title: "運用サポート",
		description: "運用マニュアル提供・操作レクチャー実施。6ヶ月間の保守サポートで安心運用。",
		deliverables: ["運用マニュアル", "操作レクチャー", "保守サポート"],
		duration: "継続"
	},
];

export function WordPressProcessSection() {
	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<Container>
				<SectionHeader
					title="開発プロセス"
					description="WordPressの特性を最大限活用する効率的な開発フロー"
				/>
				<div className="space-y-8">
					{processSteps.map((step, index) => (
						<div
							key={index}
							className="group relative bg-background border rounded-lg p-6 md:p-8 hover:shadow-lg transition-all duration-300"
						>
							<div className="flex flex-col md:flex-row md:items-start gap-6">
								<div className="flex items-center gap-4 md:flex-col md:items-center md:min-w-[80px]">
									<div className="flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-full">
										{step.icon}
									</div>
									<span className="text-2xl font-bold text-blue-500">{step.step}</span>
								</div>
								<div className="flex-1 space-y-4">
									<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
										<h3 className="text-xl font-semibold">{step.title}</h3>
										<span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full w-fit">
											期間: {step.duration}
										</span>
									</div>
									<p className="text-muted-foreground leading-relaxed">
										{step.description}
									</p>
									<div>
										<h4 className="text-sm font-semibold mb-2">成果物:</h4>
										<div className="flex flex-wrap gap-2">
											{step.deliverables.map((deliverable, deliverableIndex) => (
												<span
													key={deliverableIndex}
													className="text-xs bg-blue-500/10 text-blue-700 px-2 py-1 rounded"
												>
													{deliverable}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}