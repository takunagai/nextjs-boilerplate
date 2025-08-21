"use client";

import { Container } from "@/components/ui/container";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const faqs = [
	{
		id: 1,
		question: "AI生成画像の著作権はどうなりますか？",
		answer:
			"制作完了後、著作権はお客様に完全譲渡いたします。商用利用、改変、転載など自由にご利用いただけます。著作権譲渡書も発行いたします。",
	},
	{
		id: 2,
		question: "どのような画像形式で納品されますか？",
		answer:
			"JPEG、PNG、PSD（Photoshopファイル）での納品が可能です。ベクター画像の場合はAI、SVG形式でも対応いたします。解像度や用途に応じて最適な形式をご提案します。",
	},
	{
		id: 3,
		question: "修正回数に制限はありますか？",
		answer:
			"プランにより異なります。ベーシックは3回、スタンダードは5回、プレミアムは無制限です。軽微な修正（色調整など）は回数に含まれません。",
	},
	{
		id: 4,
		question: "AI生成画像と分からないくらい自然に仕上がりますか？",
		answer:
			"はい。AI生成後にPhotoshopでプロの後処理を行い、「AI臭さ」を除去します。自然で違和感のない仕上がりを目指しており、多くのお客様から高評価をいただいています。",
	},
	{
		id: 5,
		question: "特定の人物に似せた画像は作成できますか？",
		answer:
			"著作権・肖像権の関係で、実在する有名人やキャラクターに似せた画像の制作はお断りしています。架空の人物の生成は可能です。",
	},
	{
		id: 6,
		question: "大量の画像制作にも対応していますか？",
		answer:
			"はい、大量制作にも対応しています。10点以上の場合は割引制度があります。プレミアムプランでは専任担当者が付き、効率的に制作を進めます。",
	},
	{
		id: 7,
		question: "既存の画像の加工・補正だけでも依頼できますか？",
		answer:
			"もちろん可能です。写真のアップスケール、ノイズ除去、色調補正、背景除去など、既存画像の品質向上にも対応しています。",
	},
	{
		id: 8,
		question: "制作途中で仕様変更は可能ですか？",
		answer:
			"制作開始前でしたら無料で変更可能です。制作途中の場合は内容により追加料金が発生する場合があります。事前にご相談ください。",
	},
	{
		id: 9,
		question: "納期を短縮することは可能ですか？",
		answer:
			"緊急対応として6時間以内納品も可能です（50%の追加料金）。お急ぎの場合は事前にご相談ください。可能な限り対応いたします。",
	},
	{
		id: 10,
		question: "支払い方法はどうなっていますか？",
		answer:
			"銀行振込、クレジットカード、PayPalに対応しています。制作完了後の後払いも可能です。長期契約の場合は月末締めの翌月払いも対応いたします。",
	},
];

export function AIFAQ() {
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	const toggleFaq = (id: number) => {
		setOpenFaq(openFaq === id ? null : id);
	};

	return (
		<section className="py-16 sm:py-24">
			<Container as="section">
				<div className="text-center">
					<h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
						よくあるご質問
					</h2>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
						AI画像制作に関してよくいただくご質問にお答えします
					</p>
				</div>

				<div className="mx-auto mt-12 max-w-4xl">
					<div className="space-y-4">
						{faqs.map((faq) => (
							<div
								key={faq.id}
								className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
							>
								<button
									onClick={() => toggleFaq(faq.id)}
									className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
								>
									<span className="font-medium text-gray-900 dark:text-white">
										{faq.question}
									</span>
									<FaChevronDown
										className={cn(
											"h-5 w-5 text-gray-500 transition-transform",
											openFaq === faq.id && "rotate-180",
										)}
									/>
								</button>

								{openFaq === faq.id && (
									<div className="border-t border-gray-200 p-6 dark:border-gray-700">
										<p className="text-gray-600 dark:text-gray-400">
											{faq.answer}
										</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* AI技術に関する補足説明 */}
				<div className="mt-16 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 p-8 dark:from-purple-900/20 dark:to-blue-900/20">
					<div className="text-center">
						<h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
							AI技術について
						</h3>
						<p className="mx-auto max-w-2xl text-gray-700 dark:text-gray-300">
							使用するAI技術は日々進歩しています。最新の技術動向を常にキャッチアップし、
							お客様により良いサービスを提供できるよう努めています。
							技術的な詳細や制限事項については、お気軽にお問い合わせください。
						</p>
					</div>
				</div>

				{/* 追加サポート */}
				<div className="mt-12 text-center">
					<p className="mb-4 text-gray-600 dark:text-gray-400">
						その他のご質問がございましたら、お気軽にお問い合わせください
					</p>
					<a
						href="#contact"
						className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-purple-700 hover:to-blue-700 hover:shadow-lg"
					>
						お問い合わせ
					</a>
				</div>
			</Container>
		</section>
	);
}
