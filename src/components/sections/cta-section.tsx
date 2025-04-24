import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";

// ルートコンポーネントのProps
export interface CTASectionRootProps extends React.HTMLAttributes<HTMLElement> {
	/**
	 * レイアウト - セクション全体の配置方法
	 * - horizontal: 横並びレイアウト（デスクトップでコンテンツと操作が横並び）
	 * - vertical: 縦並びレイアウト（コンテンツが中央揃えで縦に配置）
	 * - card: カード型レイアウト（角丸と影付きのカードデザイン）
	 * - banner: バナー型レイアウト（幅いっぱいに広がるバナースタイル）
	 */
	layout?: "horizontal" | "vertical" | "card" | "banner";
	/**
	 * 背景画像のURL
	 */
	backgroundImage?: string;
}

// コンテナコンポーネントのProps
interface CTASectionContainerProps
	extends React.HTMLAttributes<HTMLDivElement> {
	/**
	 * 親のCTASectionから継承するレイアウト
	 */
	layout?: "horizontal" | "vertical" | "card" | "banner";
}

// ボタンの基本Props
interface CTASectionButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
	href?: string;
	external?: boolean;
	icon?: React.ReactNode;
	variant?:
		| "default"
		| "secondary"
		| "outline"
		| "ghost"
		| "link"
		| "destructive";
	size?: "default" | "sm" | "lg" | "icon";
}

// CTASectionコンポーネント本体
export function CTASection({
	layout = "horizontal",
	backgroundImage,
	className,
	children,
	...props
}: CTASectionRootProps) {
	// 背景画像のスタイル
	const backgroundStyle = backgroundImage
		? {
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}
		: undefined;

	// レイアウトに基づくTailwindクラス
	const layoutClasses = {
		horizontal: "flex flex-col @lg:flex-row items-center justify-between gap-8",
		vertical: "flex flex-col items-center text-center",
		card: "rounded-xl shadow-md flex flex-col",
		banner: "w-full flex flex-col items-center text-center",
	};

	// 子要素に追加のpropsを渡す
	const childrenWithProps = React.Children.map(children, (child) => {
		if (!React.isValidElement(child)) return child;
		return React.cloneElement(child, {
			layout,
		} as React.HTMLAttributes<HTMLElement>);
	});

	return (
		<section
			className={cn(
				"w-full @container relative",
				layoutClasses[layout],
				className,
			)}
			style={backgroundStyle}
			data-layout={layout}
			{...props}
		>
			{backgroundImage && (
				<div className="absolute inset-0 bg-black/50" aria-hidden="true" />
			)}
			{childrenWithProps}
		</section>
	);
}

// コンテナサブコンポーネント
CTASection.Container = function CTASectionContainer({
	layout = "horizontal",
	className,
	children,
	...props
}: CTASectionContainerProps) {
	// レイアウトに応じたクラスを設定
	const layoutClasses = {
		horizontal:
			"flex flex-col @lg:flex-row @lg:items-center @lg:justify-between @lg:gap-8",
		vertical: "flex flex-col items-center text-center",
		card: "flex flex-col",
		banner: "flex flex-col items-center text-center",
	};

	return (
		<Container
			className={cn(
				"relative z-10 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
				layoutClasses[layout],
				className,
			)}
			{...props}
		>
			{children}
		</Container>
	);
};

// コンテンツエリアサブコンポーネント
CTASection.Content = function CTASectionContent({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("max-w-2xl space-y-4", className)} {...props}>
			{children}
		</div>
	);
};

// タイトルサブコンポーネント
CTASection.Title = function CTASectionTitle({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h2 className={cn("font-bold text-3xl @md:text-4xl", className)} {...props}>
			{children}
		</h2>
	);
};

// 説明サブコンポーネント
CTASection.Description = function CTASectionDescription({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p className={cn("text-lg", className)} {...props}>
			{children}
		</p>
	);
};

// アクションエリアサブコンポーネント
CTASection.Actions = function CTASectionActions({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("flex gap-4 mt-6", className)} {...props}>
			{children}
		</div>
	);
};

// 共通ボタンレンダリング関数
const renderCTAButton = (
	{
		href,
		external = false,
		icon,
		variant,
		size,
		className,
		children,
		...props
	}: CTASectionButtonProps,
	defaultIcon?: React.ReactNode,
	defaultVariant:
		| "default"
		| "secondary"
		| "outline"
		| "ghost"
		| "link"
		| "destructive" = "default",
) => {
	const buttonIcon = icon || (external && defaultIcon);

	const buttonContent = (
		<>
			{children}
			{buttonIcon && <span aria-hidden="true">{buttonIcon}</span>}
		</>
	);

	if (href) {
		return (
			<Button
				variant={variant || defaultVariant}
				size={size}
				className={cn("gap-2", className)}
				asChild
				{...props}
			>
				{external ? (
					<a href={href} target="_blank" rel="noopener noreferrer">
						{buttonContent}
					</a>
				) : (
					<Link href={href}>{buttonContent}</Link>
				)}
			</Button>
		);
	}

	return (
		<Button
			variant={variant || defaultVariant}
			size={size}
			className={cn("gap-2", className)}
			{...props}
		>
			{buttonContent}
		</Button>
	);
};

// プライマリボタンサブコンポーネント
CTASection.PrimaryButton = function CTASectionPrimaryButton(
	props: CTASectionButtonProps,
) {
	return renderCTAButton(
		props,
		<FaArrowRight className="h-4 w-4" />,
		"default",
	);
};

// セカンダリボタンサブコンポーネント
CTASection.SecondaryButton = function CTASectionSecondaryButton(
	props: CTASectionButtonProps,
) {
	return renderCTAButton(
		props,
		<FaArrowUpRightFromSquare className="h-4 w-4" />,
		"outline",
	);
};
