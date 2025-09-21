import { FaArrowsRotate, FaPlus, FaReact, FaWordpress } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const serviceMenuItems = [
	{
		id: "nextjs-app",
		title: "Webアプリ開発",
		subtitle: "AIで開発スピードアップ。納期も早く、料金もお得に",
		features: [
			"ChatGPTなどのAIと連携するアプリ",
			"サクサク動くモダンなWebアプリ",
			"制作期間は通常の約半分",
		],
		icon: FaReact,
		iconColor: "text-blue-600",
		bgColor: "bg-blue-50",
		borderColor: "border-blue-200",
	},
	{
		id: "wordpress-ai",
		title: "WordPressサイト制作",
		subtitle: "ブログやお知らせを更新しやすいサイトづくり",
		features: [
			"SEOに強いサイト構成",
			"AIがコンテンツ作成をお手伝い",
			"更新も簡単、管理も楽々",
		],
		icon: FaWordpress,
		iconColor: "text-indigo-600",
		bgColor: "bg-indigo-50",
		borderColor: "border-indigo-200",
	},
	{
		id: "renewal",
		title: "サイトリニューアル",
		subtitle: "今のサイトをもっと良くしたい方へ",
		features: [
			"現状の課題を一緒に整理",
			"必要な部分だけ改善でコスト削減",
			"スマホ対応や速度改善も",
		],
		icon: FaArrowsRotate,
		iconColor: "text-green-600",
		bgColor: "bg-green-50",
		borderColor: "border-green-200",
	},
	{
		id: "additional",
		title: "ページ・機能追加",
		subtitle: "「ここだけ」のご相談も大歓迎",
		features: [
			"ランディングページ作成",
			"お問い合わせフォーム追加",
			"1ページ2万円〜のお手軽価格",
		],
		icon: FaPlus,
		iconColor: "text-orange-600",
		bgColor: "bg-orange-50",
		borderColor: "border-orange-200",
	},
];

export function ServiceMenuSection() {
	return (
		<section id="service-menu" className="w-full py-16 md:py-24 bg-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						こんなことができます
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						ウェブサイトのことなら、何でもご相談ください
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{serviceMenuItems.map((service) => {
						const IconComponent = service.icon;
						return (
							<Card
								key={service.id}
								className={`h-full border-2 ${service.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
							>
								<CardHeader className="pb-4">
									<div className="flex items-center gap-4 mb-4">
										<div
											className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center`}
										>
											<IconComponent
												className={`w-6 h-6 ${service.iconColor}`}
											/>
										</div>
										<div className="flex-1">
											<CardTitle className="text-lg leading-tight">
												{service.title}
											</CardTitle>
										</div>
									</div>
									<p className="text-sm font-bold text-primary">
										{service.subtitle}
									</p>
								</CardHeader>
								<CardContent className="space-y-4">
									<ul className="space-y-3">
										{service.features.map((feature) => (
											<li
												key={feature}
												className="text-sm text-muted-foreground flex items-start gap-2"
											>
												<span className="text-primary text-xs mt-1">•</span>
												{feature}
											</li>
										))}
									</ul>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
