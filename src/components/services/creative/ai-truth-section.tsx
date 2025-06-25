import { FaTriangleExclamation, FaEye, FaRocket } from "react-icons/fa6";
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
		<section className="w-full py-16 md:py-24 bg-muted/30">
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
					<Card className="h-full border-2 border-muted bg-muted/20">
						<CardHeader className="text-center pb-4">
							<div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
								<FaTriangleExclamation className="w-8 h-8 text-primary" />
							</div>
							<CardTitle className="text-xl text-red-800">
								AI だけじゃダメな理由
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<ul className="space-y-3">
								{aiProblems.map((problem, index) => (
									<li
										key={index}
										className="text-sm text-muted-foreground flex items-start gap-2"
									>
										<span className="text-red-500 text-xs mt-1">❌</span>
										{problem}
									</li>
								))}
							</ul>
							<div className="mt-6 p-4 bg-red-100/50 rounded-lg border border-red-200">
								<p className="text-sm text-red-700 font-medium text-center">
									AI は凄いけど、まだまだ「惜しい」ものも多い...
								</p>
							</div>
						</CardContent>
					</Card>

					{/* だから、人の目と経験が必要 */}
					<Card className="h-full border-2 border-blue-200 bg-blue-50/50">
						<CardHeader className="text-center pb-4">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
								<FaEye className="w-8 h-8 text-blue-600" />
							</div>
							<CardTitle className="text-xl text-blue-800">
								だから、人の目と経験が必要
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<ul className="space-y-3">
								{humanSolutions.map((solution, index) => (
									<li
										key={index}
										className="text-sm text-muted-foreground flex items-start gap-2"
									>
										<span className="text-blue-500 text-xs mt-1">✅</span>
										{solution}
									</li>
								))}
							</ul>
							<div className="mt-6 p-4 bg-blue-100/50 rounded-lg border border-blue-200">
								<p className="text-sm text-blue-700 font-medium text-center">
									人間の感性とAIの力を掛け合わせることで、最高の結果を
								</p>
							</div>
						</CardContent>
					</Card>
				</div>

				{/* 結論 */}
				<div className="text-center">
					<Card className="inline-block border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-blue-50">
						<CardContent className="px-8 py-6">
							<div className="flex items-center justify-center gap-4 mb-4">
								<FaRocket className="w-8 h-8 text-orange-500" />
								<Heading as="h3" className="text-2xl md:text-3xl font-bold">
									<span className="text-blue-600">AI の速さ</span>
									<span className="text-muted-foreground mx-2">×</span>
									<span className="text-orange-500">人のセンス</span>
									<span className="text-muted-foreground mx-2">=</span>
									<span className="text-primary">高品質なのに低価格！</span>
								</Heading>
							</div>
							<p className="text-muted-foreground max-w-2xl">
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
