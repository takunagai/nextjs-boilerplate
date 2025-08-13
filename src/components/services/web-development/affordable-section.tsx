import {
	FaCode,
	FaEye,
	FaHeart,
	FaLightbulb,
	FaRocket,
	FaUser,
} from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const aiEfficiencies = [
	{
		id: "research",
		title: "リサーチ時間を 70% 削減",
		description: "AI が競合分析や市場調査を高速化",
		icon: FaLightbulb,
		color: "text-blue-600",
		bgColor: "bg-blue-50",
	},
	{
		id: "content",
		title: "コンテンツ作成を 5倍速に",
		description: "SEO に強い文章を AI と共同制作",
		icon: FaRocket,
		color: "text-green-600",
		bgColor: "bg-green-50",
	},
	{
		id: "coding",
		title: "コーディング効率 3倍アップ",
		description: "AI がコードを自動生成、私が調整・最適化",
		icon: FaCode,
		color: "text-purple-600",
		bgColor: "bg-purple-50",
	},
];

const humanValues = [
	{
		id: "quality-check",
		title: "AI が作った「ちょっと変な部分」を見抜いて修正",
		icon: FaEye,
	},
	{
		id: "customer-needs",
		title: "お客様の「言葉にならない要望」を形にする",
		icon: FaUser,
	},
	{
		id: "experience",
		title: "15年の経験による、使いやすさへのこだわり",
		icon: FaHeart,
	},
];

export function AffordableSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						なぜお手頃価格で高品質を実現できるの？
					</Heading>
				</div>

				{/* AI活用による効率化 */}
				<div className="mb-16">
					<h3 className="text-2xl font-bold text-center mb-8">
						AI 活用による効率化
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{aiEfficiencies.map((item) => {
							const IconComponent = item.icon;
							return (
								<Card key={item.id} className="text-center">
									<CardHeader className="pb-4">
										<div
											className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
										>
											<IconComponent className={`w-8 h-8 ${item.color}`} />
										</div>
										<CardTitle className="text-lg">
											<span className="text-primary font-bold">
												{item.title}
											</span>
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-muted-foreground text-sm">
											{item.description}
										</p>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>

				{/* 人間の経験 */}
				<div className="mb-12">
					<h3 className="text-2xl font-bold text-center mb-8">
						でも、ここは人間の経験が活きる
					</h3>
					<div className="max-w-3xl mx-auto space-y-4">
						{humanValues.map((item) => {
							const IconComponent = item.icon;
							return (
								<div
									key={item.id}
									className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg"
								>
									<div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
										<IconComponent className="w-4 h-4 text-primary" />
									</div>
									<p className="text-muted-foreground flex-1">{item.title}</p>
								</div>
							);
						})}
					</div>
				</div>

				{/* 結果 */}
				<div className="text-center">
					<Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20 max-w-4xl mx-auto">
						<CardContent className="py-8">
							<Heading as="h3" className="text-2xl md:text-3xl mb-4">
								<span className="text-primary font-bold">結果：</span>
								制作費を 50〜70% カットしながら、
								<br />
								品質はむしろ向上！
							</Heading>
						</CardContent>
					</Card>
				</div>
			</Container>
		</section>
	);
}
