import { clsx } from "clsx";
import { Children, isValidElement, type ReactNode } from "react";

/**
 * 見出しのサイズバリエーション
 */
type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

/**
 * ボーダー位置
 */
type BorderPosition = "none" | "left" | "top" | "bottom" | "between";

/**
 * 見出しコンポーネントのプロパティ
 */
type HeadingRootProps = {
	/** 見出しレベル（h1〜h6） */
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	/** アイコン要素（ReactNode） */
	icon?: ReactNode;
	/** アイコンの色（Tailwindクラス） */
	iconColor?: string;
	/** ボーダーの位置（none, left, top, bottom） */
	borderPosition?: BorderPosition;
	/** ボーダースタイル（Tailwind CSSクラス）例: "border-2 border-red-500 border-dashed" */
	borderClass?: string;
	/** 見出しのサイズ（指定なしの場合は見出しレベルに応じて自動設定） */
	size?: HeadingSize;
	/** テキスト配置（left, center） */
	align?: "left" | "center";
	/** 追加CSSクラス */
	className?: string;
	/** 子要素（見出しテキスト） */
	children: ReactNode;
};

/**
 * リード文コンポーネントのプロパティ
 */
type HeadingLeadProps = {
	/** リード文のテキスト/要素 */
	children: ReactNode;
	/** ボーダーの有無 */
	bordered?: boolean;
	/** ボーダースタイル（Tailwind CSSクラス）例: "border-b-2 border-blue-500 border-dotted" */
	borderClass?: string;
	/** 追加CSSクラス */
	className?: string;
};

/**
 * 見出しサイズのマッピング
 */
const sizeVariant = {
	xs: "text-xs sm:text-sm font-bold",
	sm: "text-sm sm:text-base font-bold",
	md: "text-base sm:text-lg font-bold",
	lg: "text-lg sm:text-xl font-bold",
	xl: "text-xl sm:text-2xl font-bold",
	"2xl": "text-2xl sm:text-3xl font-bold",
	"3xl": "text-3xl sm:text-4xl font-bold",
} as const;

/**
 * 見出しレベルに応じたデフォルトサイズのマッピング
 */
const headingLevelSizeMap: Record<string, HeadingSize> = {
	h1: "3xl",
	h2: "2xl",
	h3: "xl",
	h4: "lg",
	h5: "md",
	h6: "sm",
};

/**
 * ボーダークラスを生成する関数
 */
function getBorderClass(
	position: BorderPosition,
	borderClass: string = "border-2 border-gray-200/50",
): string {
	if (position === "none" || position === "between") return "";

	switch (position) {
		case "left":
			return `border-l ${borderClass} pl-4`;
		case "top":
			return `border-t ${borderClass} pt-4`;
		case "bottom":
			return `border-b ${borderClass} pb-2`;
		default:
			return "";
	}
}

/**
 * 見出しコンポーネントの実装
 */
function HeadingRoot({
	as,
	icon,
	iconColor,
	borderPosition = "none",
	borderClass = "border-2 border-gray-200/50",
	size,
	align = "left",
	className,
	children,
}: HeadingRootProps) {
	// 見出しタグのデフォルトはh2
	const Tag = as ?? "h2";

	// 見出しレベルに応じたサイズ設定
	const defaultSize = headingLevelSizeMap[Tag] || "md";
	const headingSize = size || defaultSize;
	const headingClass = sizeVariant[headingSize];

	// コンテナのボーダースタイル
	const containerBorderStyles = getBorderClass(borderPosition, borderClass);

	// 子要素を見出しとリードに分割
	const childrenArray = Children.toArray(children) as ReactNode[];
	const leadItems = childrenArray.filter(
		(child) => isValidElement(child) && child.type === HeadingLead,
	);
	const headingItems = childrenArray.filter(
		(child) => !isValidElement(child) || child.type !== HeadingLead,
	);
	const hasLead = leadItems.length > 0;

	return (
		<div
			className={clsx(
				"mb-6",
				containerBorderStyles,
				align === "center" && "text-center",
				className,
			)}
		>
			<Tag
				className={clsx(
					"flex items-center gap-2 text-balance",
					align === "center" && "justify-center",
					headingClass,
				)}
			>
				{icon && (
					<span
						className={clsx(
							"flex-shrink-0 inline-flex items-center",
							iconColor || "text-current",
						)}
						aria-hidden="true"
					>
						{icon}
					</span>
				)}
				<span className="inline-flex items-center">{headingItems}</span>
			</Tag>
			{hasLead && (
				<>
					{borderPosition === "between" && (
						<div className={clsx("border-t my-3", borderClass)} />
					)}
					{leadItems}
				</>
			)}
		</div>
	);
}

/**
 * リード文コンポーネント
 */
function HeadingLead({
	children,
	bordered = false,
	borderClass = "",
	className,
}: HeadingLeadProps) {
	return (
		<p
			className={clsx(
				"mt-2 text-foreground",
				bordered && `${borderClass} pb-2`,
				className,
			)}
		>
			{children}
		</p>
	);
}

/**
 * 複合コンポーネントの構成
 */
const Heading = Object.assign(HeadingRoot, {
	Lead: HeadingLead,
});

export { Heading, type HeadingLeadProps, type HeadingRootProps };
