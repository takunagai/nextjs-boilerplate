"use client";

import { Container } from "@/components/ui/container";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const faqs = [
	{
		id: 1,
		question: "撮影場所はどこでも対応可能ですか？",
		answer:
			"基本的には都内及び近郊エリアに対応しています。スタジオ、お客様の店舗、オフィス、屋外など様々な場所での撮影が可能です。遠方の場合は交通費を別途いただく場合があります。",
	},
	{
		id: 2,
		question: "納期はどのくらいですか？",
		answer:
			"撮影後、通常2-3営業日で納品いたします。お急ぎの場合は最短翌日納品も可能です（追加料金がかかる場合があります）。",
	},
	{
		id: 3,
		question: "データの形式はどうなりますか？",
		answer:
			"JPEG形式での納品が標準です。必要に応じてRAWデータの提供も可能です。サイズは用途に応じて調整いたします（Web用、印刷用など）。",
	},
	{
		id: 4,
		question: "撮影時間の目安を教えてください",
		answer:
			"内容により異なりますが、プロフィール写真で約1時間、商品撮影（10点程度）で約2時間、料理撮影（20品程度）で約3時間が目安です。",
	},
	{
		id: 5,
		question: "雨天の場合はどうなりますか？",
		answer:
			"屋外撮影の場合、雨天時は日程を調整させていただきます。キャンセル料は発生しません。屋内撮影の場合は天候に関係なく実施可能です。",
	},
	{
		id: 6,
		question: "修正・やり直しは可能ですか？",
		answer:
			"基本的な色味や明るさの調整は無料で対応いたします。大幅な修正や追加撮影が必要な場合は、別途お見積もりをご提示いたします。",
	},
	{
		id: 7,
		question: "キャンセルポリシーはどうなっていますか？",
		answer:
			"撮影の3日前までのキャンセルは無料、前日・当日のキャンセルは撮影料金の50%をキャンセル料としていただきます。",
	},
	{
		id: 8,
		question: "著作権について教えてください",
		answer:
			"撮影した写真の著作権は、お客様に譲渡いたします。商用利用、改変、転載など自由にご利用いただけます。当方のポートフォリオとしての使用については事前にご相談いたします。",
	},
];

export function PhotographyFAQ() {
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
						お客様からよくいただくご質問にお答えします
					</p>
				</div>

				<div className="mx-auto mt-12 max-w-3xl">
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

				{/* 追加サポート */}
				<div className="mt-12 text-center">
					<p className="mb-4 text-gray-600 dark:text-gray-400">
						その他のご質問がございましたら、お気軽にお問い合わせください
					</p>
					<a
						href="#contact"
						className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
					>
						お問い合わせ
					</a>
				</div>
			</Container>
		</section>
	);
}
