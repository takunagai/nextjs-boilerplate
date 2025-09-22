import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { FaMagnifyingGlass, FaPalette, FaCode, FaRocket, FaCircleCheck } from "react-icons/fa6";

const processSteps = [
	{
		step: "01",
		icon: <FaMagnifyingGlass className="w-6 h-6 text-green-600" />,
		title: "要件定義・技術選定",
		description: "目的・要件を詳細にヒアリング。最適な技術スタック・アーキテクチャを提案します。",
		deliverables: ["要件定義書", "技術選定資料", "サイト設計書"],
		duration: "2-3日"
	},
	{
		step: "02",
		icon: <FaPalette className="w-6 h-6 text-blue-600" />,
		title: "UI/UXデザイン",
		description: "ユーザー体験を重視したワイヤーフレーム・デザインを作成。レスポンシブ対応も完璧に。",
		deliverables: ["ワイヤーフレーム", "デザインカンプ", "スタイルガイド"],
		duration: "3-5日"
	},
	{
		step: "03",
		icon: <FaCode className="w-6 h-6 text-purple-600" />,
		title: "Jamstack開発",
		description: "Next.js + TypeScriptで高品質なコード実装。パフォーマンス・SEO最適化も同時進行。",
		deliverables: ["フロントエンド実装", "CMS連携", "SEO最適化"],
		duration: "5-10日"
	},
	{
		step: "04",
		icon: <FaRocket className="w-6 h-6 text-orange-600" />,
		title: "デプロイ・公開",
		description: "Vercel/Netlifyへの自動デプロイ設定。CDN・SSL・ドメイン設定まで一括対応。",
		deliverables: ["本番環境構築", "ドメイン設定", "SSL証明書"],
		duration: "1-2日"
	},
	{
		step: "05",
		icon: <FaCircleCheck className="w-6 h-6 text-pink-600" />,
		title: "検証・保守サポート",
		description: "パフォーマンステスト・SEO検証実施。運用マニュアル提供と3ヶ月保守サポート付き。",
		deliverables: ["テスト結果", "運用マニュアル", "保守サポート"],
		duration: "継続"
	},
];

export function JamstackProcessSection() {
	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<Container>
				<SectionHeader
					title="開発プロセス"
					description="AI×人の力で効率化した、透明性の高い開発フロー"
				/>
				<div className="space-y-8">
					{processSteps.map((step, index) => (
						<div
							key={index}
							className="group relative bg-background border rounded-lg p-6 md:p-8 hover:shadow-lg transition-all duration-300"
						>
							<div className="flex flex-col md:flex-row md:items-start gap-6">
								{/* ステップ番号とアイコン */}
								<div className="flex items-center gap-4 md:flex-col md:items-center md:min-w-[80px]">
									<div className="flex items-center justify-center w-12 h-12 bg-green-600/10 rounded-full">
										{step.icon}
									</div>
									<span className="text-2xl font-bold text-green-600">{step.step}</span>
								</div>

								{/* コンテンツ */}
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
													className="text-xs bg-green-600/10 text-green-700 px-2 py-1 rounded"
												>
													{deliverable}
												</span>
											))}
										</div>
									</div>
								</div>
							</div>
							<div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}