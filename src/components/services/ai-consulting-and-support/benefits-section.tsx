import { FaDiscord, FaEnvelope, FaFile, FaList } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const benefits = [
	{
		id: "community",
		title: "受講者限定 Discord コミュニティへご招待",
		description:
			"メンバーと情報交換、いつでも質問できる環境で継続学習をサポート",
		icon: FaDiscord,
		iconColor: "text-purple-600",
		bgColor: "bg-purple-50",
	},
];

export function ConsultingBenefitsSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						受講特典
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						学習をサポートし、継続的な成長を後押しする特典をご用意
					</p>
				</div>

				<div className="max-w-md mx-auto">
					{benefits.map((benefit) => {
						const IconComponent = benefit.icon;
						return (
							<Card
								key={benefit.id}
								className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 border-purple-200"
							>
								<CardHeader className="text-center pb-4">
									<div
										className={`w-16 h-16 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
									>
										<IconComponent className={`w-8 h-8 ${benefit.iconColor}`} />
									</div>
									<CardTitle className="text-xl leading-tight">
										{benefit.title}
									</CardTitle>
								</CardHeader>
								<CardContent className="text-center">
									<p className="text-muted-foreground">{benefit.description}</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				<div className="text-center mt-12">
					<div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-bold">
						🎉 学習仲間と一緒に成長しましょう！
					</div>
				</div>
			</Container>
		</section>
	);
}
