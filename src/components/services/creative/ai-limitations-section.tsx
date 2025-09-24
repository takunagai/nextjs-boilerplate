import { FaCheckCircle } from "react-icons/fa";

interface Point {
	title: string;
	description: string;
}

const keyPoints: Point[] = [
	{
		title: "ちょっとした違和感を調整",
		description: "AIの生成物は素晴らしいけれど、「なんか違う」と感じることも。長年の経験から、ブランドや用途に合わせて自然に見えるよう細かく調整します。",
	},
	{
		title: "的確な指示で効率化",
		description: "AIへの指示は具体的でないと良い結果が得られません。デザインの知識を活かして、効率的に高品質な素材を生成できる指示を作成します。",
	},
	{
		title: "最適な選択と仕上げ",
		description: "AIが提案する複数の候補から最適なものを選び、Photoshop・Illustratorで実用レベルまで仕上げます。",
	},
	{
		title: "安心して使える品質保証",
		description: "著作権の問題がないか確認し、商用利用できる安全な素材として納品。お客様に安心してご利用いただけます。",
	},
];

export function AILimitationsSection() {
	return (
		<section className="py-16 md:py-24 bg-gradient-to-b from-red-50/30 via-orange-50/30 to-yellow-50/30 dark:from-red-950/20 dark:via-orange-950/20 dark:to-yellow-950/20">
			<div className="container mx-auto space-y-16">
				{/* セクションヘッダー */}
				<div className="text-center space-y-4">
					<h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
						AIは革命的だが、
						<span className="bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
							完璧ではない
						</span>
					</h2>
					<p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto">
						AIだけに任せると生まれる問題と、人間の専門知識がなぜ必要なのかを説明します
					</p>
				</div>

				{/* ポイントリスト */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
					{keyPoints.map((point, index) => (
						<div
							key={index}
							className="relative pl-12"
						>
							{/* チェックアイコン */}
							<div className="absolute left-0 top-1 w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
								<FaCheckCircle className="w-4 h-4 text-white" />
							</div>

							{/* コンテンツ */}
							<div className="space-y-2">
								<h3 className="font-semibold text-gray-900 dark:text-gray-100">
									{point.title}
								</h3>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{point.description}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* まとめ */}
				<div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl p-8 md:p-12">
					<div className="text-center space-y-6">
						<h3 className="text-2xl md:text-3xl font-bold">
							だからこそ「AI × 人間」の組み合わせが最強
						</h3>
						<p className="text-lg opacity-90 max-w-4xl mx-auto leading-relaxed">
							AIの圧倒的な生成力と、人間の経験・センス・技術を組み合わせることで、
							単純にAIに丸投げするだけでは得られない、
							真にプロフェッショナルなクリエイティブ素材を提供できます。
						</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
							<div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
								<div className="text-2xl font-bold mb-2">AI任せの場合</div>
								<ul className="text-sm space-y-1 opacity-90">
									<li>・なんとなく違和感がある</li>
									<li>・ブランドに合わない</li>
									<li>・細部の品質が低い</li>
									<li>・著作権リスクあり</li>
								</ul>
							</div>
							<div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
								<div className="text-2xl font-bold mb-2">AI × 人間の場合</div>
								<ul className="text-sm space-y-1 opacity-90">
									<li>・ブランドに完璧にフィット</li>
									<li>・プロレベルの仕上がり</li>
									<li>・細部まで高品質</li>
									<li>・安心して商用利用可能</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}