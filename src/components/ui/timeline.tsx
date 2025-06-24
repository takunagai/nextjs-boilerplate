import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// 共通のバリアント定義
const variantStyles = {
	default: {
		border: "before:w-px before:bg-gray-200 dark:before:bg-gray-700",
		icon: "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400",
	},
	primary: {
		border: "before:w-0.5 before:bg-primary",
		icon: "border-primary text-primary",
	},
	secondary: {
		border: "before:w-0.5 before:bg-secondary",
		icon: "border-secondary text-secondary",
	},
	accent: {
		border: "before:w-0.5 before:bg-amber-500",
		icon: "border-amber-500 text-amber-500",
	},
	success: {
		border: "before:w-0.5 before:bg-green-500",
		icon: "border-green-500 text-green-500",
	},
	warning: {
		border: "before:w-0.5 before:bg-yellow-500",
		icon: "border-yellow-500 text-yellow-500",
	},
	danger: {
		border: "before:w-0.5 before:bg-red-500",
		icon: "border-red-500 text-red-500",
	},
};

// タイムラインのバリエーションを定義
const timelineVariants = cva("relative pl-0");

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {}

// メインのTimelineコンポーネント
export function Timeline({ className, ...props }: TimelineProps) {
	return <div className={cn(timelineVariants(), className)} {...props} />;
}
Timeline.displayName = "Timeline";

// タイムラインアイテムのバリエーションを定義
const timelineItemVariants = cva(
	"relative pl-8 before:absolute before:left-0 before:top-0 before:h-full pb-6",
	{
		variants: {
			align: {
				left: "",
				right: "flex-row-reverse",
				center: "",
			},
			variant: {
				default: variantStyles.default.border,
				primary: variantStyles.primary.border,
				secondary: variantStyles.secondary.border,
				accent: variantStyles.accent.border,
				success: variantStyles.success.border,
				warning: variantStyles.warning.border,
				danger: variantStyles.danger.border,
			},
		},
		defaultVariants: {
			align: "left",
			variant: "default",
		},
	},
);

export interface TimelineItemProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof timelineItemVariants> {}

// タイムラインアイテムコンポーネント
export function TimelineItem({
	className,
	align,
	variant,
	...props
}: TimelineItemProps) {
	return (
		<div
			className={cn(timelineItemVariants({ align, variant }), className)}
			{...props}
		/>
	);
}
TimelineItem.displayName = "TimelineItem";

// タイムラインアイコンのバリエーションを定義
const timelineIconVariants = cva(
	"absolute flex items-center justify-center rounded-full border bg-background z-10 h-8 w-8 left-0 -translate-x-1/2",
	{
		variants: {
			variant: {
				default: variantStyles.default.icon,
				primary: variantStyles.primary.icon,
				secondary: variantStyles.secondary.icon,
				accent: variantStyles.accent.icon,
				success: variantStyles.success.icon,
				warning: variantStyles.warning.icon,
				danger: variantStyles.danger.icon,
			},
			position: {
				left: "top-0",
				center: "top-1/2 -translate-y-1/2",
				right: "bottom-0",
			},
		},
		defaultVariants: {
			variant: "default",
			position: "left",
		},
	},
);

export interface TimelineIconProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof timelineIconVariants> {}

// タイムラインアイコンコンポーネント
export function TimelineIcon({
	className,
	variant,
	position,
	...props
}: TimelineIconProps) {
	return (
		<div
			className={cn(timelineIconVariants({ variant, position }), className)}
			{...props}
		/>
	);
}
TimelineIcon.displayName = "TimelineIcon";

// タイムラインコンテンツのバリエーションを定義
const timelineContentVariants = cva("", {
	variants: {
		variant: {
			default: "pt-0",
			card: "rounded-lg border border-gray-200 dark:border-gray-700 bg-background p-4 shadow-sm",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface TimelineContentProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof timelineContentVariants> {}

// タイムラインコンテンツコンポーネント
export function TimelineContent({
	className,
	variant,
	...props
}: TimelineContentProps) {
	return (
		<div
			className={cn(timelineContentVariants({ variant }), className)}
			{...props}
		/>
	);
}
TimelineContent.displayName = "TimelineContent";

// タイムラインタイトルコンポーネント
export function TimelineTitle({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return <h3 className={cn("font-medium", className)} {...props} />;
}
TimelineTitle.displayName = "TimelineTitle";

// タイムライン日付コンポーネント
export function TimelineDate({
	className,
	...props
}: React.HTMLAttributes<HTMLTimeElement>) {
	return (
		<time
			className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
			{...props}
		/>
	);
}
TimelineDate.displayName = "TimelineDate";

// タイムライン説明コンポーネント
export function TimelineDescription({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn("text-gray-700 dark:text-gray-300", className)}
			{...props}
		/>
	);
}
TimelineDescription.displayName = "TimelineDescription";

export {
	timelineContentVariants,
	timelineIconVariants,
	timelineItemVariants,
	timelineVariants,
};
