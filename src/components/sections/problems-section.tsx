import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { FaCheck } from "react-icons/fa6";

const problems = [
	"ウェブサイトを作りたいけど予算が...",
	"SNS 投稿を続けたいけど、時間がない",
	"AI を使ってみたいけど、やり方が分からない",
	"外注したいけど、高すぎる",
	"自分でやりたいけど、スキルがない",
];

export function ProblemsSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-6">
						こんなお悩み、ありませんか？
					</Heading>
				</div>

				<div className="max-w-2xl mx-auto space-y-4 mb-12">
					{problems.map((problem, index) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: 配列は定数なので内容変更がない
							key={index}
							className="flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow"
						>
							<div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
								<FaCheck className="w-3 h-3 text-primary" />
							</div>
							<p className="text-muted-foreground flex-1">{problem}</p>
						</div>
					))}
				</div>

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
