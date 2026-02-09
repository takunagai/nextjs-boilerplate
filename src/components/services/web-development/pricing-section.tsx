import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import {
	webDevPricingPlans,
	webDevPricingFeatures,
} from "@/lib/data/pricing/web-development";

export function PricingSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						気になる料金
					</Heading>
					<div className="inline-block bg-gradient-to-r from-primary/80 to-primary text-primary-foreground px-6 py-2 rounded-full text-lg font-bold mb-6">
						お試し価格（先着10名様）
					</div>
				</div>

				{/* 価格表 */}
				<div className="overflow-x-auto mb-12">
					<div className="min-w-[800px]">
						{/* ヘッダー */}
						<div className="grid grid-cols-5 gap-4 mb-4">
							<div className="font-bold text-lg">プラン</div>
							<div className="text-center font-bold text-lg">内容</div>
							<div className="text-center font-bold text-lg text-muted-foreground">
								通常の制作会社
							</div>
							<div className="text-center font-bold text-lg text-muted-foreground">
								当サービス通常
							</div>
							<div className="text-center font-bold text-lg text-primary">
								特別価格
							</div>
						</div>

						{/* プランデータ */}
						{webDevPricingPlans.map((plan) => (
							<Card
								key={plan.id}
								className={`mb-4 ${
									plan.highlight
										? "border-primary border-2 bg-primary/5"
										: "border-border"
								}`}
							>
								<CardContent className="p-4">
									<div className="grid grid-cols-5 gap-4 items-center">
										<div>
											<h3 className="font-bold text-lg">{plan.name}</h3>
											{plan.highlight && (
												<div className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded mt-1 inline-block">
													人気
												</div>
											)}
										</div>
										<div className="text-center">
											<p className="text-sm text-muted-foreground whitespace-pre-line">
												{plan.description}
											</p>
										</div>
										<div className="text-center">
											<p className="text-lg line-through text-muted-foreground">
												{plan.normalCompany}
											</p>
										</div>
										<div className="text-center">
											<p className="text-lg line-through text-muted-foreground">
												{plan.ourNormal}
											</p>
										</div>
										<div className="text-center">
											<p className="text-2xl font-bold text-primary">
												{plan.specialPrice}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>

				{/* 特典・保証 */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{webDevPricingFeatures.map((feature) => {
						const IconComponent = feature.icon;
						return (
							<Card key={feature.title} className="text-center">
								<CardHeader className="pb-4">
									<div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
										<IconComponent className="w-6 h-6 text-primary" />
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
