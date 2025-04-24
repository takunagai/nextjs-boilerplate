import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { FaArrowRight, FaArrowUpRightFromSquare } from "react-icons/fa6";
import {
	ctaButtonGroupVariants,
	ctaContentVariants,
	ctaSectionVariants,
} from "./cta-section-variants";

export interface CTASectionProps extends React.HTMLAttributes<HTMLElement> {
	// バリアント
	/**
	 * レイアウト - セクション全体の配置方法
	 * - horizontal: 横並びレイアウト（デスクトップでコンテンツと操作が横並び）
	 * - vertical: 縦並びレイアウト（コンテンツが中央揃えで縦に配置）
	 * - card: カード型レイアウト（角丸と影付きのカードデザイン）
	 * - banner: バナー型レイアウト（幅いっぱいに広がるバナースタイル）
	 */
	layout?: "horizontal" | "vertical" | "card" | "banner";
	/**
	 * インテント - セクションの目的や重要度を視覚的に表現
	 * - primary: メインカラーを使用した最も目立つスタイル
	 * - secondary: セカンダリカラーを使用した控えめなスタイル
	 * - accent: アクセントカラーを使用した強調スタイル
	 * - muted: 彩度を抑えた控えめなスタイル
	 * - minimal: 最小限の装飾のみのシンプルなスタイル
	 */
	intent?: "primary" | "secondary" | "accent" | "muted" | "minimal";
	/**
	 * サイズ - セクションの縦幅を制御
	 * - sm: コンパクトなサイズ
	 * - md: 標準サイズ
	 * - lg: 大きいサイズ
	 */
	size?: "sm" | "md" | "lg";
	/**
	 * 装飾 - セクションの視覚的な装飾スタイル
	 * - none: 装飾なし
	 * - border: ボーダー付き
	 * - shadow: 影付き
	 * - gradient: グラデーション背景
	 */
	decoration?: "none" | "border" | "shadow" | "gradient";
	/**
	 * 間隔 - 要素間の空白量
	 * - compact: 狭い間隔
	 * - regular: 標準的な間隔
	 * - spacious: 広い間隔
	 */
	spacing?: "compact" | "regular" | "spacious";
	/**
	 * 配置 - コンテンツの水平方向の位置揃え
	 * - start: 左揃え
	 * - center: 中央揃え
	 * - end: 右揃え
	 */
	alignment?: "start" | "center" | "end";
	/**
	 * ボタン配置 - 複数ボタンの配置方向
	 * - horizontal: 常に横並び
	 * - vertical: 常に縦並び
	 * - responsive: モバイルでは縦、デスクトップでは横並び
	 */
	buttonOrientation?: "horizontal" | "vertical" | "responsive";

	// コンテンツ
	title?: string;
	description?: string;

	// プライマリボタン
	primaryButtonText?: string;
	primaryButtonHref?: string;
	primaryButtonExternal?: boolean;
	primaryButtonVariant?:
		| "default"
		| "secondary"
		| "outline"
		| "ghost"
		| "link"
		| "destructive";
	primaryButtonSize?: "default" | "sm" | "lg" | "icon";
	primaryButtonIcon?: React.ReactNode;
	onPrimaryButtonClick?: () => void;

	// セカンダリボタン
	secondaryButtonText?: string;
	secondaryButtonHref?: string;
	secondaryButtonExternal?: boolean;
	secondaryButtonVariant?:
		| "default"
		| "secondary"
		| "outline"
		| "ghost"
		| "link"
		| "destructive";
	secondaryButtonSize?: "default" | "sm" | "lg" | "icon";
	secondaryButtonIcon?: React.ReactNode;
	onSecondaryButtonClick?: () => void;

	// カスタムスタイリング
	containerWidth?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
	containerPaddingX?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
	containerPaddingY?: "none" | "xs" | "sm" | "md" | "lg" | "xl";

	// 背景設定
	backgroundImage?: string;
	overlayOpacity?: number;

	// 各要素へのクラス指定
	containerClassName?: string;
	contentClassName?: string;
	titleClassName?: string;
	descriptionClassName?: string;
	buttonGroupClassName?: string;
	primaryButtonClassName?: string;
	secondaryButtonClassName?: string;
}

