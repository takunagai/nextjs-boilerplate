import { FaEye, FaRocket, FaTriangleExclamation } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const aiProblems = [
	"生成された画像の「指が6本」問題",
	"文章の「なんか機械っぽい」感",
	"動画の「違和感ある動き」",
];

const humanSolutions = [
	"AI が作った素材を、人が調整・ブラッシュアップ",
	"お客様の「なんとなくこんな感じ」を具現化",
	"最終的な品質チェックは、やっぱり人間",
];

export function CreativeAITruthSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-slate-50/80 dark:bg-slate-900/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-6">
						AI クリエイティブの真実
					</Heading>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						AI は確かに革命的なツールです。でも、AI
						だけで完璧なクリエイティブはできません。
						<br />
						なぜなら...
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
					{/* AI だけじゃダメな理由 */}
					<Card className="h-full border-2 border-amber-200 bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-950/30 dark:to-orange-950/30 hover:shadow-lg transition-all duration-300">
						<CardHeader className="text-center pb-4">
							<div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
								<FaTriangleExclamation className="w-8 h-8 text-amber-600 dark:text-amber-400" />
							</div>
							<CardTitle className="text-xl text-amber-800 dark:text-amber-200">
								AI だけじゃダメな理由
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<ul className="space-y-3">
								{aiProblems.map((problem, index) => (
									<li
										key={index}
										className="text-sm text-foreground/80 flex items-start gap-3"
									>
										<span className="text-amber-600 dark:text-amber-400 text-xs mt-1 font-semibold">
											⚠️
										</span>
										<span className="leading-relaxed">{problem}</span>
									</li>
								))}
							</ul>
							<div className="mt-6 p-4 bg-amber-100/70 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-800">
								<p className="text-sm text-amber-800 dark:text-amber-200 font-medium text-center">
									AI は凄いけど、まだまだ「惜しい」ものも多い...
								</p>
							</div>
						</CardContent>
					</Card>

					{/* だから、人の目と経験が必要 */}
					<Card className="h-full border-2 border-blue-200 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-950/30 dark:to-indigo-950/30 hover:shadow-lg transition-all duration-300">
						<CardHeader className="text-center pb-4">
							<div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
								<FaEye className="w-8 h-8 text-blue-600 dark:text-blue-400" />
							</div>
							<CardTitle className="text-xl text-blue-800 dark:text-blue-200">
								だから、人の目と経験が必要
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<ul className="space-y-3">
								{humanSolutions.map((solution, index) => (
									<li
										key={index}
										className="text-sm text-foreground/80 flex items-start gap-3"
									>
										<span className="text-blue-600 dark:text-blue-400 text-xs mt-1 font-semibold">
											✨
										</span>
										<span className="leading-relaxed">{solution}</span>
									</li>
								))}
							</ul>
							<div className="mt-6 p-4 bg-blue-100/70 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
								<p className="text-sm text-blue-800 dark:text-blue-200 font-medium text-center">
									人間の感性とAIの力を掛け合わせることで、最高の結果を
								</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* 結論 */}
				<div className="text-center">
					<Card className="inline-block border-2 border-gradient-to-r border-primary/30 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950/50 dark:via-blue-950/50 dark:to-indigo-950/50 hover:shadow-xl transition-all duration-300">
						<CardContent className="px-8 py-6">
							<div className="flex items-center justify-center gap-4 mb-4 flex-wrap">
								<FaRocket className="w-8 h-8 text-purple-600 dark:text-purple-400" />
								<Heading as="h3" className="text-2xl md:text-3xl font-bold">
									<span className="text-blue-600 dark:text-blue-400">
										AI の速さ
									</span>
									<span className="text-muted-foreground mx-2">×</span>
									<span className="text-purple-600 dark:text-purple-400">
										人のセンス
									</span>
									<span className="text-muted-foreground mx-2">=</span>
									<span className="text-primary bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
										高品質なのに低価格！
									</span>
								</Heading>
							</div>
							<p className="text-foreground/70 max-w-2xl leading-relaxed">
								この絶妙なバランスこそが、私たちの強みです。
								<br />
								AI
								の効率性と人間の創造性、両方の良いとこ取りで、最高のクリエイティブを提供します。
							</p>
						</CardContent>
					</Card>
				</div>
			</Container>
		</section>
	);
}
