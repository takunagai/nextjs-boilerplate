import {
	FaArrowUpRightFromSquare,
	FaCircleQuestion,
	FaLightbulb,
} from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const problemCategories = [
	{
		id: "curious",
		title: "AI、気になるけど",
		problems: [
			"「ChatGPT？Claude？何が違うの？」",
			"「課金する価値ある？無料版じゃダメ？」",
			"「セキュリティとか大丈夫？」",
		],
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
		icon: FaArrowUpRightFromSquare,
		iconColor: "text-purple-600",
		bgColor: "bg-purple-50",
		borderColor: "border-purple-200",
	},
];

export function ConsultingProblemsSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-6">
						こんなお悩み、ありませんか？
					</Heading>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{problemCategories.map((category) => {
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
								</CardContent>
							</Card>
						);
					})}
				</div>

				<div className="text-center mt-12">
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
