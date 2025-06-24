import {
	FaDollarSign,
	FaClock,
	FaLayerGroup,
	FaHandshake,
	FaShield,
} from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const reasons = [
	{
		id: "cost-performance",
		number: "1",
		title: "圧倒的なコスパ",
		subtitle: "AI 活用で制作費 50〜70% カット",
		description:
			"最新技術で効率化。でも品質は落としません。\n大手制作会社の半額以下で、同等以上のクオリティを。",
		icon: FaDollarSign,
		iconColor: "text-green-600",
		bgColor: "bg-green-50",
		borderColor: "border-green-200",
	},
	{
		id: "speed-delivery",
		number: "2",
		title: "スピード納品",
		subtitle: "通常の 1/3 の期間で完成",
		description: "AI が下準備、人が仕上げ。\nこの分業で、納期を大幅短縮。",
		icon: FaClock,
		iconColor: "text-blue-600",
		bgColor: "bg-blue-50",
		borderColor: "border-blue-200",
	},
	{
		id: "comprehensive-skills",
		number: "3",
		title: "総合力",
		subtitle: "企画から運用まで、ワンストップ",
		description:
			"15年のウェブ制作経験で、デザイン・コーディング・運用まで全部お任せ。\nAI も使いこなすから、最新機能もバッチリ。",
		icon: FaLayerGroup,
		iconColor: "text-purple-600",
		bgColor: "bg-purple-50",
		borderColor: "border-purple-200",
	},
	{
		id: "flexible-support",
		number: "4",
		title: "柔軟な対応",
		subtitle: "あなたの「こうしたい」に寄り添います",
		description:
			"大手にはできない、柔軟なサポート。載ってない相談もしてください。\n予算も納期も、できる限り調整します。",
		icon: FaHandshake,
		iconColor: "text-orange-600",
		bgColor: "bg-orange-50",
		borderColor: "border-orange-200",
	},
	{
		id: "guarantee",
		number: "5",
		title: "安心保証",
		subtitle: "満足いただけなければ全額返金",
		description: "自信があるから、できる保証。\nまずは気軽にご相談ください。",
		icon: FaShield,
		iconColor: "text-red-600",
		bgColor: "bg-red-50",
		borderColor: "border-red-200",
	},
];

export function ReasonsSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						選ばれる5つの理由
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						なぜ多くのお客様に選ばれているのか、その理由をご紹介します
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{reasons.map((reason) => {
						const IconComponent = reason.icon;
						return (
							<Card
								key={reason.id}
								className={`h-full border-2 ${reason.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative`}
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
									<p className="text-sm font-bold text-primary">
										{reason.subtitle}
									</p>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line text-center">
										{reason.description}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
