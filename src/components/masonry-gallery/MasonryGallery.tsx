import { clsx } from "clsx";
import Image from "next/image";
import React from "react"; // Add React import

import type {
	ColumnsDef,
	ColumnsPerBreakpoint,
	ContainerBreakpointName,
	Photo,
} from "./types";

interface MasonryGalleryProps {
	/**
	 * 表示する写真の配列
	 */
	photos: Photo[];

	/**
	 * 各ブレークポイントでのカラム数設定
	 */
	columns?: ColumnsDef; // Responsive column counts

	/**
	 * カラム間のギャップ (水平方向)
	 * 数値: Tailwindのスケール (例: 4 = 1rem)
	 */
	gap?: number; // Horizontal gap between columns (Tailwind spacing unit, e.g., 4 for 1rem)

	/**
	 * 写真間の垂直方向のギャップ
	 * 数値: Tailwindのスケール (例: 4 = 1rem)
	 */
	vGap?: number; // Vertical gap between items (Tailwind spacing unit, e.g., 4 for 1rem)

	/**
	 * コンテナに追加するクラス名
	 */
	className?: string;

	/**
	 * アイテムに追加するクラス名
	 */
	itemClassName?: string;

	/**
	 * 画像に追加するクラス名
	 */
	imageClassName?: string;

	/**
	 * 画像のロード方法
	 */
	imageLoading?: "eager" | "lazy";
}

// Default props for the gallery
const defaultProps = {
	// Updated to use container query breakpoint names (xs, sm, md, etc.)
	// These values align with Tailwind's default container query sizes.
	// Example: xs:columns-1, sm:columns-2, md:columns-3, lg:columns-4
	columns: {
		default: 1, // Fallback for very small containers or when no specific container query matches
		xs: 1, // @container (width >= 20rem)  ~320px
		sm: 2, // @container (width >= 24rem)  ~384px
		md: 3, // @container (width >= 28rem)  ~448px
		lg: 4, // @container (width >= 32rem)  ~512px
		xl: 5, // @container (width >= 36rem)  ~576px
		"2xl": 6, // @container (width >= 42rem)  ~672px
		"3xl": 6, // @container (width >= 48rem)  ~768px - can keep 6 or increase
		// Add more up to 7xl if needed, e.g., '4xl': 7, '5xl': 8 etc.
	} as ColumnsPerBreakpoint,
	gap: 4, // Default horizontal gap (1rem or 16px corresponds to Tailwind's gap-4)
	vGap: 4, // Default vertical gap (1rem or 16px corresponds to Tailwind's space-4 or p-4)
	imageLoading: "lazy" as "eager" | "lazy",
};

// Utility to build column classes based on the resolved responsive settings
const buildColumnClasses = (config: ColumnsPerBreakpoint): string => {
	const classes: string[] = [];
	const breakpoints: Array<keyof ColumnsPerBreakpoint> = [
		"default",
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
		"2xl",
		"3xl",
		"4xl",
		"5xl",
		"6xl",
		"7xl",
	];

	for (const bp of breakpoints) {
		// Type assertion as bp is a key of ColumnsPerBreakpoint
		const count = config[bp as ContainerBreakpointName | "default"];
		// Ensure count is a valid number before creating a class
		if (typeof count === "number" && count > 0) {
			if (bp === "default") {
				classes.push(`columns-${count}`);
			} else {
				// コンテナクエリのクラス名から '@' を削除
				classes.push(`${String(bp)}:columns-${count}`); // Explicitly cast bp to string
			}
		}
	}
	return classes.join(" ");
};

/**
 * Masonryレイアウトのギャラリーコンポーネント
 * CSS columns プロパティを使用したサーバーコンポーネント
 */
export default function MasonryGallery({
	photos,
	columns: columnsProp,
	gap: gapProp,
	vGap: vGapProp,
	className,
	itemClassName,
	imageClassName,
	imageLoading: imageLoadingProp,
}: MasonryGalleryProps) {
	// 最終的なカラム設定を解決
	let finalColumnsConfig: ColumnsPerBreakpoint;

	if (columnsProp === undefined) {
		finalColumnsConfig = defaultProps.columns;
	} else if (typeof columnsProp === "number") {
		// columnsPropが数値の場合、それをdefaultとして使用し他のデフォルトブレークポイント値とマージ
		finalColumnsConfig = { ...defaultProps.columns, default: columnsProp };
	} else {
		// columnsPropがオブジェクトの場合、defaultProps.columnsとマージ (nullでないことも暗黙的にチェックされる)
		finalColumnsConfig = {
			...defaultProps.columns,
			...columnsProp, // columnsProp is ColumnsPerBreakpoint here
		};
	}

	const currentGap = gapProp ?? defaultProps.gap;
	const currentVGap = vGapProp ?? defaultProps.vGap;
	const imageLoading = imageLoadingProp ?? defaultProps.imageLoading;

	const columnClasses = buildColumnClasses(finalColumnsConfig);
	const gapClass = `gap-x-${currentGap}`; // For column-gap (Tailwind class)

	// vGapをrem単位で計算（Tailwindのspacing unit 1 = 0.25remを想定）
	const vGapInRem = currentVGap / 4;

	if (!photos || photos.length === 0) {
		return <p>No photos to display.</p>;
	}

	return (
		<section
			aria-label="Masonry Gallery"
			className={clsx("@container", className)}
		>
			<ul
				className={clsx("list-none p-0 m-0", columnClasses, gapClass)}
				style={
					{
						"--v-gap": `${vGapInRem}rem`, // 垂直方向ギャップのためのCSS変数
					} as React.CSSProperties
				}
			>
				{photos.map((photo, index) => (
					<li
						key={photo.id || index}
						className={clsx(
							"pb-[var(--v-gap)]", // Use the CSS variable for padding-bottom
							"break-inside-avoid-column", // Prevent items from breaking across columns
							itemClassName,
						)}
					>
						<figure className="relative w-full overflow-hidden rounded-xs">
							<Image
								src={photo.src}
								alt={photo.alt || `Gallery image ${index + 1}`}
								width={photo.width}
								height={photo.height}
								placeholder={photo.blurDataURL ? "blur" : undefined}
								blurDataURL={photo.blurDataURL}
								className={clsx(
									"block h-auto w-full object-cover",
									imageClassName,
								)}
								loading={imageLoading}
								quality={75}
								sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
								style={{
									aspectRatio: photo.width / photo.height,
								}}
							/>
							{photo.title && (
								<figcaption className="absolute bottom-0 left-0 w-full bg-black/50 p-2 text-xs text-white">
									{photo.title}
								</figcaption>
							)}
						</figure>
					</li>
				))}
			</ul>
		</section>
	);
}
