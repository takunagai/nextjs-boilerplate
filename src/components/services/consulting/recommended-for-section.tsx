import { FaCheck } from "react-icons/fa6";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const recommendations = [
	"AI 初心者だけど、乗り遅れたくない経営者・個人事業主",
	"ChatGPT は使ってるけど、もっと活用したい方",
	"社内に AI を導入したいけど、何から始めたらいいか分からない方",
	"AI でコンテンツ制作を効率化したいクリエイター",
	"最新の AI 情報をキャッチアップしたい方",
];

export function ConsultingRecommendedForSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-background">
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
							className="flex items-start gap-4 p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow border border-blue-100"
						>
							<div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
								<FaCheck className="w-4 h-4 text-blue-600" />
							</div>
							<p className="text-foreground flex-1 text-lg">{recommendation}</p>
						</div>
					))}
				</div>

				<div className="text-center">
					<Heading as="h3" align="center" className="text-xl md:text-2xl">
						あなたのペースで、
						<span className="text-blue-600 font-bold">
							AI を味方にしませんか？
						</span>
					</Heading>
				</div>
			</Container>
		</section>
	);
}
