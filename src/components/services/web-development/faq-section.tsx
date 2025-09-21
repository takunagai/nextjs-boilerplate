"use client";

import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useState } from "react";

const faqItems = [
	{
		id: "ai-quality",
		question: "AIを使うと品質が落ちませんか？",
		answer:
			"むしろ品質は向上しています。AIは効率化のためのツールとして使い、最終的な仕上げは15年の経験でしっかりと行います。AIが作った部分で「ちょっと変だな」という箇所も見逃さずに修正するので、安心してお任せください。",
	},
	{
		id: "price-cheap",
		question: "なぜこんなに安くできるんですか？",
		answer:
			"AIのおかげで作業時間を大幅に短縮できるからです。例えば、競合調査や初期のコード生成などをAIに任せることで、私は本当に重要な部分（デザインの調整や機能の最適化など）に集中できます。時間が短縮できる分、料金もお安くできるんです。",
	},
	{
		id: "support",
		question: "完成後のサポートはありますか？",
		answer:
			"はい、1ヶ月間は軽微な修正を無料で対応いたします。使い方がわからない時や、「ここをちょっと変えたい」という時も遠慮なくご連絡ください。大幅な機能追加は別途お見積もりになりますが、まずはご相談いただければと思います。",
	},
	{
		id: "timeline",
		question: "どのくらいで完成しますか？",
		answer:
			"プランによって異なりますが、通常1〜3週間程度です。お急ぎの場合は「一夜城サービス」で24〜48時間での対応も可能です（特急料金になります）。スケジュールについてもお気軽にご相談ください。",
	},
	{
		id: "technology",
		question: "どんな技術に対応していますか？",
		answer:
			"WordPress、Next.js、Reactなどの主要な技術に対応しています。サーバーやドメインの設定、データベースの構築まで含めた総合的なサポートが可能です。「こんなことできる？」という疑問があれば、まずはお聞かせください。",
	},
	{
		id: "consultation",
		question: "相談だけでも大丈夫ですか？",
		answer:
			"もちろんです！「こんなサイトを作りたいけど、予算はこれくらいで...」「何から始めればいいかわからない...」といった漠然とした相談でも大歓迎です。まずは無料相談で、あなたの理想を一緒に整理しましょう。",
	},
];

function FAQItem({
	item,
	isOpen,
	onToggle,
}: {
	item: (typeof faqItems)[0];
	isOpen: boolean;
	onToggle: () => void;
}) {
	return (
		<div className="border border-border rounded-lg">
			<button
				onClick={onToggle}
				className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
			>
				<h3 className="text-lg font-semibold pr-4">{item.question}</h3>
				<div className="flex-shrink-0">
					{isOpen ? (
						<FaMinus className="w-5 h-5 text-primary" />
					) : (
						<FaPlus className="w-5 h-5 text-primary" />
					)}
				</div>
			</button>
			{isOpen && (
				<div className="px-6 pb-6">
					<p className="text-muted-foreground leading-relaxed">{item.answer}</p>
				</div>
			)}
		</div>
	);
}

export function FAQSection() {
	const [openItems, setOpenItems] = useState<string[]>([]);

	const toggleItem = (id: string) => {
		setOpenItems((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
		);
	};

	return (
		<section className="py-16 md:py-24 bg-muted/30">
			<Container width="xl">
				<div className="text-center mb-12 md:mb-16">
					<Heading as="h2" align="center" className="mb-4">
						よくあるご質問
					</Heading>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						不安なことがあれば、なんでもお聞きください
					</p>
				</div>

				<div className="max-w-4xl mx-auto space-y-4">
					{faqItems.map((item) => (
						<FAQItem
							key={item.id}
							item={item}
							isOpen={openItems.includes(item.id)}
							onToggle={() => toggleItem(item.id)}
						/>
					))}
				</div>

				<div className="text-center mt-12">
					<p className="text-muted-foreground mb-4">
						他にも気になることがあれば、お気軽にお聞きください。
					</p>
					<a
						href="/contact"
						className="text-primary hover:text-primary/80 font-semibold underline"
					>
						質問・相談してみる →
					</a>
				</div>
			</Container>
		</section>
	);
}