import { FaImage, FaMusic, FaVideo } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

interface PricingExample {
	service: string;
	description: string;
	priceRange: string;
}

const pricingExamples: PricingExample[] = [
	{
		service: "ロゴデザイン",
		description: "AI生成 + 手作業仕上げ、3案提案、修正対応込み",
		priceRange: "30,000円～",
	},
	{
		service: "バナー・チラシデザイン",
		description: "用途に合わせたデザイン、サイズ展開対応",
		priceRange: "15,000円～",
	},
	{
		service: "イラスト・画像生成",
		description: "Midjourney・DALL-E活用、商用利用可能品質",
		priceRange: "8,000円～",
	},
	{
		service: "写真補正・加工",
		description: "背景除去、色調補正、レタッチ作業",
		priceRange: "5,000円～",
	},
	{
		service: "SNS用画像セット",
		description: "投稿用画像10枚、統一感のあるデザイン",
		priceRange: "25,000円～",
	},
	{
		service: "動画編集・制作",
		description: "ショート動画、プロモーション動画等",
		priceRange: "20,000円～",
	},
];

export function CreativePricingSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-6">
						料金例
					</Heading>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						以下は参考価格です。作業によって料金は変わりますので、まずはお気軽にご相談ください
					</p>
				</div>

				{/* 料金例グリッド */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
					{pricingExamples.map((example, index) => (
						<Card
							key={index}
							className="h-full hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
						>
							<CardHeader className="pb-4">
								<CardTitle className="text-xl text-gray-900 dark:text-gray-100">
									{example.service}
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<p className="text-sm text-muted-foreground leading-relaxed">
									{example.description}
								</p>
								<div className="pt-2 border-t border-gray-200 dark:border-gray-700">
									<span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent">
										{example.priceRange}
									</span>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* 注意事項・CTA */}
				<div className="space-y-8">
					{/* 料金についての説明 */}
					<div className="bg-violet-50 dark:bg-violet-950/30 rounded-2xl p-8 border border-violet-200 dark:border-violet-800">
						<div className="text-center space-y-4">
							<h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
								💡 料金について
							</h3>
							<div className="space-y-3 text-muted-foreground max-w-3xl mx-auto">
								<p className="leading-relaxed">
									上記は基本的な作業の参考価格です。
									プロジェクトの規模、複雑さ、納期などにより料金は変動します。
								</p>
								<p className="leading-relaxed">
									AIを活用することで従来より大幅にコストダウンしていますが、
									品質には一切妥協しません。
								</p>
								<p className="leading-relaxed font-medium text-primary">
									詳しい見積もりは無料で承りますので、まずはお気軽にご相談ください。
								</p>
							</div>
						</div>
					</div>

					{/* CTA */}
					<div className="text-center">
						<a
							href="/contact"
							className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium text-lg rounded-lg hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
						>
							無料見積もりを依頼する
						</a>
						<p className="mt-4 text-sm text-muted-foreground">
							お見積もりは無料です。お気軽にお問い合わせください
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}
