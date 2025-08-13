import {
	FaImages,
	FaMusic,
	FaPalette,
	FaPenToSquare,
	FaVideo,
} from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const recommendedUsers = [
	{
		id: "sns",
		title: "SNS投稿を効率化したい方",
		description: "SNS 投稿用の画像や文章を量産したい",
		icon: FaImages,
		iconColor: "text-primary",
		bgColor: "bg-muted/30",
		borderColor: "border-muted",
	},
	{
		id: "blog",
		title: "コンテンツ制作に悩む方",
		description: "ブログ記事を定期的に更新したいけど時間がない",
		icon: FaPenToSquare,
		iconColor: "text-primary",
		bgColor: "bg-muted/30",
		borderColor: "border-muted",
	},
	{
		id: "video",
		title: "動画制作を始めたい方",
		description: "動画コンテンツを始めたいけど、編集スキルがない",
		icon: FaVideo,
		iconColor: "text-primary",
		bgColor: "bg-muted/30",
		borderColor: "border-muted",
	},
	{
		id: "sound",
		title: "オリジナル音源が欲しい方",
		description: "オリジナル BGM や効果音がほしい",
		icon: FaMusic,
		iconColor: "text-primary",
		bgColor: "bg-muted/30",
		borderColor: "border-muted",
	},
	{
		id: "design",
		title: "手軽にデザインしたい方",
		description:
			"デザイナーに頼むほどじゃないけど、それなりのクオリティがほしい",
		icon: FaPalette,
		iconColor: "text-primary",
		bgColor: "bg-muted/30",
		borderColor: "border-muted",
	},
];

export function CreativeRecommendedForSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-6">
						こんな方におすすめ
					</Heading>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						クリエイティブな作業にお悩みの方、AIの力でその課題を解決しませんか？
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
					{recommendedUsers.map((user) => {
						const IconComponent = user.icon;
						return (
							<Card
								key={user.id}
								className={`h-full border-2 ${user.borderColor} hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
							>
								<CardHeader className="text-center pb-4">
									<div
										className={`w-16 h-16 ${user.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
									>
										<IconComponent className={`w-8 h-8 ${user.iconColor}`} />
									</div>
									<CardTitle className="text-lg leading-tight">
										{user.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground text-center">
										{user.description}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				<div className="text-center">
					<div className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full">
						<Heading
							as="h3"
							className="text-xl md:text-2xl font-bold text-primary-foreground"
						>
							どれか一つでも当てはまったら、
							<br />
							AIクリエイティブで解決できます！
						</Heading>
					</div>
				</div>
			</Container>
		</section>
	);
}
