import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const faqs = [
	{
		question: "どんな小さな修正でも対応してもらえますか？",
		answer:
			"はい、どんなに小さな修正でも喜んで対応いたします。テキストの修正1文字から、ボタンの色変更1箇所まで、お気軽にご相談ください。",
	},
	{
		question: "緊急時の対応時間はどのくらいですか？",
		answer:
			"緊急度にもよりますが、サイトが完全にダウンしている場合は1時間以内、その他のトラブルは24時間以内に初期対応を開始いたします。",
	},
	{
		question: "料金はどのように決まりますか？",
		answer:
			"作業時間と難易度に基づいて算出いたします。事前に無料見積もりを提示し、ご承認をいただいてから作業を開始するため、追加料金が発生することはありません。",
	},
	{
		question: "WordPressサイト以外も対応できますか？",
		answer:
			"はい、HTML/CSS、JavaScript、PHP、各種CMSなど、幅広い技術に対応しています。まずはお気軽にご相談ください。",
	},
	{
		question: "作業後のサポートはありますか？",
		answer:
			"作業完了から1週間は無償でアフターサポートを提供いたします。また、定期メンテナンスのご相談も承っています。",
	},
];

export function WebSpotSupportFAQSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeader
					title="よくある質問"
					description="スポット対応サービスに関するご質問"
				/>

				<div className="max-w-4xl mx-auto">
					<Accordion type="single" collapsible className="space-y-4">
						{faqs.map((faq, index) => (
							<AccordionItem
								key={index}
								value={`item-${index}`}
								className="bg-card border rounded-lg px-6"
							>
								<AccordionTrigger className="text-left hover:no-underline py-6">
									<span className="font-semibold">{faq.question}</span>
								</AccordionTrigger>
								<AccordionContent className="pb-6">
									<p className="text-muted-foreground leading-relaxed">
										{faq.answer}
									</p>
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>

				<div className="text-center mt-12">
					<p className="text-muted-foreground mb-4">
						お困りごとがございましたら、まずはお気軽にご相談ください
					</p>
					<Link href="/contact?service=web-spot-support">
						<Button size="lg">今すぐ相談する</Button>
					</Link>
				</div>
			</Container>
		</section>
	);
}
