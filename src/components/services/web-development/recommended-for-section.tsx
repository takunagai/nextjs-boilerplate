import { FaCheck } from "react-icons/fa6";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const recommendations = [
	"見積もりを取ったら予算オーバーで諦めかけていた",
	"AI を活用した最新のウェブサイトを作りたい",
	"早く作りたいけど、品質は妥協したくない",
	"大手に頼むほどの予算はないけど、プロの仕事がほしい",
	"コスパ重視だけど、安かろう悪かろうは嫌",
];

export function RecommendedForSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-6">
						こんな方におすすめ
					</Heading>
				</div>

				<div className="max-w-3xl mx-auto space-y-6 mb-12">
					{recommendations.map((recommendation, index) => (
						<div
							key={index}
							className="flex items-start gap-4 p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
								<FaCheck className="w-4 h-4 text-primary" />
							</div>
							<p className="text-foreground flex-1 text-lg">{recommendation}</p>
						</div>
					))}
				</div>

				<div className="text-center">
					<Heading as="h3" align="center" className="text-xl md:text-2xl">
						一つでも当てはまったら、
						<span className="text-primary font-bold">
							ぜひお気軽にご相談ください！
						</span>
					</Heading>
				</div>
			</Container>
		</section>
	);
}
