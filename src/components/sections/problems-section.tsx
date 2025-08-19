"use client";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

// 通常の配列の例
// const problems = [
// 	"ウェブサイトを作りたいけど予算が...",
// 	"SNS 投稿を続けたいけど、時間がない",
// 	"AI を使ってみたいけど、やり方が分からない",
// 	"外注したいけど、高すぎる",
// 	"自分でやりたいけど、スキルがない",
// ];

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

function isNestedArray(data: ProblemData): data is ProblemSet[] {
	return Array.isArray(data[0]);
}

export function ProblemsSection({ 
	problems: externalProblems = problems, 
	intervalSeconds = 5 
}: ProblemsSectionProps = {}) {
	const [currentSetIndex, setCurrentSetIndex] = useState(0);
	const [isFlipping, setIsFlipping] = useState(false);
	const [animationKey, setAnimationKey] = useState(0);

	const isAnimated = isNestedArray(externalProblems);
	const currentProblems = isAnimated
		? externalProblems[currentSetIndex]
		: externalProblems;

	useEffect(() => {
		if (!isAnimated || externalProblems.length <= 1) return;

		const interval = setInterval(() => {
			setIsFlipping(true);
			setAnimationKey(prev => prev + 1);

			// フリップアニメーション完了後にデータ更新
			setTimeout(() => {
				setCurrentSetIndex(prev => 
					prev >= externalProblems.length - 1 ? 0 : prev + 1
				);
				setIsFlipping(false);
			}, 600); // フリップアニメーション時間（0.6s）
		}, intervalSeconds * 1000);

		return () => clearInterval(interval);
	}, [isAnimated, externalProblems.length, intervalSeconds]);

	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-6">
						こんなお悩み、ありませんか？
					</Heading>
				</div>

				<div className="max-w-2xl mx-auto space-y-4 mb-12">
					{currentProblems.map((problem, index) => (
						<div
							key={isAnimated ? `${animationKey}-${index}` : index}
							className={`flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow ${
								isAnimated ? 'flip-item' : ''
							}`}
							style={isAnimated ? {
								'--delay': `${index * 0.1}s`,
								animation: isFlipping ? 'flipVertical 0.6s ease-in-out' : 'none'
							} as React.CSSProperties : undefined}
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

			{/* CSS-in-JS アニメーションスタイル */}
			{isAnimated && (
				<style>{`
					@keyframes flipVertical {
						0% {
							transform: rotateX(0deg);
							opacity: 1;
						}
						50% {
							transform: rotateX(90deg);
							opacity: 0;
						}
						100% {
							transform: rotateX(0deg);
							opacity: 1;
						}
					}
					
					.flip-item {
						animation-delay: var(--delay);
						transform-origin: center;
						backface-visibility: hidden;
					}
				`}</style>
			)}
		</section>
	);
}
