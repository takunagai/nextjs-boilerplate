import {
	FaArrowUpRightFromSquare,
	FaCheck,
	FaCircleQuestion,
	FaLightbulb,
} from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const problemAndRecommendCategories = [
	{
		id: "curious",
		title: "AI、気になるけど",
		problems: [
			"「ChatGPT？Claude？何が違うの？」",
			"「課金する価値ある？無料版じゃダメ？」",
			"「セキュリティとか大丈夫？」",
		],
		recommendedFor: "AI 初心者だけど、乗り遅れたくない経営者・個人事業主",
		icon: FaCircleQuestion,
		iconColor: "text-yellow-600",
		bgColor: "bg-yellow-50",
		borderColor: "border-yellow-200",
	},
	{
		id: "using",
		title: "使ってはいるけど",
		problems: [
			"「なんか思った答えが返ってこない」",
			"「もっと効率的な使い方があるはず」",
			"「ビジネスでどう活用すればいい？」",
		],
		recommendedFor: "ChatGPT は使ってるけど、もっと活用したい方",
		icon: FaLightbulb,
		iconColor: "text-orange-600",
		bgColor: "bg-orange-50",
		borderColor: "border-orange-200",
	},
	{
		id: "advanced",
		title: "もっと深く知りたい",
		problems: [
			"「プロンプトエンジニアリング？？」",
			"「画像生成 AI も使ってみたい」",
			"「自社専用の AI ツールが欲しい」",
		],
		recommendedFor: "社内に AI を導入したいけど、何から始めたらいいか分からない方",
		icon: FaArrowUpRightFromSquare,
		iconColor: "text-purple-600",
		bgColor: "bg-purple-50",
		borderColor: "border-purple-200",
	},
];

const additionalRecommendations = [
	"AI でコンテンツ制作を効率化したいクリエイター",
	"最新の AI 情報をキャッチアップしたい方",
];

export function ConsultingProblemsAndRecommendedSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						AIの「？」を「！」に変える
					</Heading>
					<p className="text-lg text-muted-foreground">
						こんなお悩みをお持ちの方、ぜひご相談ください
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					{problemAndRecommendCategories.map((category) => {
						const IconComponent = category.icon;
						return (
							<Card
								key={category.id}
								className={`h-full border-2 ${category.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
							>
								<CardHeader className="text-center pb-4">
									<div
										className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
									>
										<IconComponent
											className={`w-8 h-8 ${category.iconColor}`}
										/>
									</div>
									<CardTitle className="text-lg">{category.title}</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<ul className="space-y-3">
										{category.problems.map((problem, index) => (
											<li
												key={index}
												className="text-sm text-muted-foreground flex items-start gap-2"
											>
												<span className="text-primary text-xs mt-1">•</span>
												{problem}
											</li>
										))}
									</ul>
									<div className="pt-4 mt-4 border-t border-gray-100">
										<div className="flex items-start gap-2">
											<FaCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
											<p className="text-sm font-medium text-foreground">
												{category.recommendedFor}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* 追加のおすすめ対象者 */}
				<div className="max-w-3xl mx-auto mb-12">
					<div className="bg-background p-6 rounded-lg shadow-sm border border-blue-100">
						<h3 className="font-semibold text-lg mb-4 text-center">
							こんな方にも最適です
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{additionalRecommendations.map((recommendation, index) => (
								<div key={index} className="flex items-start gap-3">
									<div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
										<FaCheck className="w-3 h-3 text-blue-600" />
									</div>
									<p className="text-sm text-foreground">{recommendation}</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="text-center">
					<Heading as="h3" className="text-xl md:text-2xl">
						どれか一つでも当てはまったら、
						<span className="text-blue-600 font-bold">
							一緒に解決しましょう！
						</span>
					</Heading>
				</div>
			</Container>
		</section>
	);
}