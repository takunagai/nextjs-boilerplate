import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import Link from "next/link";

const portfolioItems = [
	{
		title: "企業コーポレートサイト",
		description: "日本最大級製造業のコーポレートサイトをWordPressで構築",
		image: "/dummy-images/portfolio-corporate-wp-01.jpg",
		features: ["カスタムテーマ", "多言語対応", "IR情報管理"],
		url: "#",
		category: "企業サイト"
	},
	{
		title: "オウンドメディア",
		description: "IT企業のオウンドメディア。月間100万PVを達成",
		image: "/dummy-images/portfolio-media-wp-01.jpg",
		features: ["高速化対策", "SEO最適化", "アナリティクス連携"],
		url: "#",
		category: "メディア"
	},
	{
		title: "ECサイト",
		description: "ハンドメイド雑貨のECサイト。WooCommerceで本格運用",
		image: "/dummy-images/portfolio-ecommerce-wp-01.jpg",
		features: ["WooCommerce", "在庫管理", "会員システム"],
		url: "#",
		category: "ECサイト"
	},
];

export function WordPressPortfolioSection() {
	return (
		<section className="py-16 md:py-24 bg-muted/30" id="portfolio">
			<Container>
				<SectionHeader
					title="制作事例"
					description="WordPressで実現した多様なサイトの実績"
				/>
				
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{portfolioItems.map((item, index) => (
						<div
							key={index}
							className="group bg-background border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
						>
							<div className="relative aspect-video overflow-hidden">
								<img
									src={item.image}
									alt={item.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
								<div className="absolute top-3 left-3">
									<span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
										{item.category}
									</span>
								</div>
							</div>

							<div className="p-6 space-y-4">
								<div>
									<h3 className="font-bold text-lg mb-2">{item.title}</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{item.description}
									</p>
								</div>

								<div>
									<h4 className="text-xs font-semibold text-muted-foreground mb-2">主要機能:</h4>
									<div className="flex flex-wrap gap-1">
										{item.features.map((feature, featureIndex) => (
											<span
												key={featureIndex}
												className="text-xs bg-blue-500/10 text-blue-700 px-2 py-1 rounded"
											>
												{feature}
											</span>
										))}
									</div>
								</div>

								<Link href={item.url} className="block">
									<Button variant="outline" size="sm" className="w-full">
										<FaArrowUpRightFromSquare className="w-3 h-3 mr-2" />
										詳細を見る
									</Button>
								</Link>
							</div>
						</div>
					))}
				</div>

				<div className="text-center mt-12">
					<Link href="/portfolio">
						<Button variant="outline" size="lg">
							すべての制作事例を見る
						</Button>
					</Link>
				</div>
			</Container>
		</section>
	);
}