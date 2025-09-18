import { Brain, Code, Layers, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { SimpleIconGrid } from "@/components/ui/simple-icon-grid";

const reasons = [
	{
		icon: <Brain className="h-5 w-5" />,
		title: "AI活用",
		description: "ライティング下地、画像生成、構成案、パーツ自動化で時間短縮",
	},
	{
		icon: <Layers className="h-5 w-5" />,
		title: "再利用設計",
		description: "実績から磨いたセクション群（Hero/Problem/Solution/Offer/CTA等）",
	},
	{
		icon: <Code className="h-5 w-5" />,
		title: "無料サービスの賢い活用",
		description: "Cloudflare Pages、Googleフォーム等でランニングコスト削減",
	},
	{
		icon: <Zap className="h-5 w-5" />,
		title: "集中スプリント",
		description: "事前ヒアリング→同日制作→即公開のフロー最適化",
	},
];

export function WhyAffordableSection() {
	return (
		<section className="bg-muted/30 py-16 md:py-24">
			<Container>
				<SectionHeader
					title="どうして5.5万円で「ちゃんと良い」が可能？"
					description="効率化と品質の両立を実現する4つの理由"
				/>

				<div className="mt-12">
					<SimpleIconGrid items={reasons} />
				</div>

				<div className="mt-12 rounded-lg border border-primary/20 bg-primary/5 p-6">
					<p className="text-center text-lg font-medium">
						15年の制作経験 × 最新のAI技術 = 
						<span className="text-primary"> 高品質なのにお手頃価格</span>
					</p>
				</div>
			</Container>
		</section>
	);
}