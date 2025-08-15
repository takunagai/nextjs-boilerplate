import { FaClock, FaDollarSign, FaStar } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const benefits = [
	{
		id: "speed",
		title: "制作期間 50% 短縮",
		description: "早くビジネスをスタートできる",
		icon: FaClock,
		iconColor: "text-blue-600",
		bgColor: "bg-blue-50",
	},
	{
		id: "cost",
		title: "制作費 50〜70% カット",
		description: "浮いた予算を広告費に回せる",
		icon: FaDollarSign,
		iconColor: "text-green-600",
		bgColor: "bg-green-50",
	},
	{
		id: "quality",
		title: "品質は向上",
		description: "AI の力 × 人間の経験 = 最強の組み合わせ",
		icon: FaStar,
		iconColor: "text-yellow-600",
		bgColor: "bg-yellow-50",
	},
];

export function AIBenefitsSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						AI 活用のメリット
					</Heading>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{benefits.map((benefit) => {
						const IconComponent = benefit.icon;
						return (
							<Card
								key={benefit.id}
								className="text-center bg-background hover:shadow-lg transition-shadow"
							>
								<CardHeader className="pb-4">
									<div
										className={`w-16 h-16 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
									>
										<IconComponent className={`w-8 h-8 ${benefit.iconColor}`} />
									</div>
									<CardTitle className="text-xl">
										<span className="text-primary font-bold">
											{benefit.title}
										</span>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">{benefit.description}</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				<div className="text-center mt-12">
					<Heading as="h3" className="text-xl md:text-2xl">
						最新の技術で、
						<span className="text-primary font-bold">
							あなたのビジネスを加速
						</span>
						させましょう
					</Heading>
				</div>
			</Container>
		</section>
	);
}
