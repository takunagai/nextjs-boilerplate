import {
	FaPenToSquare,
	FaImage,
	FaVideo,
	FaMusic,
	FaShield,
	FaPercent,
} from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

interface PricingItem {
	service: string;
	content: string;
	normalPrice: string;
	specialPrice: string;
	highlight?: boolean;
}

interface PricingCategory {
	id: string;
	title: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	iconColor: string;
	bgColor: string;
	items: PricingItem[];
}

const pricingCategories: PricingCategory[] = [
	{
		id: "writing",
		title: "📝 ライティング料金",
		icon: FaPenToSquare,
		iconColor: "text-primary",
		bgColor: "bg-muted/30",
		items: [
			{
				service: "ブログ記事",
				content: "2,000文字・SEO 対策込み",
				normalPrice: "2万円/記事",
				specialPrice: "1万円/記事",
				highlight: true,
			},
			{
				service: "",
				content: "月 4記事パック",
				normalPrice: "7万円",
				specialPrice: "3.5万円",
			},
			{
				service: "SNS 投稿セット",
				content: "画像＋文章 10投稿分",
				normalPrice: "3万円",
				specialPrice: "1.5万円",
			},
			{
				service: "",
				content: "月間投稿パック（30投稿）",
				normalPrice: "8万円",
				specialPrice: "4万円",
				highlight: true,
			},
		],
	},
	{
		id: "image",
		title: "🖼️ 画像生成料金",
		icon: FaImage,
		iconColor: "text-primary",
		bgColor: "bg-muted/30",
		items: [
			{
				service: "イメージ画像",
				content: "1枚（修正2回まで）",
				normalPrice: "1.5万円",
				specialPrice: "7,500円",
			},
			{
				service: "",
				content: "5枚セット",
				normalPrice: "6万円",
				specialPrice: "3万円",
				highlight: true,
			},
			{
				service: "ロゴ制作",
				content: "提案3案・修正無制限",
				normalPrice: "10万円〜",
				specialPrice: "5万円〜",
			},
		],
	},
	{
		id: "video",
		title: "🎬 動画生成料金",
		icon: FaVideo,
		iconColor: "text-primary",
		bgColor: "bg-muted/30",
		items: [
			{
				service: "ショート動画",
				content: "30秒以内",
				normalPrice: "5万円",
				specialPrice: "2.5万円",
			},
			{
				service: "",
				content: "月 10本パック",
				normalPrice: "40万円",
				specialPrice: "20万円",
				highlight: true,
			},
		],
	},
	{
		id: "sound",
		title: "🎵 サウンド生成料金",
		icon: FaMusic,
		iconColor: "text-primary",
		bgColor: "bg-muted/30",
		items: [
			{
				service: "BGM 作成",
				content: "3分程度・商用可",
				normalPrice: "5万円",
				specialPrice: "2.5万円",
			},
		],
	},
];

const guarantees = [
	{
		icon: FaShield,
		title: "全額返金保証付き",
		description: "満足いただけなければ全額返金いたします",
	},
	{
		icon: FaPercent,
		title: "継続割引あり",
		description: "3ヶ月以上のご利用で10% OFF",
	},
];

export function CreativePricingSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						料金プラン
					</Heading>
					<div className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-bold mb-6">
						テスター特別価格（先着10名様限定）
					</div>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto">
						AI活用により、従来の半額以下でプロ級のクリエイティブを提供します
					</p>
				</div>

				{/* 料金カテゴリー */}
				<div className="space-y-8 mb-12">
					{pricingCategories.map((category) => {
						const IconComponent = category.icon;
						return (
							<Card key={category.id} className="overflow-hidden">
								<CardHeader className={`${category.bgColor} border-b`}>
									<CardTitle className="flex items-center gap-3 text-xl">
										<IconComponent
											className={`w-6 h-6 ${category.iconColor}`}
										/>
										{category.title}
									</CardTitle>
								</CardHeader>
								<CardContent className="p-0">
									<div className="overflow-x-auto">
										<div className="min-w-[600px]">
											{/* ヘッダー */}
											<div className="grid grid-cols-4 gap-4 p-4 bg-muted/30 border-b font-bold">
												<div>サービス</div>
												<div className="text-center">内容</div>
												<div className="text-center text-muted-foreground">
													通常価格
												</div>
												<div className="text-center text-primary">特別価格</div>
											</div>

											{/* 価格データ */}
											{category.items.map((item, index) => (
												<div
													key={index}
													className={`grid grid-cols-4 gap-4 p-4 border-b last:border-b-0 items-center ${
														item.highlight
															? "bg-primary/5 border-primary/20"
															: ""
													}`}
												>
													<div>
														{item.service && (
															<h4 className="font-semibold">{item.service}</h4>
														)}
														{item.highlight && (
															<div className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded mt-1 inline-block">
																人気
															</div>
														)}
													</div>
													<div className="text-center text-sm text-muted-foreground">
														{item.content}
													</div>
													<div className="text-center">
														<span className="text-lg line-through text-muted-foreground">
															{item.normalPrice}
														</span>
													</div>
													<div className="text-center">
														<span className="text-xl font-bold text-primary">
															{item.specialPrice}
														</span>
													</div>
												</div>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* 保証・特典 */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{guarantees.map((guarantee) => {
						const IconComponent = guarantee.icon;
						return (
							<Card key={guarantee.title} className="text-center">
								<CardHeader className="pb-4">
									<div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
										<IconComponent className="w-8 h-8 text-primary" />
									</div>
									<CardTitle className="text-lg">{guarantee.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">
										{guarantee.description}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* 価格の説明 */}
				<div className="text-center mt-12">
					<div className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full">
						<p className="text-lg font-bold">
							AI活用により実現した驚きの価格設定
							<br />
							高品質なのに、これまでの常識を覆す低価格でご提供
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}
