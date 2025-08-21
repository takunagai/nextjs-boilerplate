import { FaPalette, FaDollarSign, FaBox } from "react-icons/fa6";
import { Container } from "@/components/ui/container";

const strengths = [
	{
		icon: FaPalette,
		title: "デザイナー視点",
		description:
			"Webデザイナーとしての経験を活かし、構図・色彩・バランスにこだわった撮影を行います。使用目的に合わせた最適な表現を提案します。",
		features: ["構図の黄金比を意識", "色彩理論に基づく演出", "用途に合わせた最適化"],
	},
	{
		icon: FaDollarSign,
		title: "適正価格",
		description:
			"プロカメラマンの約半額の料金設定で、高品質な写真撮影を実現。予算を抑えながらも、ビジネスに必要な品質を確保します。",
		features: ["明確な料金体系", "追加料金なし", "コスパ重視"],
	},
	{
		icon: FaBox,
		title: "ワンストップサービス",
		description:
			"撮影から画像補正、印刷、Webサイト制作まで一貫してお任せいただけます。写真を活用した総合的なブランディング支援を、一つの窓口で完結できます。",
		features: ["撮影〜Web制作まで一括対応", "印刷物・デジタル両対応", "トータルブランディング支援"],
	},
];

export function ServiceStrengths() {
	return (
		<section className="py-16 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						3つの強み
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						他社にはない、私たちならではの価値提供
					</p>
				</div>

				<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{strengths.map((strength, index) => (
						<div
							key={index}
							className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
						>
							{/* 背景装飾 */}
							<div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 opacity-50 transition-transform group-hover:scale-110 dark:from-blue-900/20 dark:to-purple-900/20" />

							{/* アイコン */}
							<div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-md">
								<strength.icon className="h-7 w-7" />
							</div>

							{/* タイトル */}
							<h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
								{strength.title}
							</h3>

							{/* 説明 */}
							<p className="mb-6 text-gray-600 dark:text-gray-400">
								{strength.description}
							</p>

							{/* 特徴リスト */}
							<ul className="space-y-2">
								{strength.features.map((feature, featureIndex) => (
									<li
										key={featureIndex}
										className="flex items-center text-sm text-gray-600 dark:text-gray-400"
									>
										<svg
											className="mr-2 h-4 w-4 text-green-500"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 13l4 4L19 7"
											/>
										</svg>
										{feature}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}