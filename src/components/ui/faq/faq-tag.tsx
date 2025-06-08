import { cn } from "@/lib/utils";
import type { FAQTag } from "./faq-types";

interface FAQTagBadgeProps {
	/**
	 * タグデータ
	 */
	tag: FAQTag;

	/**
	 * 追加のクラス名
	 */
	className?: string;
}

/**
 * FAQのタグをバッジとして表示するコンポーネント
 * コンテナクエリに対応したレスポンシブデザイン
 */
export function FAQTagBadge({ tag, className }: FAQTagBadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full",
				"bg-gray-100 text-gray-800",
				"@sm:px-2.5 @sm:py-1", // コンテナクエリ対応
				tag.className,
				className,
			)}
		>
			{tag.label}
		</span>
	);
}
