import Link from "next/link";
import {
	FaArrowRight,
	FaCalendarCheck,
	FaEnvelope,
	FaLine,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const contactOptions = [
	{
		id: "consultation",
		title: "無料相談",
		subtitle: "まずは話を聞いてみたい方へ",
		description:
			"30分の無料相談実施中。\n対面なら能勢電鉄、阪急宝塚沿線のエリアで。\nオンライン（Zoom）も対応。\nお気軽にご利用ください。",
		icon: FaCalendarCheck,
		buttonText: "無料相談を予約",
		href: "/contact",
		iconColor: "text-primary",
		bgColor: "bg-primary/10",
		borderColor: "border-blue-200",
	},
	{
		id: "contact",
		title: "お問い合わせ",
		subtitle: "じっくり検討したい方へ",
		description: "まずはメールでご相談。\n24時間以内に返信します。",
		icon: FaEnvelope,
		buttonText: "お問い合わせフォーム",
		href: "/contact",
		iconColor: "text-green-600",
		bgColor: "bg-green-50",
		borderColor: "border-green-200",
	},
	{
		id: "line",
		title: "LINE で相談",
		subtitle: "もっと気軽に聞きたい方へ",
		description:
			"LINE でサクッと質問 OK。\n友だち追加で AI 活用ガイドプレゼント！",
		icon: FaLine,
		buttonText: "LINE で相談",
		href: "#",
		iconColor: "text-yellow-600",
		bgColor: "bg-yellow-50",
		borderColor: "border-yellow-200",
	},
];

export function ContactCTASection() {
	return (
		<section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary/5 to-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						今すぐ始める3つの方法
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						あなたのペースで、最適な方法でご相談ください
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{contactOptions.map((option) => {
						const IconComponent = option.icon;
						return (
							<Card
								key={option.id}
								className={`h-full border-2 ${option.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
							>
								<CardHeader className="text-center pb-4">
									<div
										className={`w-16 h-16 ${option.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
									>
										<IconComponent className={`w-8 h-8 ${option.iconColor}`} />
									</div>
									<CardTitle className="text-xl">{option.title}</CardTitle>
									<p className="text-sm font-medium text-primary">
										{option.subtitle}
									</p>
								</CardHeader>
								<CardContent className="text-center space-y-6">
									<p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
										{option.description}
									</p>
									<Button asChild className="w-full" size="lg">
										<Link href={option.href}>
											{option.buttonText}
											<FaArrowRight className="w-4 h-4 ml-2" />
										</Link>
									</Button>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
