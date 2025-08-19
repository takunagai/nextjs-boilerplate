import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { AnimatedItemList } from "@/components/ui/animated-item-list";

// 二次元配列の例（フリップアニメーション用）
const problems = [
	[
		"ウェブサイトを作りたいけど予算が...",
		"SNS 投稿を続けたいけど、時間がない",
		"AI を使ってみたいけど、やり方が分からない",
		"外注したいけど、高すぎる",
		"自分でやりたいけど、スキルがない",
	],
	[
		"新しい商品の宣伝がうまくいかない",
		"顧客とのコミュニケーションが難しい",
		"競合他社に差をつけられない",
		"マーケティングの知識が不足している",
		"効果的な広告が作れない",
	],
	[
		"業務効率化したいけど方法が分からない",
		"データ分析が苦手で判断に困る",
		"新しいツールの導入が難しい",
		"デジタル化についていけない",
	],
];

type Problem = string;
type ProblemSet = Problem[];
type ProblemData = Problem[] | ProblemSet[];

interface ProblemsSectionProps {
	problems?: ProblemData;
	intervalSeconds?: number;
}

export function ProblemsSection({ 
	problems: externalProblems = problems, 
	intervalSeconds = 5 
}: ProblemsSectionProps = {}) {
	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-6">
						こんなお悩み、ありませんか？
					</Heading>
				</div>

				<AnimatedItemList 
					items={externalProblems}
					intervalSeconds={intervalSeconds}
					className="max-w-2xl mx-auto space-y-4 mb-12"
				/>

				<div className="text-center">
					<Heading as="h3" align="center" className="text-xl md:text-2xl">
						そのお悩み、
						<span className="text-primary font-bold">AI と一緒に</span>
						解決しませんか？
					</Heading>
				</div>
			</Container>
		</section>
	);
}