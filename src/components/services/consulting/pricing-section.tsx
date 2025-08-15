import { FaDesktop, FaShield, FaVideo } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const pricingPlans = [
	{
		id: "spot-30",
		service: "スポット相談",
		content: "30分",
		normalPrice: "1万円",
		specialPrice: "5,000円",
		highlight: false,
	},
	{
		id: "spot-60",
		service: "",
		content: "60分",
		normalPrice: "1.8万円",
		specialPrice: "9,000円",
		highlight: false,
	},
	{
		id: "ai-writing",
		service: "AI ライティング指南",
		content: "全3回（各 90分）",
		normalPrice: "9万円",
		specialPrice: "4.5万円",
		highlight: true,
	},
	{
		id: "prompt-course",
		service: "プロンプト作成講座",
		content: "全2回（各 2時間）",
		normalPrice: "8万円",
		specialPrice: "4万円",
		highlight: false,
	},
	{
		id: "consulting-monthly",
		service: "1対1コンサル",
		content: "月額（月 2回面談）",
		normalPrice: "10万円/月",
		specialPrice: "5万円/月",
		highlight: false,
	},
	{
		id: "consulting-pack",
		service: "",
		content: "3ヶ月パック",
		normalPrice: "27万円",
		specialPrice: "13.5万円",
		highlight: true,
	},
];

const features = [
	{
		icon: FaShield,
		title: "全額返金保証付き",
		description: "満足いただけなければ全額返金",
	},
	{
		icon: FaDesktop,
		title: "オンライン（Zoom）対応",
		description: "どこからでも受講可能",
	},
	{
		icon: FaVideo,
		title: "録画 OK（復習用）",
		description: "後から何度でも復習できます",
	},
];

export function ConsultingPricingSection() {
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
					<div className="min-w-[700px]">
						{/* ヘッダー */}
						<div className="grid grid-cols-4 gap-4 mb-4">
							<div className="font-bold text-lg">サービス</div>
							<div className="text-center font-bold text-lg">内容</div>
							<div className="text-center font-bold text-lg text-muted-foreground">
								通常価格
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
									<div className="grid grid-cols-4 gap-4 items-center">
										<div>
											{plan.service && (
												<h3 className="font-bold text-lg">{plan.service}</h3>
											)}
											{plan.highlight && (
												<div className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded mt-1 inline-block">
													人気
												</div>
											)}
										</div>
										<div className="text-center">
											<p className="text-sm text-muted-foreground">
												{plan.content}
											</p>
										</div>
										<div className="text-center">
											<p className="text-lg line-through text-muted-foreground">
												{plan.normalPrice}
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
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{features.map((feature) => {
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
