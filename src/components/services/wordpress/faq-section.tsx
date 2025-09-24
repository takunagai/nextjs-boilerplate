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
		question: "WordPressのセキュリティは大丈夫ですか？",
		answer:
			"はい、セキュリティ対策を徹底しています。最新版への自動更新、セキュリティプラグインの導入、不正アクセス対策、定期的なバックアップなど、多層的なセキュリティ対策を実装します。また、運用開始後も継続的にセキュリティ監視を行います。",
	},
	{
		question: "既存のHTMLサイトからWordPressに移行できますか？",
		answer:
			"はい、可能です。既存のデザイン・コンテンツを分析し、WordPressテーマとして再構築いたします。URLの変更を最小限に抑え、SEOに影響しないよう移行作業を行います。移行期間中のアクセス確保も万全です。",
	},
	{
		question: "制作期間はどのくらいかかりますか？",
		answer:
			"プロジェクトの規模により異なりますが、10ページ程度の企業サイトで3-4週間、20ページ程度のサイトで4-6週間が目安です。ECサイトや複雑なカスタマイズが必要な場合は6-8週間程度を見込んでいます。",
	},
	{
		question: "コンテンツの更新は簡単にできますか？",
		answer:
			"はい、WordPress の直感的な管理画面で簡単に更新できます。納品時に操作マニュアルの提供と操作レクチャーを実施するため、専門知識がなくても安心してご利用いただけます。",
	},
	{
		question: "プラグインはどのように選定していますか？",
		answer:
			"信頼性・更新頻度・互換性を重視して選定しています。可能な限り軽量で高品質なプラグインを使用し、独自開発が必要な場合はカスタムプラグインを作成します。サイトのパフォーマンスを最優先に考慮します。",
	},
	{
		question: "バックアップはどのように行いますか？",
		answer:
			"自動バックアップシステムを導入し、日次・週次・月次のバックアップを実行します。また、外部クラウドストレージにも保存するため、万一の際もデータ復旧が可能です。バックアップからの復元作業もサポートいたします。",
	},
	{
		question: "WordPressのアップデートは対応してもらえますか？",
		answer:
			"はい、保守サポート期間中はWordPress本体・テーマ・プラグインのアップデートを代行いたします。アップデート前には必ずテスト環境で動作確認を行い、安全性を確保してから本番環境に適用します。",
	},
	{
		question: "ECサイト機能も対応できますか？",
		answer:
			"はい、WooCommerceを使用した本格的なECサイト構築に対応しています。商品管理・在庫管理・決済システム・配送設定など、必要な機能を包括的に実装いたします。",
	},
];

export function WordPressFAQSection() {
	return (
		<section className="py-16 md:py-24">
			<Container>
				<SectionHeader
					title="よくある質問"
					description="WordPressサイト制作に関するご質問にお答えします"
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
					<Link href="/contact?service=wordpress">
						<Button size="lg">無料相談を予約する</Button>
					</Link>
				</div>
			</Container>
		</section>
	);
}
