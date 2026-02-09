import { FaBriefcase, FaCode, FaLightbulb } from "react-icons/fa6";
import {
	Timeline,
	TimelineContent,
	TimelineDate,
	TimelineIcon,
	TimelineItem,
	TimelineTitle,
} from "@/components/ui/timeline";

const timelineItems = [
	{
		variant: "primary" as const,
		icon: FaBriefcase,
		title: "印刷営業、グラフィックデザイナーの経験",
		date: "〜0000年",
		items: [
			"食品パッケージ(軟包材)の印刷営業を担当",
			"大手デザイン会社で有名通販カタログの制作を担当",
		],
	},
	{
		variant: "primary" as const,
		icon: FaBriefcase,
		title: "ウェブデザイナー兼 ECショップ運営の経験",
		date: "〜0000年",
		items: [
			"寝具の卸会社で ECショップの店長を担当",
			"ECサイトの立ち上げ、商品撮影、コピー作成、バックエンド業務などを経験",
			"繁盛期は月商700万円くらい",
		],
	},
	{
		variant: "primary" as const,
		icon: FaCode,
		title: "フリーランスのウェブデザイナー",
		date: "〜2009年",
		items: [
			"小中規模のウェブサイト(WordPressメイン)の制作を請負",
			"涼感寝具のECサイトを期間限定で運営",
			"React/Next.js を学び、Jamstack サイトを制作",
		],
	},
	{
		variant: "success" as const,
		icon: FaLightbulb,
		title: "AI の導入",
		date: "〜0000年",
		items: [
			"ChatGPT(gpt-3)の登場に衝撃を受け、AI関連情報を追い続ける",
			"様々なジャンルの AIツールを試用、効率的な使い方などを研究",
			"コーディングを始めとする様々な作業にAIエージェントを本格的に活用",
		],
	},
];

export function TimelineSection() {
	return (
		<section className="space-y-8">
			<div className="border-l-4 border-primary pl-6">
				<h2 className="text-3xl font-bold text-foreground mb-8">経歴</h2>
			</div>

			<Timeline className="ml-6">
				{timelineItems.map((item) => (
					<TimelineItem key={item.title} variant={item.variant}>
						<TimelineIcon variant={item.variant}>
							<item.icon className="h-4 w-4" />
						</TimelineIcon>
						<TimelineContent variant="card">
							<div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
								<TimelineTitle>{item.title}</TimelineTitle>
								<TimelineDate>{item.date}</TimelineDate>
							</div>
							<div className="text-gray-700 dark:text-gray-300">
								<ul className="space-y-1">
									{item.items.map((text) => (
										<li key={text}>• {text}</li>
									))}
								</ul>
							</div>
						</TimelineContent>
					</TimelineItem>
				))}
			</Timeline>
		</section>
	);
}
