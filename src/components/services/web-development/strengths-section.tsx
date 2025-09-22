import { Container } from "@/components/ui/container";
import {
	FaPalette,
	FaCode,
	FaUsers,
	FaRocket,
	FaHandshake,
} from "react-icons/fa6";

const strengths = [
	{
		icon: FaHandshake,
		title: "ワンストップ対応",
		description:
			"デザインもコーディングも写真撮影も。全部まとめてお任せください。",
		details: ["デザイン制作", "プログラミング", "写真撮影", "文章作成"],
	},
	{
		icon: FaRocket,
		title: "15年の経験",
		description: "長年の経験があるから、お客様の「なんとなく」も形にできます。",
		details: ["企画・構成", "UI/UXデザイン", "問題解決力", "的確な提案"],
	},
	{
		icon: FaCode,
		title: "幅広い技術対応",
		description: "WordPressからNext.jsまで。最適な技術をご提案します。",
		details: ["WordPress", "React/Next.js", "データベース", "サーバー構築"],
	},
	{
		icon: FaPalette,
		title: "AIを正しく活用",
		description: "AIの良さを引き出しながら、人の目でしっかり仕上げます。",
		details: [
			"AIへの的確な指示",
			"出力の修正・改善",
			"品質チェック",
			"最終調整",
		],
	},
	{
		icon: FaUsers,
		title: "柔軟な対応",
		description:
			"個人だから小回りが利きます。お客様のペースに合わせて進められます。",
		details: [
			"スケジュール調整",
			"予算相談",
			"部分的な対応",
			"アフターサポート",
		],
	},
];

export function StrengthsSection() {
	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<Container width="xl">
				<div className="text-center mb-12 md:mb-16">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">私たちの強み</h2>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						AIと経験を組み合わせて、あなたに最適なサービスを
					</p>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
					{strengths.slice(0, 3).map((strength, index) => {
						const Icon = strength.icon;
						return (
							<div
								key={index}
								className="bg-background rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
							>
								<div className="mb-4">
									<div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
										<Icon className="w-7 h-7 text-primary" />
									</div>
								</div>
								<h3 className="text-xl font-semibold mb-3">{strength.title}</h3>
								<p className="text-muted-foreground mb-4">
									{strength.description}
								</p>
								<ul className="space-y-2">
									{strength.details.map((detail, idx) => (
										<li
											key={idx}
											className="text-sm text-muted-foreground flex items-start"
										>
											<span className="text-primary mr-2">•</span>
											{detail}
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>

				<div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8 max-w-4xl mx-auto">
					{strengths.slice(3).map((strength, index) => {
						const Icon = strength.icon;
						return (
							<div
								key={index}
								className="bg-background rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
							>
								<div className="mb-4">
									<div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center">
										<Icon className="w-7 h-7 text-primary" />
									</div>
								</div>
								<h3 className="text-xl font-semibold mb-3">{strength.title}</h3>
								<p className="text-muted-foreground mb-4">
									{strength.description}
								</p>
								<ul className="space-y-2">
									{strength.details.map((detail, idx) => (
										<li
											key={idx}
											className="text-sm text-muted-foreground flex items-start"
										>
											<span className="text-primary mr-2">•</span>
											{detail}
										</li>
									))}
								</ul>
							</div>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
