import { FaQuoteLeft } from "react-icons/fa6";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";

const testimonials = [
	{
		quote:
			"最初はChatGPTの使い方すらわからない状態でしたが、スポット相談で具体的な活用方法を教えていただき、今では記事作成やメール返信などの業務が大幅に効率化されました。特にプロンプトのコツを教えてもらったことで、思い通りの回答を得られるようになり、AI への苦手意識が完全になくなりました。",
		author: "T.S様",
		age: 42,
		occupation: "マーケティング会社経営",
	},
	{
		quote:
			"定期コンサルティングを受けて3ヶ月、作業時間が本当に半分以下になりました。AIライティングのテクニックを身につけたことで、ブログ記事の執筆時間が大幅に短縮され、その分クリエイティブな仕事に集中できるようになりました。投資対効果は想像以上です。",
		author: "K.M様",
		age: 35,
		occupation: "フリーランスライター",
	},
	{
		quote:
			"画像生成AIのレクチャーを受けて、デザイン制作の可能性が一気に広がりました。今まで外注していた簡単なデザイン作業を自分でできるようになり、新しいビジネスアイデアも次々と浮かんでいます。AIとの壁打ちで、今までになかった発想が生まれるのが楽しくて仕方ありません。",
		author: "R.H様",
		age: 29,
		occupation: "Web制作者",
	},
	{
		quote:
			"会社全体でのAI導入を相談させていただきました。段階的な導入計画から社内ガイドライン作成まで丁寧にサポートしていただき、今ではチーム全員がAIツールを使いこなしています。業務効率化だけでなく、従業員のモチベーション向上にもつながりました。",
		author: "A.Y様",
		age: 48,
		occupation: "IT企業部長",
	},
];

export function ConsultingTransformationSection() {
	return (
		<section className="w-full py-16 md:py-24 bg-muted/30">
			<Container width="2xl" paddingY="lg" paddingX="lg">
				<div className="text-center mb-12">
					<Heading as="h2" align="center" className="mb-4">
						受講者様の声
					</Heading>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						実際にサービスをご利用いただいた方々からの嬉しいお声をご紹介
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
					{testimonials.map((testimonial, index) => (
						<Card
							key={index}
							className="bg-background border-2 border-blue-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
						>
							<CardContent className="p-6">
								<div className="flex items-start gap-4 mb-4">
									<div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
										<FaQuoteLeft className="w-5 h-5 text-blue-600" />
									</div>
									<div className="flex-1">
										<p className="text-sm text-foreground leading-relaxed mb-4">
											{testimonial.quote}
										</p>
										<div className="flex items-center justify-between">
											<div>
												<p className="font-semibold text-foreground">
													{testimonial.author}
												</p>
												<p className="text-xs text-muted-foreground">
													{testimonial.age}歳・{testimonial.occupation}
												</p>
											</div>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="text-center mt-12">
					<Heading as="h3" className="text-xl md:text-2xl">
						あなたも同じような変化を
						<span className="text-blue-600 font-bold">
							実感してみませんか？
						</span>
					</Heading>
				</div>
			</Container>
		</section>
	);
}
