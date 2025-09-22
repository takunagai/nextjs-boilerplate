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
		question: "Jamstackとは何ですか？通常のWebサイトとの違いは？",
		answer: "Jamstack（JavaScript, APIs, Markup）は、静的サイトジェネレーターを使用したモダンなWeb開発手法です。従来のWordPressなどのCMSと比べて、表示速度が圧倒的に速く（3-5倍）、セキュリティリスクが大幅に減少し、運用コストも削減できます。"
	},
	{
		question: "制作期間はどのくらいかかりますか？",
		answer: "プロジェクトの規模により異なりますが、5ページ程度の企業サイトで2-3週間、10ページ程度のサイトで3-4週間が目安です。CMSやカスタム機能が多い場合は4-6週間程度を見込んでいます。詳細は要件ヒアリング後にお見積もりいたします。"
	},
	{
		question: "WordPressからの移行は可能ですか？",
		answer: "はい、可能です。既存のWordPressサイトのコンテンツ・デザインを分析し、Jamstackに最適化して移行いたします。SEOに影響しないよう、リダイレクト設定も含めて対応します。移行後は表示速度・セキュリティが大幅に向上します。"
	},
	{
		question: "コンテンツの更新は簡単にできますか？",
		answer: "はい。ヘッドレスCMS（Contentful、Strapi等）を導入することで、WordPressのような管理画面から簡単にコンテンツ更新が可能です。更新後は自動的にサイトが再生成され、変更が反映されます。"
	},
	{
		question: "運用費用はどのくらいかかりますか？",
		answer: "ホスティング・ドメイン・SSL証明書込みで月額1,000円程度です。従来のレンタルサーバーより安価で、高いパフォーマンスを実現できます。アクセス数が多いサイトでも月額5,000円以下で運用可能です。"
	},
	{
		question: "SEO対策はどの程度対応していますか？",
		answer: "Core Web Vitals最適化、構造化データ実装、サイトマップ自動生成、メタタグ最適化など、包括的なSEO対策を標準で実装します。静的生成により表示速度が向上するため、SEOにも非常に有利です。"
	},
	{
		question: "サポート体制はどうなっていますか？",
		answer: "納品後3-6ヶ月間の保守サポートが含まれます。バグ修正・軽微な修正は無償対応、機能追加は別途お見積もりとなります。緊急時は24時間以内の対応を心がけています。"
	},
	{
		question: "ECサイトや会員機能も対応できますか？",
		answer: "はい、可能です。Shopify、Stripeとの連携でECサイト、Auth0やSupabaseを使用した会員機能も実装できます。Jamstackの利点を活かしつつ、動的な機能も柔軟に対応いたします。"
	},
];

export function JamstackFAQSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeader
					title="よくある質問"
					description="Jamstackサイト制作に関するご質問にお答えします"
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
						その他のご質問がございましたら、お気軽にお問い合わせください
					</p>
					<Link href="/contact?service=jamstack">
						<Button size="lg">
							無料相談を予約する
						</Button>
					</Link>
				</div>
			</Container>
		</section>
	);
}