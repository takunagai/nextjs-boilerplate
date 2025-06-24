"use client";

import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import type { AutoplayOptionsType } from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { cn } from "@/lib/utils";

// 型定義
export interface EmblaCarouselProps {
	options?: EmblaOptionsType;
	autoplayOptions?: AutoplayOptionsType;
	slides: {
		src: string;
		alt: string;
	}[];
	showNavigation?: boolean;
	showDots?: boolean;
	className?: string;
	useFade?: boolean;
	dotsPosition?: "inside" | "outside";
	variant?: "default" | "peek";
}

export function EmblaCarousel({
	options = { loop: true },
	autoplayOptions = { delay: 5000, stopOnInteraction: false },
	slides,
	showNavigation = true,
	showDots = true,
	className,
	useFade = true,
	dotsPosition = "outside",
	variant = "default",
}: EmblaCarouselProps) {
	// Class Names プラグインの設定
	const classNamesOptions = {
		selected: "embla-slide-selected",
		draggable: "embla-draggable",
		dragging: "embla-dragging",
		// 前後のスライドにも特別なクラスを設定
		prevSlide: "embla-slide-prev",
		nextSlide: "embla-slide-next",
	};

	// プラグインを設定
	const plugins = [ClassNames(classNamesOptions), Autoplay(autoplayOptions)];

	// フェードエフェクトを条件付きで追加
	if (useFade) {
		plugins.push(Fade());
	}

	// Emblaカルーセルのフック
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			...options,
			watchDrag: true,
			...(variant === "peek" && { align: "center", containScroll: false }),
		},
		plugins,
	);

	// 状態管理
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

	// スクロールスナップの設定
	const onSelect = () => {
		if (!emblaApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
		setPrevBtnEnabled(emblaApi.canScrollPrev());
		setNextBtnEnabled(emblaApi.canScrollNext());
	};

	// 前のスライドへ
	const scrollPrev = () => {
		emblaApi?.scrollPrev();
	};

	// 次のスライドへ
	const scrollNext = () => {
		emblaApi?.scrollNext();
	};

	// ドットクリックでのスライド移動
	const scrollTo = (index: number) => emblaApi?.scrollTo(index);

	// 初期化とクリーンアップ
	useEffect(() => {
		if (!emblaApi) return;

		onSelect();
		setScrollSnaps(emblaApi.scrollSnapList());
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);

		return () => {
			emblaApi.off("select", onSelect);
			emblaApi.off("reInit", onSelect);
		};
	}, [emblaApi]);

	// ドットインジケーターのレンダリング
	const renderDots = () => (
		<div
			className={cn(
				"flex justify-center gap-2",
				dotsPosition === "outside"
					? "mt-4"
					: "absolute bottom-4 left-0 right-0 z-10",
			)}
		>
			{scrollSnaps.map((_, index) => (
				<button
					type="button"
					key={`dot-nav-${scrollSnaps[index]}`}
					onClick={() => scrollTo(index)}
					className={cn(
						"h-2 w-2 rounded-full transition-all",
						selectedIndex === index
							? "bg-gray-800 w-4"
							: dotsPosition === "inside"
								? "bg-white/70 hover:bg-white"
								: "bg-gray-300 hover:bg-gray-400",
					)}
					aria-label={`スライド${index + 1}へ移動`}
				/>
			))}
		</div>
	);

	return (
		<div className={cn("relative overflow-hidden", className)}>
			<div
				ref={emblaRef}
				className={cn("overflow-hidden", variant === "peek" && "px-4 sm:px-6")}
			>
				<div
					className={cn(
						"flex touch-pan-y",
						variant === "default" && "-ml-4",
						useFade ? "embla-fade-container" : "",
					)}
				>
					{slides.map((slide, index) => (
						<div
							className={cn(
								"relative",
								variant === "default"
									? "flex-[0_0_100%] min-w-0 pl-4"
									: "flex-[0_0_70%] min-w-0 mx-2",
								useFade ? "embla-fade-target" : "",
							)}
							key={`slide-${slide.src}-${index}`}
						>
							<div className="relative overflow-hidden aspect-[16/9] rounded-lg">
								<Image
									src={slide.src}
									alt={slide.alt}
									fill
									className="absolute inset-0 h-full w-full object-cover"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
									priority={index === 0}
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* ナビゲーションボタン */}
			{showNavigation && (
				<>
					<button
						type="button"
						onClick={scrollPrev}
						disabled={!prevBtnEnabled}
						aria-label="前のスライドへ"
						className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-opacity duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
					>
						<FaChevronLeft className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={scrollNext}
						disabled={!nextBtnEnabled}
						aria-label="次のスライドへ"
						className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-opacity duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
					>
						<FaChevronRight className="h-4 w-4" />
					</button>
				</>
			)}

			{/* ドットインジケーター */}
			{showDots && renderDots()}

			{/* Class Names プラグイン用のスタイル */}
			{variant === "peek" && (
				<style jsx global>{`
          .embla-slide-prev,
          .embla-slide-next {
            opacity: 0.5;
            transform: scale(0.95);
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          .embla-slide-selected {
            opacity: 1;
            transform: scale(1);
            z-index: 1;
          }
          .embla-draggable {
            cursor: grab;
          }
          .embla-dragging {
            cursor: grabbing;
          }
        `}</style>
			)}
		</div>
	);
}
