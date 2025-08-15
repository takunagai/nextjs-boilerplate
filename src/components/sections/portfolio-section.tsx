import Link from "next/link";
import { FaArrowRight, FaQuoteLeft } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const portfolioItems = [
	{
		id: "case-a",
		client: "A社様",
		project: "コーポレートサイト",
		description: "WordPress + AI 記事生成システム導入",
		testimonial: "更新が楽になって、アクセス数も 2倍に！",
		image: "/dummy-images/portfolio-01.jpg",
	},
	{
		id: "case-b",
		client: "B店様",
		project: "EC サイトリニューアル",
		description: "商品説明を AI で一括生成",
		testimonial: "作業時間 80% 削減できました",
		image: "/dummy-images/portfolio-02.jpg",
	},
	{
		id: "case-c",
		client: "C社様",
		project: "AI チャットボット開発",
		description: "Next.js + ChatGPT API",
		testimonial: "お問い合わせ対応が自動化できた",
		image: "/dummy-images/portfolio-03.jpg",
	},
];

export function PortfolioSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-background">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						実績ピックアップ
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						AI を活用したプロジェクトで、お客様の課題を解決してきました
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
					{portfolioItems.map((item) => (
						<Card key={item.id} className="h-full">
							<CardHeader>
								<div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
									<img
										src={item.image}
										alt={`${item.client} ${item.project}`}
										className="w-full h-full object-cover"
									/>
								</div>
								<CardTitle className="text-lg">
									{item.client} {item.project}
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-sm text-muted-foreground">
									{item.description}
								</p>
								<div className="flex items-start gap-2">
									<FaQuoteLeft className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
									<p className="text-sm font-medium italic">
										{item.testimonial}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center">
					<Button asChild variant="outline" size="lg">
						<Link href="/portfolio">
							もっと見る
							<FaArrowRight className="w-4 h-4 ml-2" />
						</Link>
					</Button>
				</div>
			</Container>
		</section>
	);
}
