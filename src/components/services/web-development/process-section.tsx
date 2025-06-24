import {
	FaComments,
	FaMagnifyingGlass,
	FaGears,
	FaCircleCheck,
	FaHandshake,
} from "react-icons/fa6";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const processSteps = [
	{
		id: "hearing",
		step: "1",
		title: "ヒアリング",
		duration: "（無料）",
		description: [
			"お悩みや要望をじっくりお聞きします",
			"AI を活用した効率的なプランをご提案",
		],
		icon: FaComments,
		iconColor: "text-blue-600",
		bgColor: "bg-blue-50",
	},
	{
		id: "research",
		step: "2",
		title: "AI リサーチ＆企画",
		duration: "（1〜2日）",
		highlight: "← 通常の 1/3 の期間！",
		description: [
			"AI が競合分析・市場調査",
			"最適なサイト構成を AI と一緒に設計",
		],
		icon: FaMagnifyingGlass,
		iconColor: "text-green-600",
		bgColor: "bg-green-50",
	},
	{
		id: "development",
		step: "3",
		title: "AI アシスト制作",
		duration: "（1〜3週間）",
		highlight: "← 通常の半分！",
		description: [
			"AI がデザイン案・コードを生成",
			"私が調整・ブラッシュアップ",
			"随時確認していただきながら進めます",
		],
		icon: FaGears,
		iconColor: "text-purple-600",
		bgColor: "bg-purple-50",
	},
	{
		id: "testing",
		step: "4",
		title: "テスト・納品",
		duration: "（2〜3日）",
		description: [
			"AI による自動テスト＋人の目でダブルチェック",
			"納品・公開作業",
		],
		icon: FaCircleCheck,
		iconColor: "text-orange-600",
		bgColor: "bg-orange-50",
	},
	{
		id: "support",
		step: "5",
		title: "アフターサポート",
		duration: "",
		description: ["操作説明", "軽微な修正対応（1ヶ月間無料）"],
		icon: FaHandshake,
		iconColor: "text-red-600",
		bgColor: "bg-red-50",
	},
];

export function ProcessSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						制作の流れ
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						AI を活用した効率的なプロセスで、短期間・高品質な制作を実現
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{processSteps.map((step, index) => {
						const IconComponent = step.icon;
						return (
							<Card
								key={step.id}
								className="h-full relative bg-background hover:shadow-lg transition-shadow"
							>
								{/* Step number badge */}
								<div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold z-10">
									{step.step}
								</div>

								<CardHeader className="text-center pb-4 pt-8">
									<div
										className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
									>
										<IconComponent className={`w-8 h-8 ${step.iconColor}`} />
									</div>
									<CardTitle className="text-lg">
										{step.title}
										{step.duration && (
											<span className="text-sm font-normal text-muted-foreground block">
												{step.duration}
											</span>
										)}
									</CardTitle>
									{step.highlight && (
										<p className="text-sm font-bold text-primary">
											{step.highlight}
										</p>
									)}
								</CardHeader>
								<CardContent>
									<ul className="space-y-2">
										{step.description.map((desc, descIndex) => (
											<li
												key={descIndex}
												className="text-sm text-muted-foreground flex items-start gap-2"
											>
												<span className="text-primary text-xs mt-1">•</span>
												{desc}
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
