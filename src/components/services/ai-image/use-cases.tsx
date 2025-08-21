import { Container } from "@/components/ui/container";
import { FaBriefcase, FaBullhorn, FaPalette } from "react-icons/fa6";

const useCases = [
	{
		icon: FaBriefcase,
		title: "ビジネス活用",
		description: "企業・店舗運営に必要な画像を効率的に制作",
		scenarios: [
			{
				title: "商品画像制作",
				description: "ECサイト用の統一感ある商品写真を大量生成",
				benefits: ["撮影コスト削減", "バリエーション豊富", "即日対応可能"],
			},
			{
				title: "プロフィール写真",
				description: "企業サイト用のスタッフ写真やプロフィール画像",
				benefits: ["統一感のある仕上がり", "高品質な画質", "背景調整可能"],
			},
			{
				title: "営業資料・プレゼン",
				description: "提案書や資料用のイメージ画像・図解作成",
				benefits: ["オリジナル素材", "著作権クリア", "修正対応迅速"],
			},
		],
	},
	{
		icon: FaBullhorn,
		title: "マーケティング活用",
		description: "効果的な販促・広告素材を戦略的に制作",
		scenarios: [
			{
				title: "SNS投稿素材",
				description: "Instagram、Facebook等のSNS用画像を定期制作",
				benefits: ["ブランド統一", "エンゲージメント向上", "投稿頻度アップ"],
			},
			{
				title: "広告バナー・LP画像",
				description: "Web広告やランディングページ用のビジュアル制作",
				benefits: ["A/Bテスト用複数案", "高いCVR", "短期間で制作"],
			},
			{
				title: "ブランディング素材",
				description: "企業・ブランドイメージを統一する画像制作",
				benefits: ["ブランド価値向上", "認知度アップ", "競合差別化"],
			},
		],
	},
	{
		icon: FaPalette,
		title: "クリエイティブ活用",
		description: "創作活動やアート制作をAIでサポート",
		scenarios: [
			{
				title: "作品制作・アート",
				description: "デジタルアート、イラスト、コンセプトアート制作",
				benefits: ["無限のアイデア", "技術的制約なし", "短時間で完成"],
			},
			{
				title: "デザインプロトタイプ",
				description: "Webサイトやアプリ用のモックアップ画像制作",
				benefits: [
					"高速プロトタイピング",
					"多様なパターン",
					"クライアント提案",
				],
			},
			{
				title: "教育・研究素材",
				description: "教材用イラスト、研究発表用の図解・グラフ制作",
				benefits: ["わかりやすい視覚化", "オリジナル素材", "専門分野対応"],
			},
		],
	},
];

export function UseCases() {
	return (
		<section className="py-16 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						活用シーン・事例
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						様々なビジネスシーンでAI画像制作を活用
					</p>
				</div>

				<div className="mt-16 grid gap-8 lg:grid-cols-3">
					{useCases.map((useCase, index) => (
						<div
							key={index}
							className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800"
						>
							{/* アイコンとタイトル */}
							<div className="mb-6">
								<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600 dark:from-purple-900/30 dark:to-blue-900/30 dark:text-purple-400">
									<useCase.icon className="h-6 w-6" />
								</div>
								<h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
									{useCase.title}
								</h3>
								<p className="text-gray-600 dark:text-gray-400">
									{useCase.description}
								</p>
							</div>

							{/* シナリオ一覧 */}
							<div className="space-y-6">
								{useCase.scenarios.map((scenario, scenarioIndex) => (
									<div
										key={scenarioIndex}
										className="border-l-4 border-purple-200 pl-4 dark:border-purple-700"
									>
										<h4 className="mb-2 font-semibold text-gray-900 dark:text-white">
											{scenario.title}
										</h4>
										<p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
											{scenario.description}
										</p>
										<div className="flex flex-wrap gap-1">
											{scenario.benefits.map((benefit, benefitIndex) => (
												<span
													key={benefitIndex}
													className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
												>
													{benefit}
												</span>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				{/* 成功事例の数値 */}
				<div className="mt-16 grid grid-cols-2 gap-8 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-600 p-8 text-white lg:grid-cols-4">
					<div className="text-center">
						<div className="text-3xl font-bold">500+</div>
						<div className="text-sm opacity-90">制作実績</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold">95%</div>
						<div className="text-sm opacity-90">顧客満足度</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold">48h</div>
						<div className="text-sm opacity-90">平均納期</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold">70%</div>
						<div className="text-sm opacity-90">制作時間短縮</div>
					</div>
				</div>

				{/* CTA */}
				<div className="mt-12 text-center">
					<p className="mb-4 text-lg text-gray-600 dark:text-gray-400">
						あなたのビジネスでも AI画像制作を活用しませんか？
					</p>
					<a
						href="#contact"
						className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-lg"
					>
						無料相談を申し込む
					</a>
				</div>
			</Container>
		</section>
	);
}
