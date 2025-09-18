import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Quote } from "lucide-react";

const testimonials = [
	{
		id: "cafe",
		business: "小規模カフェ",
		location: "大阪・豊中",
		comment: "翌日からGoogle広告を回して予約が入り、週末の空席が埋まりました。",
		result: "週末予約率 +40%",
	},
	{
		id: "tax",
		business: "税理士事務所",
		location: "吹田",
		comment: "「よくある質問」を整理しただけで問い合わせの質が上がり、初回面談の歩留まりが改善。",
		result: "面談成約率 +25%",
	},
	{
		id: "event",
		business: "イベント主催企業",
		location: "全国配信",
		comment: "申込LPを1日で公開。SNS広告を即回せて、募集初日に100件超のCV。",
		result: "初日CV 100件超",
	},
];

export function TestimonialsSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeader
					title="実績・お客様の声"
					description="一夜城で成果を出されたお客様の事例"
				/>

				<div className="mt-12 grid gap-6 md:grid-cols-3">
					{testimonials.map((testimonial) => (
						<Card key={testimonial.id} className="relative overflow-hidden">
							<div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-primary/70" />
							<CardContent className="pt-6">
								<Quote className="mb-4 h-8 w-8 text-primary/20" />
								<div className="mb-4">
									<p className="font-semibold">{testimonial.business}</p>
									<p className="text-sm text-muted-foreground">{testimonial.location}</p>
								</div>
								<p className="mb-4 text-muted-foreground">
									{testimonial.comment}
								</p>
								<div className="rounded-lg bg-primary/5 px-3 py-2">
									<p className="text-sm font-semibold text-primary">
										{testimonial.result}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				<div className="mt-8 rounded-lg bg-muted/50 p-4 text-center">
					<p className="text-sm text-muted-foreground">
						※上記は実際のお客様の声をもとに作成した事例です。効果には個人差があります。
					</p>
				</div>
			</Container>
		</section>
	);
}