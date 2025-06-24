import { FaShield, FaCreditCard } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const pricingPlans = [
	{
		id: "light",
		name: "ライトプラン",
		description: "WordPress サイト（5ページまで）\nAI 活用で充実コンテンツ",
		normalCompany: "60万円〜",
		ourNormal: "30万円〜",
		specialPrice: "15万円〜",
		highlight: false,
	},
	{
		id: "standard",
		name: "スタンダードプラン",
		description: "オリジナルデザイン\nAI 機能実装\n高速制作",
		normalCompany: "100万円〜",
		ourNormal: "50万円〜",
		specialPrice: "25万円〜",
		highlight: true,
	},
	{
		id: "premium",
		name: "プレミアムプラン",
		description: "フルカスタマイズ\n高度な AI 機能\n3ヶ月サポート付き",
		normalCompany: "150万円〜",
		ourNormal: "80万円〜",
		specialPrice: "40万円〜",
		highlight: false,
	},
	{
		id: "additional",
		name: "ページ追加",
		description: "AI 活用で効率制作",
		normalCompany: "5万円〜",
		ourNormal: "3万円〜",
		specialPrice: "1.5万円〜",
		highlight: false,
	},
];

const features = [
	{
		icon: FaShield,
		title: "全額返金保証付き",
		description: "満足いただけなければ全額返金",
	},
	{
		icon: FaCreditCard,
		title: "分割払い相談可",
		description: "お支払いプランもご相談ください",
	},
];

export function PricingSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						料金プラン
					</Heading>
					<div className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full text-lg font-bold mb-6">
						テスター特別価格（先着10名様限定）
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
						{pricingPlans.map((plan) => (
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
					{features.map((feature) => {
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
