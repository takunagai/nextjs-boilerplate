"use client";

import type { ReactNode } from "react";
import { useHeroHeight } from "@/hooks/use-hero-height";
import { cn } from "@/lib/utils";
import type { BaseHeroProps } from "@/types/hero";

// ヒーローコンテナーのプロパティ型定義
export interface HeroContainerProps extends BaseHeroProps {
	children: ReactNode;
}

/**
 * ヒーローセクション用の共通コンテナーコンポーネント
 * 高さ計算、背景装飾、レイアウトを統一管理
 */
export function HeroContainer({
	children,
	className,
	backgroundGradient = "from-primary/10 via-primary/5 to-background",
	showDecorations = true,
	decorationColors = {
		primary: "bg-primary/10",
		secondary: "bg-primary/20",
	},
}: HeroContainerProps) {
	const { heroStyle } = useHeroHeight();

	return (
		<section
			className={cn(
				"relative w-full flex items-center overflow-hidden",
				`bg-gradient-to-br ${backgroundGradient}`,
				className,
			)}
			style={heroStyle}
		>
			{/* 背景装飾パターン */}
			{showDecorations && (
				<>
					<div className="absolute inset-0 bg-grid-pattern opacity-5" />
					<div
						className={cn(
							"absolute top-20 right-20 w-72 h-72 rounded-full blur-3xl opacity-60",
							decorationColors.primary,
						)}
					/>
					<div
						className={cn(
							"absolute bottom-20 left-20 w-60 h-60 rounded-full blur-3xl opacity-40",
							decorationColors.secondary,
						)}
					/>
				</>
			)}

			{/* コンテンツエリア */}
			<div className="relative z-10 w-full">{children}</div>
		</section>
	);
}
