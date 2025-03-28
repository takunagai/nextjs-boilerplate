import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva(
	"mx-auto w-full", // 基本スタイル（水平方向のオートマージンと幅100%）
	{
		variants: {
			size: {
				xs: "max-w-xs sm:max-w-sm md:max-w-2xl", // レスポンシブ対応
				sm: "max-w-sm sm:max-w-xl md:max-w-3xl",
				md: "max-w-md sm:max-w-2xl md:max-w-4xl",
				lg: "max-w-lg sm:max-w-3xl md:max-w-5xl",
				xl: "max-w-xl sm:max-w-4xl md:max-w-6xl",
				"2xl": "max-w-2xl sm:max-w-5xl md:max-w-7xl",
				full: "max-w-full",
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
			position: {
				default: "",
				relative: "relative",
			},
			zIndex: {
				none: "",
				base: "z-10",
				high: "z-20",
				highest: "z-50",
			},
		},
		defaultVariants: {
			size: "2xl",
			paddingY: "md",
			paddingX: "md",
			position: "default",
			zIndex: "none",
		},
	},
);

// 許可されるHTML要素タイプを制限
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

// Containerコンポーネントの基本プロパティ
export type ContainerVariantProps = VariantProps<typeof containerVariants>;

// asプロパティの型定義
type AsProps = {
	as?: AllowedElementType;
};

// Containerのプロパティ型定義
export interface ContainerProps
	extends React.ComponentPropsWithoutRef<"div">,
		ContainerVariantProps,
		AsProps {}

export function Container({
	className,
	as: Component = "div",
	size,
	paddingY,
	paddingX,
	position,
	zIndex,
	...props
}: ContainerProps) {
	return (
		<Component
			className={cn(
				containerVariants({ size, paddingY, paddingX, position, zIndex }),
				className,
			)}
			{...props}
		/>
	);
}
