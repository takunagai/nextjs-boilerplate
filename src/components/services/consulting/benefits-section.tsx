import { FaDiscord, FaEnvelope, FaFile, FaList } from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const benefits = [
	{
		id: "prompts",
		title: "オリジナルプロンプト集（100個以上）",
		description: "実際に使える実践的なプロンプトを厳選",
		icon: FaFile,
		iconColor: "text-blue-600",
		bgColor: "bg-blue-50",
	},
	{
		id: "tools",
		title: "おすすめ AI ツールリスト（随時更新）",
		description: "最新のツール情報を定期的にアップデート",
		icon: FaList,
		iconColor: "text-green-600",
		bgColor: "bg-green-50",
	},
	{
		id: "community",
		title: "受講者限定 Discord コミュニティへご招待",
		description: "仲間と情報交換、質問し放題",
		icon: FaDiscord,
		iconColor: "text-purple-600",
		bgColor: "bg-purple-50",
	},
	{
		id: "newsletter",
		title: "AI 最新情報メールマガジン（月 2回）",
		description: "トレンドや新機能をいち早くキャッチ",
		icon: FaEnvelope,
		iconColor: "text-orange-600",
		bgColor: "bg-orange-50",
	},
];

export function ConsultingBenefitsSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						受講特典
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						学習をサポートし、継続的な成長を後押しする特典をご用意
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{benefits.map((benefit) => {
						const IconComponent = benefit.icon;
						return (
							<Card
								key={benefit.id}
								className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
							>
								<CardHeader className="pb-4">
									<div className="flex items-center gap-4 mb-2">
										<div
											className={`w-12 h-12 ${benefit.bgColor} rounded-lg flex items-center justify-center`}
										>
											<IconComponent
												className={`w-6 h-6 ${benefit.iconColor}`}
											/>
										</div>
									</div>
									<CardTitle className="text-lg leading-tight">
										<span className="bg-gradient-to-r from-primary to-green-600 bg-clip-text text-transparent font-bold">
											特典{benefits.indexOf(benefit) + 1}：
										</span>
										{benefit.title}
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">{benefit.description}</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				<div className="text-center mt-12">
					<div className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-full text-lg font-bold">
						これらの特典で学習効果を最大化！
					</div>
				</div>
			</Container>
		</section>
	);
}
