import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { FaPhone, FaClipboardList, FaGears, FaCircleCheck } from "react-icons/fa6";

const processSteps = [
	{
		step: "01",
		icon: <FaPhone className="w-6 h-6 text-purple-600" />,
		title: "お問い合わせ",
		description: "お電話・メール・チャットでお気軽にご相談ください。緊急時は24時間以内にご連絡いたします。",
		duration: "即日"
	},
	{
		step: "02", 
		icon: <FaClipboardList className="w-6 h-6 text-blue-600" />,
		title: "無料見積もり",
		description: "現状確認・作業内容精査の上、明確な見積もりを提示。追加料金は一切発生しません。",
		duration: "1-2時間"
	},
	{
		step: "03",
		icon: <FaGears className="w-6 h-6 text-green-600" />,
		title: "修正作業",
		description: "経験豊富なエンジニアが迅速かつ丁寧に作業を実施。進捗は随時ご報告いたします。",
		duration: "内容による"
	},
	{
		step: "04",
		icon: <FaCircleCheck className="w-6 h-6 text-orange-600" />,
		title: "完了・サポート",
		description: "作業完了のご確認をいただき、必要に応じてアフターサポートもご提供いたします。",
		duration: "継続"
	},
];

export function WebSpotSupportProcessSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeader
					title="サポートの流れ"
					description="シンプルで分かりやすい4ステップ"
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{processSteps.map((step, index) => (
						<div
							key={index}
							className="text-center space-y-4"
						>
							<div className="flex items-center justify-center w-16 h-16 bg-purple-600/10 rounded-full mx-auto">
								{step.icon}
							</div>
							<span className="text-3xl font-bold text-purple-600">{step.step}</span>
							<h3 className="text-xl font-semibold">{step.title}</h3>
							<p className="text-muted-foreground leading-relaxed text-sm">
								{step.description}
							</p>
							<span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
								{step.duration}
							</span>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
}