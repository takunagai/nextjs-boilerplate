import { FaCheck } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import {
	consultingPricingPlans,
	consultingFeatures,
} from "@/lib/data/pricing/consulting";

export function ConsultingPricingSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						料金
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto mb-6">
						テスター特別価格でサービスをご提供中
					</p>
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold mb-8">
						🎉 現在、テスター特別価格で50%OFF！
					</div>
				</div>

				{/* 料金カード */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					{consultingPricingPlans.map((plan) => {
						const IconComponent = plan.icon;
						return (
							<Card
								key={plan.id}
								className={`h-full border-2 transition-all duration-300 hover:shadow-lg relative ${
									plan.highlight
										? "border-blue-500 ring-2 ring-blue-500 ring-opacity-50"
										: "border-gray-200"
								}`}
							>
								{plan.highlight && (
									<div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
										<Badge className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1">
											おすすめ
										</Badge>
									</div>
								)}
								<CardHeader className="text-center pb-4">
									<div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
										<IconComponent className={`w-8 h-8 ${plan.iconColor}`} />
									</div>
									<CardTitle className="text-xl mb-2">{plan.service}</CardTitle>
									<p className="text-sm text-muted-foreground">
										{plan.description}
									</p>
								</CardHeader>
								<CardContent className="text-center space-y-6">
									<div>
										{plan.normalPrice && (
											<div className="flex items-center justify-center gap-2 mb-2">
												<span className="text-lg text-muted-foreground line-through">
													{plan.normalPrice}
												</span>
												{plan.discount && (
													<Badge variant="destructive" className="text-xs">
														{plan.discount} OFF
													</Badge>
												)}
											</div>
										)}
										<div className="text-3xl font-bold text-foreground">
											{plan.specialPrice}
										</div>
										<p className="text-sm text-muted-foreground mt-1">
											{plan.content}
										</p>
									</div>

									<div className="space-y-3">
										{plan.features.map((feature, index) => (
											<div
												key={index}
												className="flex items-start gap-3 text-left"
											>
												<FaCheck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
												<span className="text-sm text-foreground">
													{feature}
												</span>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* 案内メッセージ */}
				<div className="text-center mb-12">
					<div className="bg-muted/50 p-6 rounded-lg max-w-2xl mx-auto">
						<h3 className="font-semibold text-lg mb-2">
							🎯 まずはスポット相談から
						</h3>
						<p className="text-sm text-muted-foreground">
							どのサービスが最適かわからない方も、まずはお気軽にスポット相談をご利用ください。
							あなたの状況に最適なプランをご提案いたします。
						</p>
					</div>
				</div>

				{/* 特典・保証 */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{consultingFeatures.map((feature) => {
						const IconComponent = feature.icon;
						return (
							<Card key={feature.title} className="text-center">
								<CardHeader className="pb-4">
									<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
										<IconComponent className="w-6 h-6 text-blue-600" />
									</div>
									<CardTitle className="text-lg">{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">{feature.description}</p>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
