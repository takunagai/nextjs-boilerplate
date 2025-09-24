import { FaPaintBrush, FaRobot, FaBrain, FaRocket } from "react-icons/fa";

interface Advantage {
	icon: React.ReactNode;
	title: string;
	description: string;
	details: string[];
}

const advantages: Advantage[] = [
	{
		icon: <FaPaintBrush className="w-8 h-8 text-violet-600" />,
		title: "15年のデザイン経験",
		description: "長年培ったデザインスキルとセンス",
		details: [
			"Adobe Creative Suite (Photoshop、Illustrator等) の熟練スキル",
			"ブランディングからUI/UXまで幅広い制作経験",
			"クライアントのニーズを的確に理解する提案力",
			"トレンドを押さえつつ、普遍的な美しさを追求",
		],
	},
	{
		icon: <FaRobot className="w-8 h-8 text-purple-600" />,
		title: "最新AI技術の活用",
		description: "日々進化するAIツールを使いこなす",
		details: [
			"Midjourney、DALL-E、Stable Diffusion等の画像生成AI",
			"ChatGPT、Claude等のテキスト生成AIでコピーライティング",
			"効率的なワークフローでスピーディな制作",
			"新しいAIツールの情報収集と実践的活用",
		],
	},
	{
		icon: <FaBrain className="w-8 h-8 text-pink-600" />,
		title: "センスと技術の融合",
		description: "AIを道具として使いこなす人間の感性",
		details: [
			"AIの出力を評価し、より良い結果を引き出すスキル",
			"「なんかAIっぽい」を脱却する仕上げの技術",
			"ブランドに合った調整とカスタマイズ",
			"人間にしかできない感性的な判断力",
		],
	},
	{
		icon: <FaRocket className="w-8 h-8 text-rose-600" />,
		title: "効率性と品質の両立",
		description: "高品質なのに従来より早くて安い",
		details: [
			"AI活用により制作時間を大幅短縮",
			"人的作業は付加価値の高い部分に集中",
			"品質を落とすことなくコストダウンを実現",
			"クライアントの予算に合わせた柔軟な対応",
		],
	},
];

export function DesignerAISection() {
	return (
		<section className="py-16 md:py-24 bg-white dark:bg-gray-900">
			<div className="container mx-auto space-y-16">
				{/* セクションヘッダー */}
				<div className="text-center space-y-4">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
						なぜ
						<span className="bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
							デザイナー × AI
						</span>
						なのか？
					</h2>
					<p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
						AIは革命的なツールですが、それを使いこなすには経験とセンスが必要です
					</p>
				</div>

				{/* 優位性グリッド */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
					{advantages.map((advantage, index) => (
						<div
							key={index}
							className="group p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
						>
							{/* アイコンとタイトル */}
							<div className="flex items-start space-x-4 mb-6">
								<div className="flex-shrink-0 p-3 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-lg">
									{advantage.icon}
								</div>
								<div>
									<h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
										{advantage.title}
									</h3>
									<p className="text-muted-foreground">
										{advantage.description}
									</p>
								</div>
							</div>

							{/* 詳細リスト */}
							<ul className="space-y-3">
								{advantage.details.map((detail, detailIndex) => (
									<li
										key={detailIndex}
										className="flex items-start space-x-3 text-sm text-gray-700 dark:text-gray-300"
									>
										<div className="flex-shrink-0 w-1.5 h-1.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full mt-2"></div>
										<span>{detail}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* 成果物の品質に関する説明 */}
				<div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-2xl p-8 md:p-12">
					<div className="text-center space-y-6">
						<h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
							結果として生まれる
							<span className="bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
								高品質なデザイン素材
							</span>
						</h3>
						<p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
							AIの生成力とデザイナーの経験・技術が組み合わさることで、
							従来よりも高速かつ低コストでありながら、
							プロフェッショナルレベルの品質を実現します。
							単純にAIにお任せするのではなく、人間の感性と技術で仕上げるからこそ、
							「AIっぽさ」を感じさせない、自然で魅力的なデザインを提供できます。
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
							<div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg">
								<div className="text-3xl font-bold text-violet-600 mb-2">
									75%
								</div>
								<div className="text-sm text-muted-foreground">
									制作時間短縮
								</div>
							</div>
							<div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg">
								<div className="text-3xl font-bold text-purple-600 mb-2">
									50%
								</div>
								<div className="text-sm text-muted-foreground">コスト削減</div>
							</div>
							<div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg">
								<div className="text-3xl font-bold text-pink-600 mb-2">
									100%
								</div>
								<div className="text-sm text-muted-foreground">
									プロクオリティ
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
