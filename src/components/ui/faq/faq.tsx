import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { FAQTagBadge } from "./faq-tag";
import type { FAQItem, FAQProps } from "./faq-types";

/**
 * FAQ（よくある質問）コンポーネント
 *
 * サーバーコンポーネントとして実装され、shadcn/uiのAccordionを利用
 * - コンテナクエリによるレスポンシブデザイン
 * - アイコンカスタマイズ対応（react-icons）
 * - タグによる分類表示
 * - アクセシビリティ対応
 * - 検索/フィルタリング機能
 */
export function FAQ({
	items,
	search,
	tagFilter,
	defaultOpenIds = [],
	heading,
	animate = true,
	classNames,
	ariaLabel = "よくある質問",
}: FAQProps) {
	// サーバーコンポーネントでの検索・フィルタリング
	let filteredItems = items;

	// 検索語句によるフィルタリング
	if (search) {
		const searchLower = search.toLowerCase();
		filteredItems = filteredItems.filter(
			(item) =>
				item.question.toLowerCase().includes(searchLower) ||
				(typeof item.answer === "string" &&
					item.answer.toLowerCase().includes(searchLower)),
		);
	}

	// タグによるフィルタリング
	if (tagFilter && tagFilter.length > 0) {
		filteredItems = filteredItems.filter((item) =>
			item.tags?.some((tag) => tagFilter.includes(tag.label)),
		);
	}

	// 結果がない場合
	if (filteredItems.length === 0) {
		return (
			<div
				className={cn("w-full py-4", classNames?.container)}
				aria-label={ariaLabel}
			>
				{heading && <div className="mb-4">{heading}</div>}
				<p className="text-muted-foreground">
					該当する質問が見つかりませんでした。
				</p>
			</div>
		);
	}

	// FAQ項目を描画する関数
	const renderFAQItem = (item: FAQItem) => (
		<AccordionItem
			key={item.id}
			value={item.id}
			className={cn(
				"overflow-hidden border rounded-xs @sm:rounded-sm",
				"mb-3 last:mb-0",
				classNames?.item,
			)}
		>
			<AccordionTrigger
				className={cn(
					"flex w-full items-center gap-1 p-3 @sm:p-4 text-left",
					"text-sm @sm:text-base",
					"hover:no-underline data-[state=open]:no-underline",
					classNames?.question,
				)}
			>
				{/* 質問アイコン */}
				{item.questionIcon && (
					<span
						className={cn(
							"flex-shrink-0 size-5 @sm:size-6 mt-1",
							classNames?.questionIcon,
						)}
						aria-hidden="true"
					>
						{item.questionIcon}
					</span>
				)}

				{/* 質問テキスト */}
				<span className="flex-grow mr-auto">{item.question}</span>

				{/* タグエリア - コンテナサイズに応じて表示/非表示 */}
				{item.tags && item.tags.length > 0 && (
					<div className="hidden @md:flex flex-wrap gap-1 mr-2">
						{item.tags.map((tag) => (
							<FAQTagBadge
								key={`${item.id}-tag-${tag.label}`}
								tag={tag}
								className={classNames?.tag}
							/>
						))}
					</div>
				)}
			</AccordionTrigger>

			<AccordionContent
				className={cn(
					animate ? "" : "!transition-none !animate-none",
					classNames?.answer,
				)}
			>
				<div className="flex px-4">
					{/* 回答アイコン */}
					{item.answerIcon && (
						<span
							className={cn(
								"flex-shrink-0 size-4 @sm:size-5 mr-2 mt-1",
								classNames?.answerIcon,
							)}
							aria-hidden="true"
						>
							{item.answerIcon}
						</span>
					)}

					{/* 回答テキスト */}
					<div
						className={cn(
							"flex-grow text-sm @sm:text-base",
							"text-muted-foreground leading-relaxed",
						)}
					>
						{item.answer}
					</div>
				</div>

				{/* コンテナが小さいときのみタグを表示 - モバイル表示用 */}
				{item.tags && item.tags.length > 0 && (
					<div className="flex @md:hidden flex-wrap gap-1 mt-2 mb-1">
						{item.tags.map((tag) => (
							<FAQTagBadge
								key={`${item.id}-mobile-tag-${tag.label}`}
								tag={tag}
								className={classNames?.tag}
							/>
						))}
					</div>
				)}
			</AccordionContent>
		</AccordionItem>
	);

	return (
		<div
			className={cn("w-full @container", classNames?.container)}
			aria-labelledby={`faq-heading-${ariaLabel.replace(/\s+/g, "-").toLowerCase()}`}
		>
			{/* 見出し */}
			{heading && (
				<div
					id={`faq-heading-${ariaLabel.replace(/\s+/g, "-").toLowerCase()}`}
					className="mb-4 @md:mb-6"
				>
					{heading}
				</div>
			)}

			{/* FAQ項目リスト */}
			<Accordion
				type="multiple"
				defaultValue={defaultOpenIds}
				className={cn("w-full space-y-1 @sm:space-y-2")}
			>
				{filteredItems.map(renderFAQItem)}
			</Accordion>
		</div>
	);
}
