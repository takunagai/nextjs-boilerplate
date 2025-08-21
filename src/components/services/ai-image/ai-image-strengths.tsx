import { FaPalette, FaBolt, FaWrench } from "react-icons/fa6";
import { Container } from "@/components/ui/container";

const strengths = [
	{
		icon: FaPalette,
		title: "創造性とクオリティ",
		description:
			"人間の感性とAIの無限の可能性を融合し、従来では困難だった画像制作を実現。デザイナーの審美眼で品質を保証します。",
		features: [
			"デザイナーの感性とAIの融合",
			"無限のバリエーション生成",
			"プロ品質の仕上がり",
		],
	},
	{
		icon: FaBolt,
		title: "効率性と柔軟性",
		description:
			"従来の制作時間を大幅短縮しながら、多様なバリエーションを提供。修正要望にも迅速かつ柔軟に対応できます。",
		features: ["制作時間の大幅短縮", "多様なバリエーション提供", "迅速な修正対応"],
	},
	{
		icon: FaWrench,
		title: "プロの後処理技術",
		description:
			"AI生成の画像を「AI臭さ」を消して自然に仕上げる技術力。Photoshopを駆使した高度な後処理で完璧な画像に調整します。",
		features: [
			"AI生成画像の自然な仕上げ",
			"Photoshop高度後処理",
			"ベクター画像作成対応",
		],
	},
];

export function AIImageStrengths() {
	return (
		<section className="py-16 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						AI × デザイナーの3つの強み
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						技術と創造性の融合で実現する新しい画像制作
					</p>
				</div>

				<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{strengths.map((strength, index) => (
						<div
							key={index}
							className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
						>
							{/* 背景装飾 */}
							<div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 opacity-50 transition-transform group-hover:scale-110 dark:from-purple-900/20 dark:to-blue-900/20" />

							{/* アイコン */}
							<div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-md">
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

				{/* 補足メッセージ */}
				<div className="mt-12 text-center">
					<div className="mx-auto max-w-3xl rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 p-6 dark:from-purple-900/20 dark:to-blue-900/20">
						<p className="text-gray-700 dark:text-gray-300">
							<strong>AI技術 + デザイナーの経験 = 理想の画像制作</strong>
							<br />
							最新のAI技術を活用しながら、人間ならではの感性と技術で、
							本当に「使える」高品質な画像をお届けします。
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}