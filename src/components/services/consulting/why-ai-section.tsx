import { FaTrophy, FaClock, FaDollarSign, FaRocket } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const reasons = [
	{
		id: "competitive",
		number: "1",
		title: "競合に差をつける",
		description: "使える人と使えない人の差は開く一方",
		icon: FaTrophy,
		iconColor: "text-yellow-600",
		bgColor: "bg-yellow-50",
	},
	{
		id: "time",
		number: "2",
		title: "時間を生み出す",
		description: "単純作業は AI に任せて、創造的な仕事に集中",
		icon: FaClock,
		iconColor: "text-blue-600",
		bgColor: "bg-blue-50",
	},
	{
		id: "cost",
		number: "3",
		title: "コストを削減",
		description: "外注費を大幅カット",
		icon: FaDollarSign,
		iconColor: "text-green-600",
		bgColor: "bg-green-50",
	},
	{
		id: "possibilities",
		number: "4",
		title: "可能性を広げる",
		description: "今まで諦めていたことが実現可能に",
		icon: FaRocket,
		iconColor: "text-purple-600",
		bgColor: "bg-purple-50",
	},
];

export function ConsultingWhyAISection() {
	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						なぜ今、AI を学ぶべき？
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						AI 時代を勝ち抜く4つの理由
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{reasons.map((reason) => {
						const IconComponent = reason.icon;
						return (
							<Card
								key={reason.id}
								className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative"
							>
								{/* Number badge */}
								<div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold z-10">
									{reason.number}
								</div>

								<CardHeader className="text-center pb-4 pt-8">
									<div
										className={`w-16 h-16 ${reason.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
									>
										<IconComponent className={`w-8 h-8 ${reason.iconColor}`} />
									</div>
									<CardTitle className="text-xl">{reason.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground text-center leading-relaxed">
										{reason.description}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				<div className="text-center mt-12">
					<Card className="bg-gradient-to-r from-primary/10 to-green-600/10 border-primary/20 max-w-4xl mx-auto">
						<CardContent className="py-8">
							<Heading as="h3" className="text-2xl md:text-3xl mb-4">
								<span className="text-primary font-bold">今こそ</span>
								AI を学んで、
								<br />
								<span className="text-green-600 font-bold">未来を先取り</span>
								しませんか？
							</Heading>
						</CardContent>
					</Card>
				</div>
			</Container>
		</section>
	);
}
