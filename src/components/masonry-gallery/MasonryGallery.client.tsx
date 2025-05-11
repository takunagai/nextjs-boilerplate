"use client";

import MasonryGallery from "./MasonryGallery";
import type { ColumnsDef, Photo } from "./types";

// クライアントコンポーネントの引数
interface ClientMasonryGalleryProps {
	photos: Photo[];
	columns?: ColumnsDef; // 新しい型定義を使用（number | ColumnsPerBreakpoint）
	gap?: number;
	vGap?: number;
	className?: string;
	itemClassName?: string;
	imageClassName?: string;
	imageLoading?: "eager" | "lazy";

	// クライアント側でのみ使用可能なProps
	onPhotoClick?: (photo: Photo, index: number) => void;
}

/**
 * MasonryGalleryのクライアントコンポーネントラッパー
 * クリックイベントなどのインタラクティブ機能を追加する場合に使用
 */
export default function ClientMasonryGallery({
	photos,
	columns,
	gap,
	vGap,
	className,
	itemClassName,
	imageClassName,
	imageLoading,
	onPhotoClick,
}: ClientMasonryGalleryProps) {
	// クリックハンドラがある場合はここで処理を追加
	const handlePhotoClick = onPhotoClick
		? (photo: Photo, index: number) => {
				onPhotoClick(photo, index);
			}
		: undefined;

	return (
		<MasonryGallery
			photos={photos}
			columns={columns}
			gap={gap}
			vGap={vGap}
			className={className}
			itemClassName={itemClassName}
			imageClassName={imageClassName}
			imageLoading={imageLoading}
		/>
	);
}
