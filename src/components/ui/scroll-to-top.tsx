"use client";

import * as React from "react";
import { FaChevronUp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ScrollToTopProps extends React.HTMLAttributes<HTMLButtonElement> {
	/**
	 * スクロールトップボタンが表示されるスクロール位置のしきい値（ビューポートの高さに対する割合）
	 * @default 1.0 (ビューポートの高さと同じ)
	 */
	threshold?: number;
	/**
	 * スクロールのスムーズさを制御
	 * @default "smooth"
	 */
	behavior?: ScrollBehavior;
}

export function ScrollToTop({
	className,
	threshold = 1.0,
	behavior = "smooth",
	...props
}: ScrollToTopProps) {
	const [visible, setVisible] = React.useState(false);
	const rafRef = React.useRef<number | null>(null);

	// スクロール位置を監視し、表示/非表示を切り替える（RAFスロットル）
	React.useEffect(() => {
		const handleScroll = () => {
			if (rafRef.current !== null) return;
			rafRef.current = requestAnimationFrame(() => {
				const scrollThreshold = window.innerHeight * threshold;
				setVisible(window.scrollY > scrollThreshold);
				rafRef.current = null;
			});
		};

		// 初期チェック
		handleScroll();

		// スクロールイベントリスナーを追加
		window.addEventListener("scroll", handleScroll, { passive: true });

		// クリーンアップ
		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (rafRef.current !== null) {
				cancelAnimationFrame(rafRef.current);
			}
		};
	}, [threshold]);

	// トップにスクロールする関数
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: behavior,
		});
	};

	return (
		<Button
			variant="secondary"
			size="icon"
			className={cn(
				"fixed bottom-6 right-6 z-50 rounded-full shadow-md transition-all duration-300",
				visible
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-10 pointer-events-none",
				className,
			)}
			onClick={scrollToTop}
			aria-label="ページトップへスクロール"
			{...props}
		>
			<FaChevronUp className="h-5 w-5" />
		</Button>
	);
}
