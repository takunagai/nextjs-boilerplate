"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

const faqs = [
	{
		id: "price",
		question: "どうしてこんなに安いの？",
		answer: "AIと再利用可能なセクション設計、無料サービスの活用、同日スプリントで生産性を最大化しているためです。15年の制作経験をベースに、効率化できる部分は徹底的に効率化し、品質に関わる部分はプロの手で丁寧に仕上げています。",
	},
	{
		id: "timeline",
		question: "本当に1日で公開できますか？",
		answer: "事前準備（素材/ヒアリング）と当日の意思決定がスムーズであれば可能です。遅延要因の多くは素材の未確定です。ロゴ、テキスト、画像などの素材を事前にご準備いただければ、当日中の公開が実現できます。",
	},
	{
		id: "content",
		question: "画像や文章が足りない場合は？",
		answer: "AIでたたき台を作成し、プロが整えます。画像は最新のAI画像生成技術と高品質フリー素材をミックスして使用します。文章も、ヒアリングした内容をもとにAIが下書きを作成し、プロのライターが調整します。",
	},
	{
		id: "running-cost",
		question: "ランニングコストは本当にゼロ？",
		answer: "ドメイン費用は別ですが、サイト運用自体はCloudflare Pagesを使うため基本無料です。通常のアクセス量であれば費用は発生しません。有料機能（アクセス解析の詳細版など）は任意でご利用いただけます。",
	},
	{
		id: "update",
		question: "納品後の更新は？",
		answer: "簡易マニュアルをお渡しします。保守契約なしでも、ご希望に応じて単発対応が可能です（別途お見積り）。また、月額3,300円の保守サポートプランもご用意しており、小修正や軽微なアップデートに対応します。",
	},
	{
		id: "branding",
		question: "既存ロゴやブランドガイドがなくても大丈夫？",
		answer: "はい、大丈夫です。最小限のトーン&マナー定義で整えます。また、ロゴ簡易制作オプション（+11,000円）もご用意しています。タイポグラフィベースのシンプルなロゴを制作いたします。",
	},
	{
		id: "target",
		question: "どんな業種・業態に向いていますか？",
		answer: "小規模事業者、個人事業主、スタートアップ、イベント告知、キャンペーンサイトなど、スピード重視でシンプルな1ページサイトが必要な方に最適です。複雑な機能が必要な場合は、上位プランをご検討ください。",
	},
	{
		id: "quality",
		question: "安いけど品質は大丈夫？",
		answer: "15年の制作経験を持つプロが、最新のAI技術を活用しながら制作します。効率化できる部分は効率化し、品質に関わる部分（デザインの調整、文章の推敲、動作確認など）は手を抜きません。実績サンプルもご覧いただけます。",
	},
];

export function FAQSection() {
	return (
		<section className="bg-muted/30 py-16 md:py-24">
			<Container>
				<SectionHeader
					title="よくある質問（FAQ）"
					description="お客様からよくいただく質問にお答えします"
				/>

				<div className="mx-auto mt-12 max-w-3xl">
					<Accordion type="single" collapsible className="w-full">
						{faqs.map((faq) => (
							<AccordionItem key={faq.id} value={faq.id}>
								<AccordionTrigger className="text-left">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="text-muted-foreground">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>

				<div className="mt-12 text-center">
					<p className="text-muted-foreground">
						その他のご質問は、お気軽にお問い合わせください
					</p>
				</div>
			</Container>
		</section>
	);
}