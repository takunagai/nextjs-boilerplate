import {
	FaBolt,
	FaDollarSign,
	FaShieldHeart,
	FaWrench,
	FaHandshake,
} from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const reasons = [
	{
		id: "speed",
		title: "圧倒的なスピード",
		description: "AI 活用で納期 1/3",
		detail: "従来の制作時間を大幅短縮。お急ぎの案件にも迅速対応いたします。",
		icon: FaBolt,
		iconColor: "text-yellow-600",
		bgColor: "bg-yellow-50",
		borderColor: "border-yellow-200",
		number: "01",
	},
	{
		id: "cost",
		title: "驚きのコスパ",
		description: "大手の半額以下",
		detail:
			"AI活用により大幅なコストダウンを実現。高品質なのに圧倒的な低価格。",
		icon: FaDollarSign,
		iconColor: "text-green-600",
		bgColor: "bg-green-50",
		borderColor: "border-green-200",
		number: "02",
	},
	{
		id: "quality",
		title: "安心の品質",
		description: "AI の粗を人がカバー",
		detail: "15年のクリエイティブ経験で、AI の出力を人間の感性で仕上げます。",
		icon: FaShieldHeart,
		iconColor: "text-blue-600",
		bgColor: "bg-blue-50",
		borderColor: "border-blue-200",
		number: "03",
	},
	{
		id: "flexibility",
		title: "柔軟な対応",
		description: "修正・調整も迅速に",
		detail: "お客様のご要望に応じて、何度でも調整・修正を承ります。",
		icon: FaWrench,
		iconColor: "text-purple-600",
		bgColor: "bg-purple-50",
		borderColor: "border-purple-200",
		number: "04",
	},
	{
		id: "support",
		title: "継続サポート",
		description: "長期的なパートナーとして",
		detail: "一時的な制作だけでなく、長期的なブランディングをサポートします。",
		icon: FaHandshake,
		iconColor: "text-orange-600",
		bgColor: "bg-orange-50",
		borderColor: "border-orange-200",
		number: "05",
	},
];

export function CreativeReasonsSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-6">
						選ばれる理由
					</Heading>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						AI × 人の感性で実現する、これまでにないクリエイティブサービスの価値
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{reasons.map((reason) => {
						const IconComponent = reason.icon;
						return (
							<Card
								key={reason.id}
								className={`h-full border-2 ${reason.borderColor} hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden`}
							>
								{/* 番号ラベル */}
								<div className="absolute top-4 right-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
									{reason.number}
								</div>

								<CardHeader className="pb-4">
									<div
										className={`w-16 h-16 ${reason.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
									>
										<IconComponent className={`w-8 h-8 ${reason.iconColor}`} />
									</div>
									<CardTitle className="text-xl text-center">
										{reason.title}
									</CardTitle>
									<p
										className={`text-center font-semibold ${reason.iconColor}`}
									>
										{reason.description}
									</p>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground text-center leading-relaxed">
										{reason.detail}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* まとめ */}
				<div className="text-center mt-12">
					<div className="inline-block bg-gradient-to-r from-blue-600 to-orange-500 text-white px-8 py-6 rounded-2xl">
						<Heading
							as="h3"
							className="text-xl md:text-2xl font-bold text-white mb-2"
						>
							これら5つの理由で、お客様に選ばれ続けています
						</Heading>
						<p className="text-lg opacity-90">
							AI と人の力を掛け合わせた、まったく新しいクリエイティブ体験を
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}
