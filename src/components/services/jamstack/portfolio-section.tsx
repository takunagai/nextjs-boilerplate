import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import {
	FaArrowUpRightFromSquare,
	FaRocket,
	FaMagnifyingGlass,
	FaMobile,
} from "react-icons/fa6";
import Link from "next/link";

const portfolioItems = [
	{
		title: "製造業コーポレートサイト",
		description: "大手製造業のコーポレートサイトをJamstackで完全リニューアル",
		image: "/dummy-images/portfolio-corporate-01.jpg",
		metrics: {
			performance: "98点",
			seo: "95点",
			loadTime: "1.2秒",
		},
		technologies: ["Next.js", "TypeScript", "Contentful", "Vercel"],
		url: "#",
		category: "企業サイト",
	},
	{
		title: "デザイン事務所ポートフォリオ",
		description:
			"クリエイティブなアニメーション×高速表示を両立したポートフォリオサイト",
		image: "/dummy-images/portfolio-creative-01.jpg",
		metrics: {
			performance: "96点",
			seo: "92点",
			loadTime: "1.5秒",
		},
		technologies: ["Next.js", "Framer Motion", "Sanity", "Netlify"],
		url: "#",
		category: "ポートフォリオ",
	},
	{
		title: "スタートアップLP",
		description:
			"新サービスのランディングページ。SEO最適化で検索流入200%アップ",
		image: "/dummy-images/portfolio-startup-01.jpg",
		metrics: {
			performance: "99点",
			seo: "97点",
			loadTime: "0.9秒",
		},
		technologies: ["Next.js", "TypeScript", "Strapi", "Cloudflare"],
		url: "#",
		category: "ランディングページ",
	},
];

export function JamstackPortfolioSection() {
	return (
		<section className="py-16 md:py-24 bg-muted/30" id="portfolio">
			<Container>
				<SectionHeader
					title="制作事例"
					description="Jamstackで実現した高品質サイトの実績"
				/>

				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
					{portfolioItems.map((item, index) => (
						<div
							key={index}
							className="group bg-background border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
						>
							{/* 画像 */}
							<div className="relative aspect-video overflow-hidden">
								<img
									src={item.image}
									alt={item.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
								/>
								<div className="absolute top-3 left-3">
									<span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
										{item.category}
									</span>
								</div>
							</div>

							{/* コンテンツ */}
							<div className="p-6 space-y-4">
								<div>
									<h3 className="font-bold text-lg mb-2">{item.title}</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{item.description}
									</p>
								</div>

								{/* メトリクス */}
								<div className="grid grid-cols-3 gap-4 p-3 bg-muted/50 rounded-lg">
									<div className="text-center">
										<div className="flex items-center justify-center mb-1">
											<FaRocket className="w-3 h-3 text-green-600 mr-1" />
											<span className="text-xs text-muted-foreground">
												速度
											</span>
										</div>
										<span className="font-bold text-sm">
											{item.metrics.performance}
										</span>
									</div>
									<div className="text-center">
										<div className="flex items-center justify-center mb-1">
											<FaMagnifyingGlass className="w-3 h-3 text-blue-600 mr-1" />
											<span className="text-xs text-muted-foreground">SEO</span>
										</div>
										<span className="font-bold text-sm">
											{item.metrics.seo}
										</span>
									</div>
									<div className="text-center">
										<div className="flex items-center justify-center mb-1">
											<FaMobile className="w-3 h-3 text-purple-600 mr-1" />
											<span className="text-xs text-muted-foreground">
												読込
											</span>
										</div>
										<span className="font-bold text-sm">
											{item.metrics.loadTime}
										</span>
									</div>
								</div>

								{/* 技術スタック */}
								<div>
									<h4 className="text-xs font-semibold text-muted-foreground mb-2">
										使用技術:
									</h4>
									<div className="flex flex-wrap gap-1">
										{item.technologies.map((tech, techIndex) => (
											<span
												key={techIndex}
												className="text-xs bg-green-600/10 text-green-700 px-2 py-1 rounded"
											>
												{tech}
											</span>
										))}
									</div>
								</div>

								{/* ボタン */}
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
