import { Container } from "@/components/ui/container";
import { FaImage, FaRobot, FaWandMagicSparkles, FaCode } from "react-icons/fa6";

const toolCategories = [
	{
		icon: FaImage,
		title: "Adobe Creative Suite",
		description: "プロフェッショナル画像編集の定番ツール群",
		tools: [
			"Photoshop - 高度な画像編集・合成",
			"Lightroom Classic - RAW現像・色調補正",
			"Illustrator - ベクター画像作成",
			"After Effects - モーション・VFX",
		],
		color: "from-red-500 to-orange-500",
	},
	{
		icon: FaRobot,
		title: "AI画像生成プラットフォーム",
		description: "最新のAI技術を駆使した画像生成",
		tools: [
			"ChatGPT (DALL-E) - 多様なスタイルの画像生成",
			"Google Imagen - 高品質な写真的画像",
			"Adobe Firefly - 商用利用安心のAI生成",
			"Midjourney - アーティスティックな表現",
		],
		color: "from-blue-500 to-purple-500",
	},
	{
		icon: FaWandMagicSparkles,
		title: "画質向上・復元ツール",
		description: "AI技術による画質改善の専門ソフトウェア",
		tools: [
			"Topaz Photo AI - ノイズ除去・シャープ化",
			"Topaz Gigapixel AI - 高品質アップスケール",
			"Topaz Video AI - 動画の高画質化",
			"Real-ESRGAN - オープンソース復元AI",
		],
		color: "from-green-500 to-teal-500",
	},
	{
		icon: FaCode,
		title: "カスタムAIモデル",
		description: "特定用途に特化したAIモデルの活用",
		tools: [
			"Stable Diffusion - オープンソースAI",
			"ControlNet - 精密な構図制御",
			"LoRA Models - 特化型学習モデル",
			"Custom Fine-tuning - 独自学習モデル",
		],
		color: "from-purple-500 to-pink-500",
	},
];

const workflow = [
	{
		step: "01",
		title: "適切なツール選択",
		description: "制作内容に応じて最適なAI・ソフトウェアを選定",
	},
	{
		step: "02",
		title: "AI生成・編集実行",
		description: "複数のツールを組み合わせて段階的に制作",
	},
	{
		step: "03",
		title: "プロの後処理",
		description: "Photoshopで品質向上・自然な仕上がりに調整",
	},
	{
		step: "04",
		title: "最終品質確認",
		description: "プロ基準での品質チェック・納品準備",
	},
];

export function ProfessionalTools() {
	return (
		<section className="py-16 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						プロフェッショナルツール
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						最新AI技術とプロソフトウェアの組み合わせで最高品質を実現
					</p>
				</div>

				{/* ツールカテゴリ */}
				<div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					{toolCategories.map((category, index) => (
						<div
							key={index}
							className="group rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800"
						>
							{/* アイコン */}
							<div
								className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-md`}
							>
								<category.icon className="h-6 w-6" />
							</div>

							{/* タイトル・説明 */}
							<h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
								{category.title}
							</h3>
							<p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
								{category.description}
							</p>

							{/* ツールリスト */}
							<ul className="space-y-2">
								{category.tools.map((tool, toolIndex) => (
									<li
										key={toolIndex}
										className="text-xs text-gray-500 dark:text-gray-500"
									>
										• {tool}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* ワークフロー */}
				<div className="mt-20">
					<h3 className="mb-12 text-center text-2xl font-bold text-gray-900 dark:text-white">
						技術統合ワークフロー
					</h3>
					<div className="grid gap-8 md:grid-cols-4">
						{workflow.map((step, index) => (
							<div key={index} className="relative text-center">
								{/* ステップ番号 */}
								<div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-xl font-bold text-white shadow-lg">
									{step.step}
								</div>

								{/* ステップ内容 */}
								<h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
									{step.title}
								</h4>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{step.description}
								</p>

								{/* 矢印（最後以外） */}
								{index < workflow.length - 1 && (
									<div className="absolute left-full top-8 hidden -translate-y-1/2 md:block">
										<svg
											className="h-6 w-6 text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* 技術的優位性 */}
				<div className="mt-16 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 p-8 dark:from-purple-900/20 dark:to-blue-900/20">
					<div className="grid gap-8 md:grid-cols-3">
						<div className="text-center">
							<div className="mb-4 text-3xl font-bold text-purple-600 dark:text-purple-400">
								10+
							</div>
							<div className="text-sm text-gray-700 dark:text-gray-300">
								AI技術・ソフトウェア
							</div>
						</div>
						<div className="text-center">
							<div className="mb-4 text-3xl font-bold text-blue-600 dark:text-blue-400">
								5年+
							</div>
							<div className="text-sm text-gray-700 dark:text-gray-300">
								画像編集経験
							</div>
						</div>
						<div className="text-center">
							<div className="mb-4 text-3xl font-bold text-green-600 dark:text-green-400">
								100%
							</div>
							<div className="text-sm text-gray-700 dark:text-gray-300">
								最新技術対応
							</div>
						</div>
					</div>
				</div>

				{/* 技術更新への取り組み */}
				<div className="mt-12 text-center">
					<div className="mx-auto max-w-2xl">
						<h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
							常に最新技術をキャッチアップ
						</h4>
						<p className="text-gray-600 dark:text-gray-400">
							AI技術の進歩は日進月歩。新しいツールやモデルが登場し次第、
							いち早く検証・導入し、お客様により良いサービスを提供し続けます。
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}