export function CTASection({
	// バリアント
	layout = "horizontal",
	intent = "primary",
	size = "md",
	decoration = "none",
	spacing = "regular",
	alignment = "start",
	buttonOrientation = "responsive",

	// コンテンツ
	title = "今すぐ始めましょう",
	description = "このボイラープレートを使って、モダンなWebアプリケーションの開発をスタートしましょう。詳細なドキュメントとサンプルコードが用意されています。",

	// プライマリボタン
	primaryButtonText = "GitHubで見る",
	primaryButtonHref = "https://github.com/takunagai/nextjs-boilerplate",
	primaryButtonExternal = true,
	primaryButtonVariant = "secondary",
	primaryButtonSize = "lg",
	primaryButtonIcon,
	onPrimaryButtonClick,

	// セカンダリボタン
	secondaryButtonText = "使い方を学ぶ",
	secondaryButtonHref = "/docs/getting-started",
	secondaryButtonExternal = false,
	secondaryButtonVariant = "outline",
	secondaryButtonSize = "lg",
	secondaryButtonIcon,
	onSecondaryButtonClick,

	// カスタムスタイリング
	containerWidth = "2xl",
	containerPaddingX = "lg",
	containerPaddingY = "xl",

	// 背景設定
	backgroundImage,
	overlayOpacity = 0.5,

	// 各要素へのクラス指定
	className,
	containerClassName,
	contentClassName,
	titleClassName,
	descriptionClassName,
	buttonGroupClassName,
	primaryButtonClassName,
	secondaryButtonClassName,

	// その他のprops
	...props
}: CTASectionProps) {
	// カスタム背景スタイル
	const backgroundStyle: React.CSSProperties = {};

	if (backgroundImage) {
		backgroundStyle.backgroundImage = `url(${backgroundImage})`;
		backgroundStyle.backgroundSize = "cover";
		backgroundStyle.backgroundPosition = "center";
	}

	// タイトルのサイズをバリアントに応じて設定
	const titleSizeClasses = {
		sm: "text-2xl md:text-3xl",
		md: "text-3xl md:text-4xl",
		lg: "text-4xl md:text-5xl",
	}[size];

	// 説明文のサイズをバリアントに応じて設定
	const descriptionOpacityClass = "opacity-80";

	// デフォルトのアイコン設定
	const defaultPrimaryIcon = primaryButtonExternal ? (
		<FaArrowUpRightFromSquare className="h-4 w-4" />
	) : (
		<FaArrowRight className="h-4 w-4" />
	);

	const primaryIcon = primaryButtonIcon || defaultPrimaryIcon;

	const defaultSecondaryIcon = secondaryButtonExternal ? (
		<FaArrowUpRightFromSquare className="h-4 w-4" />
	) : undefined;

	const secondaryIcon = secondaryButtonIcon || defaultSecondaryIcon;

	return (
		<section
			className={cn(
				ctaSectionVariants({
					layout,
					intent,
					size,
					decoration,
					spacing,
					alignment,
				}),
				"relative", // position: relativeを追加して子要素のabsoluteポジショニングの基準にする
				className,
			)}
			style={
				Object.keys(backgroundStyle).length > 0 ? backgroundStyle : undefined
			}
			{...props}
		>
			{/* 背景オーバーレイ */}
			{backgroundImage && (
				<div
					className="absolute inset-0 bg-black"
					style={{ opacity: overlayOpacity }}
					aria-hidden="true"
				/>
			)}

			<Container
				width={containerWidth}
				paddingX={containerPaddingX}
				paddingY={containerPaddingY}
				className={cn(
					"relative z-10",
					layout === "horizontal" && "flex flex-col md:flex-row md:items-center md:justify-between md:gap-8",
					layout === "banner" && "flex flex-col items-center text-center",
					containerClassName
				)}
			>
				{/* テキストコンテンツ */}
				<div
					className={cn(ctaContentVariants({ layout, size }), contentClassName)}
				>
					<h2 className={cn("font-bold", titleSizeClasses, titleClassName)}>
						{title}
					</h2>

					{description && (
						<p
							className={cn(
								"text-lg",
								descriptionOpacityClass,
								descriptionClassName,
							)}
						>
							{description}
						</p>
					)}
				</div>

				{/* ボタングループ */}
				{(primaryButtonText || secondaryButtonText) && (
					<div
						className={cn(
							ctaButtonGroupVariants({
								layout,
								alignment,
								orientation: buttonOrientation,
							}),
							buttonGroupClassName,
						)}
					>
						{primaryButtonText && (
							<Button
								variant={primaryButtonVariant}
								size={primaryButtonSize}
								onClick={onPrimaryButtonClick}
								className={cn("gap-2", primaryButtonClassName)}
								asChild={!!primaryButtonHref}
							>
								{primaryButtonHref ? (
									primaryButtonExternal ? (
										<a
											href={primaryButtonHref}
											target="_blank"
											rel="noopener noreferrer"
										>
											{primaryButtonText}
											{primaryIcon && (
												<span aria-hidden="true">{primaryIcon}</span>
											)}
										</a>
									) : (
										<Link href={primaryButtonHref}>
											{primaryButtonText}
											{primaryIcon && (
												<span aria-hidden="true">{primaryIcon}</span>
											)}
										</Link>
									)
								) : (
									<>
										{primaryButtonText}
										{primaryIcon && (
											<span aria-hidden="true">{primaryIcon}</span>
										)}
									</>
								)}
							</Button>
						)}

						{secondaryButtonText && (
							<Button
								variant={secondaryButtonVariant}
								size={secondaryButtonSize}
								onClick={onSecondaryButtonClick}
								className={cn("gap-2", secondaryButtonClassName)}
								asChild={!!secondaryButtonHref}
							>
								{secondaryButtonHref ? (
									secondaryButtonExternal ? (
										<a
											href={secondaryButtonHref}
											target="_blank"
											rel="noopener noreferrer"
										>
											{secondaryButtonText}
											{secondaryIcon && (
												<span aria-hidden="true">{secondaryIcon}</span>
											)}
										</a>
									) : (
										<Link href={secondaryButtonHref}>
											{secondaryButtonText}
											{secondaryIcon && (
												<span aria-hidden="true">{secondaryIcon}</span>
											)}
										</Link>
									)
								) : (
									<>
										{secondaryButtonText}
										{secondaryIcon && (
											<span aria-hidden="true">{secondaryIcon}</span>
										)}
									</>
								)}
							</Button>
						)}
					</div>
				)}
			</Container>
		</section>
	);
}
