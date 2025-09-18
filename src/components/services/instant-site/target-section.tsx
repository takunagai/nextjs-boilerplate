import { CheckCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

const targetAudience = [
	{
		title: "スピード重視",
		description: "明日から集客を始めたい",
	},
	{
		title: "シンプル志向",
		description: "とりあえず1ページでLP型にまとめたい",
	},
	{
		title: "コスパ重視",
		description: "初期費用を抑えて品質は妥協したくない",
	},
	{
		title: "ランニングコスト削減",
		description: "ドメイン以外のランニングコストを極小化したい",
	},
];

export function TargetSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeader
					title="このサービスが「刺さる」人"
					description="一夜城は、こんな方々に最適なソリューションです"
				/>

				<div className="mt-12 grid gap-6 sm:grid-cols-2">
					{targetAudience.map((item) => (
						<div
							key={item.title}
							className="flex items-start gap-4 rounded-lg border border-primary/10 bg-primary/5 p-6"
						>
							<CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
							<div>
								<h3 className="font-semibold">{item.title}</h3>
								<p className="mt-1 text-muted-foreground">{item.description}</p>
							</div>
						</div>
					))}
				</div>

				<div className="mt-8 rounded-lg bg-muted/50 p-6 text-center">
					<p className="text-muted-foreground">
						<span className="font-semibold">対応地域：</span>
						北摂・北大阪エリアを中心に、全国対応
					</p>
				</div>
			</Container>
		</section>
	);
}