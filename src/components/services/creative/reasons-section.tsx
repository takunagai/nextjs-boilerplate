import {
	FaTools,
	FaRobot,
	FaGraduationCap,
	FaHandshake,
	FaStar,
} from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const reasons = [
	{
		id: "design-skills",
		title: "高いデザインスキル",
		description: "Photoshop・Illustrator の熟練技術",
		detail:
			"Adobe Creative Suite を使いこなし、プロレベルの仕上げを実現。15年の制作経験が生み出す確かな品質をお約束します。",
		icon: FaTools,
		iconColor: "text-violet-600",
		bgColor: "bg-violet-100 dark:bg-violet-900/30",
		borderColor: "border-violet-200 dark:border-violet-800",
		number: "01",
	},
	{
		id: "ai-knowledge",
		title: "最新AI技術への精通",
		description: "日々情報をキャッチアップ",
		detail:
			"Midjourney、DALL-E、Stable Diffusion等の最新AI技術を常に追いかけ、最適なツールで最高の結果を生み出します。",
		icon: FaRobot,
		iconColor: "text-purple-600",
		bgColor: "bg-purple-100 dark:bg-purple-900/30",
		borderColor: "border-purple-200 dark:border-purple-800",
		number: "02",
	},
	{
		id: "teaching",
		title: "制作過程のレクチャー",
		description: "スキルアップも一緒に",
		detail:
			"単純な制作代行ではなく、制作過程を丁寧に説明。お客様のスキル向上もサポートし、将来の自立制作もお手伝いします。",
		icon: FaGraduationCap,
		iconColor: "text-pink-600",
		bgColor: "bg-pink-100 dark:bg-pink-900/30",
		borderColor: "border-pink-200 dark:border-pink-800",
		number: "03",
	},
	{
		id: "flexibility",
		title: "柔軟な対応力",
		description: "お客様のペースに合わせて",
		detail:
			"急な修正、仕様変更、追加要望にも臨機応変に対応。小さなプロジェクトから大型案件まで、規模を問わず承ります。",
		icon: FaHandshake,
		iconColor: "text-rose-600",
		bgColor: "bg-rose-100 dark:bg-rose-900/30",
		borderColor: "border-rose-200 dark:border-rose-800",
		number: "04",
	},
	{
		id: "perfectionism",
		title: "妥協のない品質追求",
		description: "細部にまでこだわり抜く",
		detail:
			"「なんとなく良い」ではなく「明確に優れている」レベルまで追求。お客様が自信を持って使える成果物をお届けします。",
		icon: FaStar,
		iconColor: "text-amber-600",
		bgColor: "bg-amber-100 dark:bg-amber-900/30",
		borderColor: "border-amber-200 dark:border-amber-800",
		number: "05",
	},
];

export function CreativeReasonsSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-6">
						選ばれる理由
					</Heading>
					<p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
						AI × 人の感性で実現する、これまでにないクリエイティブサービスの価値
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{reasons.map((reason) => {
						const IconComponent = reason.icon;
						return (
							<Card
								key={reason.id}
								className={`h-full border-2 ${reason.borderColor} hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative overflow-hidden`}
							>
								{/* 番号ラベル */}
								<div className="absolute top-4 right-4 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
									{reason.number}
								</div>

								<CardHeader className="pb-4">
									<div
										className={`w-16 h-16 ${reason.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
									>
										<IconComponent className={`w-8 h-8 ${reason.iconColor}`} />
									</div>
									<CardTitle className="text-xl text-center">
										{reason.title}
									</CardTitle>
									<p className="text-center font-semibold text-primary">
										{reason.description}
									</p>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground text-center leading-relaxed">
										{reason.detail}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* まとめ */}
				<div className="text-center mt-12">
					<div className="inline-block bg-primary text-primary-foreground px-8 py-6 rounded-2xl">
						<Heading
							as="h3"
							className="text-xl md:text-2xl font-bold text-primary-foreground mb-2"
						>
							これら5つの理由で、お客様に選ばれ続けています
						</Heading>
						<p className="text-lg opacity-90">
							AI と人の力を掛け合わせた、まったく新しいクリエイティブ体験を
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
}
