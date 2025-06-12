import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ContentCard } from "./content-card";
import { ContentPanel } from "./content-panel";
import { ContentSimple } from "./content-simple";

// 基本的なコンテンツアイテムの型定義
export interface ContentItem {
	id: string;
	title: string;
	description?: string;
	imageUrl?: string;
	icon?: ReactNode;
	// 追加のカスタムデータを許可
	[key: string]: string | number | boolean | ReactNode | undefined;
}

// コンテンツアイテムのバリアント
export const contentItemsVariants = cva("", {
	variants: {
		layout: {
			grid: "grid",
			list: "flex flex-col",
			carousel: "relative",
			masonry: "columns-1 sm:columns-2 md:columns-3",
		},
		columns: {
			1: "grid-cols-1",
			2: "grid-cols-1 sm:grid-cols-2",
			3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
			4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
			5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
			6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
		},
		gap: {
			none: "gap-0",
			small: "gap-2",
			medium: "gap-4",
			large: "gap-6",
		},
	},
	defaultVariants: {
		layout: "grid",
		columns: 3,
		gap: "medium",
	},
	compoundVariants: [
		{
			layout: ["list", "carousel", "masonry"],
			columns: [1, 2, 3, 4, 5, 6],
			class: "grid-cols-none",
		},
	],
});

// カードバリアント定義（ContentCardでも使用）
export const contentCardVariants = cva(
	"overflow-hidden rounded-lg bg-background hover:shadow-md transition-shadow",
	{
		variants: {
			imagePosition: {
				top: "flex flex-col",
				bottom: "flex flex-col-reverse",
				left: "flex flex-col md:flex-row",
				right: "flex flex-col md:flex-row-reverse",
			},
			isReversed: {
				true: "",
				false: "",
			},
		},
		defaultVariants: {
			imagePosition: "top",
			isReversed: false,
		},
	},
);

// 画像バリアント定義（ContentCardでも使用）
export const imageVariants = cva("relative", {
	variants: {
		aspectRatio: {
			square: "aspect-square",
			portrait: "aspect-[2/3]",
			landscape: "aspect-[16/9]",
			auto: "h-auto",
		},
		imagePosition: {
			top: "w-full",
			bottom: "w-full",
			left: "md:w-1/2 h-full",
			right: "md:w-1/2 h-full",
		},
	},
	defaultVariants: {
		aspectRatio: "landscape",
		imagePosition: "top",
	},
});

export interface ContentItemsProps
	extends VariantProps<typeof contentItemsVariants> {
	items: ContentItem[];
	variant?: "card" | "panel" | "simple";
	aspectRatio?: "square" | "portrait" | "landscape" | "auto";
	className?: string;
	imagePosition?: "top" | "bottom" | "left" | "right";
	renderItem?: (item: ContentItem, index: number) => ReactNode;
}

// サーバーコンポーネントとして定義
export const ContentItems = ({
	items,
	layout = "grid",
	columns = 3,
	gap = "medium",
	variant = "card",
	aspectRatio = "landscape",
	className,
	imagePosition = "top",
	renderItem,
}: ContentItemsProps) => {
	// cvaを使用してコンテナクラスを生成
	const containerClass = cn(
		contentItemsVariants({ layout, columns, gap }),
		className,
	);

	// レイアウトごとの子要素のクラス
	const getItemClassName = () => {
		if (layout === "carousel") {
			return "flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-1rem)] md:w-[calc(33.333%-1rem)] lg:w-80 snap-start h-full";
		}
		if (layout === "masonry") {
			return "break-inside-avoid mb-4";
		}
		return "";
	};

	const itemClassName = getItemClassName();

	// カルーセルレイアウトの場合の特別な処理
	if (layout === "carousel") {
		return (
			<div className={containerClass}>
				{/* スクロールインジケーター（左） */}
				<div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-background to-transparent md:w-24" />

				{/* カルーセルコンテナ */}
				<div
					className={cn(
						"flex overflow-x-auto snap-x snap-mandatory scrollbar-hide",
						gap === "small" && "gap-2",
						gap === "medium" && "gap-4",
						gap === "large" && "gap-6",
						"pb-4 px-4 sm:px-6 lg:px-8 -mx-4 sm:-mx-6 lg:-mx-8",
					)}
				>
					{/* 左側のパディング用の空要素 */}
					<div className="flex-shrink-0 w-0" />

					{items.map((item, index) => {
						// カスタムレンダリング関数が提供されている場合はそれを使用
						if (renderItem) {
							return (
								<div key={item.id} className={itemClassName}>
									{renderItem(item, index)}
								</div>
							);
						}

						// デフォルトのレンダリング
						const content = (() => {
							if (variant === "card") {
								return (
									<ContentCard
										key={item.id}
										item={item}
										aspectRatio={aspectRatio}
										imagePosition={imagePosition}
										isReversed={false}
									/>
								);
							}

							if (variant === "panel") {
								return (
									<ContentPanel
										key={item.id}
										item={item}
										aspectRatio={aspectRatio}
										isReversed={false}
									/>
								);
							}

							return (
								<ContentSimple key={item.id} item={item} isReversed={false} />
							);
						})();

						return (
							<div key={item.id} className={itemClassName}>
								{content}
							</div>
						);
					})}

					{/* 右側のパディング用の空要素 */}
					<div className="flex-shrink-0 w-4 sm:w-6 lg:w-8" />
				</div>

				{/* スクロールインジケーター（右） */}
				<div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent md:w-24" />
			</div>
		);
	}

	// その他のレイアウトの処理
	return (
		<div className={containerClass}>
			{items.map((item, index) => {
				// カスタムレンダリング関数が提供されている場合はそれを使用
				if (renderItem) {
					return renderItem(item, index);
				}

				// デフォルトのレンダリング
				const content = (() => {
					if (variant === "card") {
						return (
							<ContentCard
								key={item.id}
								item={item}
								aspectRatio={aspectRatio}
								imagePosition={imagePosition}
								isReversed={index % 2 === 1 && imagePosition === "left"}
							/>
						);
					}

					if (variant === "panel") {
						return (
							<ContentPanel
								key={item.id}
								item={item}
								aspectRatio={aspectRatio}
								isReversed={index % 2 === 1}
							/>
						);
					}

					return (
						<ContentSimple
							key={item.id}
							item={item}
							isReversed={index % 2 === 1}
						/>
					);
				})();

				// マスリーレイアウトの場合はdivでラップ
				if (layout === "masonry") {
					return (
						<div key={item.id} className={itemClassName}>
							{content}
						</div>
					);
				}

				return content;
			})}
		</div>
	);
};

// サブコンポーネントのエクスポート
export * from "./content-card";
export * from "./content-panel";
export * from "./content-simple";
