import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

/**
 * コンテナのバリアント設定
 * Tailwind CSS v4の仕様に合わせたレスポンシブ対応
 */
const containerVariants = cva("w-full mx-auto", {
	variants: {
		width: {
			xs: "max-w-xs sm:max-w-sm md:max-w-2xl",
			sm: "max-w-sm sm:max-w-xl md:max-w-3xl",
			md: "max-w-md sm:max-w-2xl md:max-w-4xl",
			lg: "max-w-lg sm:max-w-3xl md:max-w-5xl",
			xl: "max-w-xl sm:max-w-4xl md:max-w-6xl",
			"2xl": "max-w-2xl sm:max-w-5xl md:max-w-7xl",
			full: "max-w-full",
			custom: "", // カスタム幅用
		},
		paddingY: {
			none: "py-0",
			xs: "py-2",
			sm: "py-3 md:py-4",
			md: "py-4 md:py-8",
			lg: "py-6 md:py-12",
			xl: "py-8 md:py-16",
			"2xl": "py-10 md:py-20",
			"3xl": "py-12 md:py-24",
			"4xl": "py-16 md:py-32",
		},
		paddingX: {
			none: "px-0",
			xs: "px-2 sm:px-3",
			sm: "px-3 sm:px-4",
			md: "px-4 sm:px-6 lg:px-8",
			lg: "px-5 sm:px-8 lg:px-10",
			xl: "px-6 sm:px-10 lg:px-12",
			"2xl": "px-8 sm:px-12 lg:px-16",
			"3xl": "px-10 sm:px-16 lg:px-20",
			"4xl": "px-12 sm:px-20 lg:px-24",
		},
	},
	defaultVariants: {
		width: "2xl",
		paddingY: "md",
		paddingX: "md",
	},
});

/**
 * 許可されるHTML要素タイプ
 * セマンティックなHTML要素のみを使用可能に制限
 */
type AllowedElementType =
	| "div"
	| "section"
	| "header"
	| "footer"
	| "main"
	| "article"
	| "aside"
	| "figure"
	| "figcaption"
	| "summary"
	| "nav";

/**
 * Containerコンポーネントの基本プロパティ
 * cvaから生成されるバリアントプロパティ
 */
export type ContainerVariantProps = VariantProps<typeof containerVariants>;

/**
 * 拡張プロパティの型定義
 */
type ExtendedProps = {
	/**
	 * 使用するHTML要素
	 * @default "div"
	 */
	as?: AllowedElementType;

	/**
	 * フルワイド（最大幅なし）で表示するかどうか
	 * @default false
	 */
	fluid?: boolean;

	/**
	 * カスタム最大幅（width="custom"の場合に使用）
	 * CSSの値を文字列で指定（例: "800px"）
	 */
	customMaxWidth?: string;
};

export interface ContainerProps
	extends React.ComponentPropsWithoutRef<"div">,
		ContainerVariantProps,
		ExtendedProps {}

/**
 * コンテナコンポーネント
 * レスポンシブ対応のコンテンツ幅とパディングを提供
 *
 * @example
 * ```tsx
 * <Container width="lg" paddingY="md" paddingX="lg">
 *   コンテンツ
 * </Container>
 * ```
 */
export function Container({
	className,
	as: Component = "div",
	width,
	paddingY,
	paddingX,
	fluid = false,
	customMaxWidth,
	children,
	...props
}: ContainerProps) {
	const effectiveWidth = fluid ? "full" : width;

	// カスタムスタイル
	const style =
		width === "custom" && customMaxWidth
			? {
					"--container-custom-width": customMaxWidth,
					maxWidth: "var(--container-custom-width)",
				}
			: undefined;

	return (
		<Component
			className={cn(
				containerVariants({
					width: effectiveWidth,
					paddingY,
					paddingX,
				}),
				className,
			)}
			style={style}
			{...props}
		>
			{children}
		</Component>
	);
}
