"use client";

import { type VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import {
	type KeyboardEvent as ReactKeyboardEvent,
	useCallback,
	useEffect,
	useState,
} from "react";

import { cn } from "@/lib/utils";
import { GalleryLightbox } from "./gallery-lightbox";

// ギャラリーアイテムの型定義
export interface GalleryItem {
	id: string | number;
	src: string;
	alt: string;
	title?: string;
	description?: string;
	width?: number;
	height?: number;
}

// ギャラリーコンテナのスタイル
const galleryStyles = cva("w-full", {
	variants: {
		columns: {
			"1": "grid-cols-1",
			"2": "grid-cols-2",
			"3": "grid-cols-3",
			"4": "grid-cols-4",
			"5": "grid-cols-5",
			responsive: "grid-cols-2 md:grid-cols-3",
			responsive2: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
		},
		gap: {
			none: "gap-0",
			sm: "gap-2",
			md: "gap-4",
			lg: "gap-6",
		},
		layout: {
			grid: "grid",
			masonry: "", // masonryレイアウトはJSで制御
		},
	},
	defaultVariants: {
		columns: "responsive",
		gap: "md",
		layout: "grid",
	},
});

// ギャラリーアイテムのスタイル
const itemStyles = cva(
	"relative overflow-hidden transition-all duration-300 ease-in-out",
	{
		variants: {
			rounded: {
				none: "rounded-none",
				sm: "rounded",
				md: "rounded-md",
				lg: "rounded-lg",
			},
			shadow: {
				none: "shadow-none",
				sm: "shadow-sm",
				md: "shadow",
				lg: "shadow-lg",
			},
			hoverEffect: {
				none: "",
				zoom: "hover:scale-[1.02]",
				fadeIn: "hover:brightness-110",
			},
			aspectRatio: {
				auto: "aspect-auto",
				square: "aspect-square",
				landscape: "aspect-video",
				portrait: "aspect-[3/4]",
			},
		},
		defaultVariants: {
			rounded: "sm",
			shadow: "none",
			hoverEffect: "fadeIn",
			aspectRatio: "auto",
		},
	},
);

// キャプションスタイル
const captionStyles = cva("", {
	variants: {
		captionPosition: {
			below: "p-3 bg-white dark:bg-gray-900",
			overlay: "absolute bottom-0 left-0 right-0 p-3",
		},
		captionStyle: {
			simple: "bg-white dark:bg-gray-900",
			gradient: "bg-gradient-to-t from-black/70 to-transparent text-white",
			solid: "bg-black/60 text-white",
		},
	},
	defaultVariants: {
		captionPosition: "below",
		captionStyle: "simple",
	},
});

export interface GalleryProps
	extends VariantProps<typeof galleryStyles>,
		VariantProps<typeof itemStyles>,
		VariantProps<typeof captionStyles> {
	items: GalleryItem[];
	className?: string;
	lightbox?: boolean;
	layout?: "grid" | "masonry";
	aspectRatio?: "auto" | "square" | "landscape" | "portrait";
	rounded?: "none" | "sm" | "md" | "lg";
	shadow?: "none" | "sm" | "md" | "lg";
	hoverEffect?: "none" | "zoom" | "fadeIn";
	captionPosition?: "below" | "overlay";
	captionStyle?: "simple" | "gradient" | "solid";
}

export function Gallery({
	items,
	className,
	columns = "responsive",
	gap = "md",
	layout = "grid",
	rounded = "md",
	shadow = "none",
	hoverEffect = "zoom",
	aspectRatio = "auto",
	captionPosition = "below",
	captionStyle = "simple",
	lightbox = true,
}: GalleryProps) {
	// 選択された画像の状態
	const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const handleImageClick = useCallback(
		(item: GalleryItem) => {
			if (lightbox) {
				const index = items.findIndex((i) => i.id === item.id);
				setCurrentIndex(index !== -1 ? index : 0);
				setSelectedImage(item);
			}
		},
		[lightbox, items],
	);

	const closeModal = useCallback(() => {
		setSelectedImage(null);
	}, []);

	const goToPrevious = useCallback(() => {
		if (items.length <= 1) return;

		const newIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
		setSelectedImage(items[newIndex]);
	}, [currentIndex, items]);

	const goToNext = useCallback(() => {
		if (items.length <= 1) return;

		const newIndex = currentIndex >= items.length - 1 ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
		setSelectedImage(items[newIndex]);
	}, [currentIndex, items]);

	const handleModalKeyDown = useCallback(
		(e: ReactKeyboardEvent<HTMLElement> | KeyboardEvent) => {
			if (e.key === "Escape") {
				closeModal();
			} else if (e.key === "ArrowLeft") {
				goToPrevious();
			} else if (e.key === "ArrowRight") {
				goToNext();
			}
		},
		[closeModal, goToPrevious, goToNext],
	);

	useEffect(() => {
		if (selectedImage) {
			const handleKeyDown = (e: KeyboardEvent) => {
				handleModalKeyDown(e);
			};
			window.addEventListener("keydown", handleKeyDown);
			return () => {
				window.removeEventListener("keydown", handleKeyDown);
			};
		}
		return undefined;
	}, [selectedImage, handleModalKeyDown]);

	const masonryStyle =
		layout === "masonry"
			? {
					columnCount: typeof columns === "number" ? columns : 3,
					columnGap: gap === "none" ? 0 : 16,
				}
			: {};

	const handleKeyDown = useCallback(
		(e: ReactKeyboardEvent<HTMLElement>, item: GalleryItem) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				handleImageClick(item);
			}
		},
		[handleImageClick],
	);

	return (
		<>
			{/* ギャラリーグリッド */}
			<section
				className={cn(
					layout === "grid" ? galleryStyles({ columns, gap, layout }) : "",
					layout === "masonry" ? "w-full" : "",
					className,
				)}
				style={layout === "masonry" ? masonryStyle : {}}
				aria-label="画像ギャラリー"
			>
				{items.map((item) => (
					<figure
						key={item.id}
						className={cn(
							itemStyles({ rounded, shadow, hoverEffect, aspectRatio }),
							lightbox && "cursor-pointer",
							layout === "masonry" && "mb-4 break-inside-avoid",
						)}
						onClick={() => handleImageClick(item)}
						onKeyDown={(e) => handleKeyDown(e, item)}
						tabIndex={lightbox ? 0 : -1}
						role={lightbox ? "button" : undefined}
						aria-label={lightbox ? `${item.alt}（拡大表示）` : undefined}
					>
						{/* 画像 */}
						<div className="relative overflow-hidden w-full h-full">
							{item.width && item.height ? (
								<Image
									src={item.src}
									alt={item.alt}
									width={item.width}
									height={item.height}
									className={cn(
										"w-full h-full object-cover",
										aspectRatio === "auto" ? "aspect-auto" : "",
									)}
								/>
							) : (
								<Image
									src={item.src}
									alt={item.alt}
									width={800}
									height={600}
									className={cn(
										"w-full h-full object-cover",
										aspectRatio === "auto" ? "aspect-auto" : "",
									)}
									sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
								/>
							)}
						</div>

						{/* タイトルと説明（存在する場合） */}
						{(item.title || item.description) && (
							<div
								className={cn(captionStyles({ captionPosition, captionStyle }))}
							>
								{item.title && (
									<h3 className="text-lg font-semibold mb-1">{item.title}</h3>
								)}
								{item.description && (
									<p className="text-sm opacity-90">{item.description}</p>
								)}
							</div>
						)}
					</figure>
				))}
			</section>

			{lightbox && (
				<GalleryLightbox
					isOpen={!!selectedImage}
					currentImage={selectedImage}
					images={items}
					currentIndex={currentIndex}
					onClose={closeModal}
					onPrevious={goToPrevious}
					onNext={goToNext}
					onKeyDown={handleModalKeyDown}
				/>
			)}
		</>
	);
}

export default Gallery;
