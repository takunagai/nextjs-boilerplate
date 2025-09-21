import { Container } from "@/components/ui/container";
import {
	FaEnvelope,
	FaFileCode,
	FaMagnifyingGlass,
	FaWrench,
	FaRocket,
} from "react-icons/fa6";

const PROCESS_STEPS = [
	{
		step: 1,
		icon: <FaEnvelope className="w-6 h-6" />,
		title: "お問い合わせ",
		description: "フォームから簡単にご相談",
		details: [
			"現在の状況をお聞かせください",
			"ご希望やお悩みを具体的に",
			"予算感や納期もお気軽に",
		],
		duration: "1分",
	},
	{
		step: 2,
		icon: <FaFileCode className="w-6 h-6" />,
		title: "コード提出",
		description: "GitHub または ZIP ファイルで",
		details: [
			"GitHub リポジトリのURL",
			"または ZIP ファイルでアップロード",
			"現在のサイトURLもあれば",
		],
		duration: "5分",
	},
	{
		step: 3,
		icon: <FaMagnifyingGlass className="w-6 h-6" />,
		title: "無料診断・見積もり",
		description: "専門的チェック＆改善提案",
		details: [
			"コード品質の詳細チェック",
			"デザイン・UX の評価",
			"具体的な改善提案と見積もり",
		],
		duration: "24時間以内",
	},
	{
		step: 4,
		icon: <FaWrench className="w-6 h-6" />,
		title: "修正作業",
		description: "プロが丁寧に改善",
		details: [
			"合意いただいた内容で作業開始",
			"進捗を随時ご報告",
			"疑問点は都度ご相談",
		],
		duration: "プランに応じて",
	},
	{
		step: 5,
		icon: <FaRocket className="w-6 h-6" />,
		title: "納品・デプロイ",
		description: "安心してリリース",
		details: [
			"改善されたコードをお渡し",
			"必要に応じてデプロイ代行",
			"アフターサポートも対応",
		],
		duration: "即日〜3日",
	},
] as const;

export function ProcessSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						<span className="text-primary">シンプルな流れ</span>で
						<br />
						安心してご利用いただけます
					</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						まずは無料診断から。お気軽にご相談ください
					</p>
				</div>

				<div className="relative">
					{/* デスクトップ用の接続線 */}
					<div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 w-full max-w-4xl">
						<div className="relative h-1">
							<div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
							<div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20 blur-sm" />
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
						{PROCESS_STEPS.map((step, index) => (
							<div key={index} className="relative">
								{/* モバイル用の接続線 */}
								{index < PROCESS_STEPS.length - 1 && (
									<div className="lg:hidden absolute left-8 top-20 w-0.5 h-8 bg-gradient-to-b from-primary/50 to-primary/20" />
								)}

								<div className="bg-background rounded-2xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 relative z-10">
									<div className="text-center">
										{/* ステップ番号 */}
										<div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
											{step.step}
										</div>

										{/* アイコン */}
										<div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-4">
											{step.icon}
										</div>

										{/* タイトル */}
										<h3 className="text-lg font-bold mb-2">{step.title}</h3>

										{/* 説明 */}
										<p className="text-muted-foreground text-sm mb-4">
											{step.description}
										</p>

										{/* 詳細リスト */}
										<ul className="space-y-2 mb-4">
											{step.details.map((detail, detailIndex) => (
												<li
													key={detailIndex}
													className="text-xs text-muted-foreground flex items-start gap-2"
												>
													<div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
													<span>{detail}</span>
												</li>
											))}
										</ul>

										{/* 所要時間 */}
										<div className="bg-primary/5 rounded-lg py-2 px-3">
											<span className="text-xs font-semibold text-primary">
												{step.duration}
											</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* CTA */}
					<div className="mt-16 text-center">
						<div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
							<h3 className="text-xl font-bold mb-4">
								まずは STEP 1 から始めましょう
							</h3>
							<p className="text-muted-foreground mb-6">
								どんな小さなご相談でも大歓迎。
								<br />
								無料診断で現状を把握することから始めます。
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
									無料診断を依頼する
								</button>
								<button className="border border-border px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-colors">
									料金表を詳しく見る
								</button>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}