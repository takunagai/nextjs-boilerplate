import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { FeatureSplit } from "./feature-split";
import { FeatureOverlay } from "./feature-overlay";
import { FeatureSimple } from "./feature-simple";
import { HeadingLevel } from "./components";

// 基本的な特徴アイテムの型定義
export interface FeatureItem {
	id: string;
	title: string;
	description?: string;
	imageUrl?: string;
	icon?: ReactNode;
	buttonText?: string;
	buttonUrl?: string;
	// 追加のカスタムデータを許可
	[key: string]: string | number | boolean | ReactNode | undefined;
}

// 特徴アイテムのバリアント
export const featureItemsVariants = cva("w-full", {
	variants: {
		layout: {
			vertical: "flex flex-col gap-16 py-8",
			horizontal:
				"flex flex-col md:flex-row gap-8 items-center justify-between py-8",
		},
		background: {
			none: "",
			light: "bg-secondary/20",
			dark: "bg-primary/5",
		},
		spacing: {
			none: "gap-0",
			small: "gap-8",
			medium: "gap-16",
			large: "gap-24",
		},
	},
	defaultVariants: {
		layout: "vertical",
		background: "none",
		spacing: "medium",
	},
});

export interface FeatureItemsProps
	extends VariantProps<typeof featureItemsVariants> {
	items: FeatureItem[];
	variant?: "split" | "overlay" | "simple";
	className?: string;
	alternateLayout?: boolean;
	overlayStyle?: "dark" | "light" | "gradient";
	overlayHeight?: "auto" | "full" | "half" | "third";
	renderItem?: (item: FeatureItem, index: number) => ReactNode;
	// 新しいスタイリングプロパティ
	headingLevel?: HeadingLevel;
	headingClassName?: string;
	descriptionClassName?: string;
	// 新しい追加スタイリングプロパティ
	iconClassName?: string;
	buttonClassName?: string;
	imageClassName?: string;
	imageContainerClassName?: string;
	// 文字ブロック全体に適用するクラス
	contentBlockClassName?: string;
}

// サーバーコンポーネントとして定義
export const FeatureItems = ({
	items,
	layout = "vertical",
	background = "none",
	spacing = "medium",
	variant = "split",
	className,
	alternateLayout = true,
	overlayStyle = "dark",
	overlayHeight,
	renderItem,
	// 新しいスタイリングプロパティ
	headingLevel,
	headingClassName,
	descriptionClassName,
	// 新しい追加スタイリングプロパティ
	iconClassName,
	buttonClassName,
	imageClassName,
	imageContainerClassName,
	// 文字ブロック全体に適用するクラス
	contentBlockClassName,
}: FeatureItemsProps) => {
	// cvaを使用してコンテナクラスを生成
	const containerClass = cn(
		featureItemsVariants({ layout, background, spacing }),
		className,
	);

	return (
		<div className={containerClass}>
			{items.map((item, index) => {
				// カスタムレンダリング関数が提供されている場合はそれを使用
				if (renderItem) {
					return renderItem(item, index);
				}

				// アイテムが偶数か奇数かに基づいて反転するかどうかを決定
				const isItemReversed = alternateLayout ? index % 2 === 1 : false;

				// デフォルトのレンダリング
				switch (variant) {
					case "overlay":
						return (
							<FeatureOverlay
								key={item.id}
								item={item}
								overlayStyle={overlayStyle}
								overlayHeight={overlayHeight}
								headingLevel={headingLevel}
								headingClassName={headingClassName}
								descriptionClassName={descriptionClassName}
								iconClassName={iconClassName}
								buttonClassName={buttonClassName}
								imageClassName={imageClassName}
								imageContainerClassName={imageContainerClassName}
								contentBlockClassName={contentBlockClassName}
							/>
						);
					case "simple":
						return (
							<FeatureSimple
								key={item.id}
								item={item}
								headingLevel={headingLevel}
								headingClassName={headingClassName}
								descriptionClassName={descriptionClassName}
								iconClassName={iconClassName}
								buttonClassName={buttonClassName}
								imageClassName={imageClassName}
								imageContainerClassName={imageContainerClassName}
								contentBlockClassName={contentBlockClassName}
							/>
						);
					default:
						// デフォルトはsplitバリアント
						return (
							<FeatureSplit
								key={item.id}
								item={item}
								isReversed={isItemReversed}
								headingLevel={headingLevel}
								headingClassName={headingClassName}
								descriptionClassName={descriptionClassName}
								iconClassName={iconClassName}
								buttonClassName={buttonClassName}
								imageClassName={imageClassName}
								imageContainerClassName={imageContainerClassName}
								contentBlockClassName={contentBlockClassName}
							/>
						);
				}
			})}
		</div>
	);
};

// サブコンポーネントは個別にインポートすることで循環参照を防ぐ
// export * from "./feature-split"; - 循環参照を防ぐために削除

// 明示的にコンポーネントをエクスポート
export { FeatureSplit, FeatureOverlay, FeatureSimple };
