/**
 * Header のスタイル計算フック
 * 複雑なスタイル計算ロジックを分離してパフォーマンス向上を図る
 */
import { useMemo } from "react";

export interface UseHeaderStylesOptions {
	background?: "default" | "primary" | "secondary" | "transparent";
	isAtTop: boolean;
	hideOnScroll: boolean;
	shouldHide: boolean;
	scrollDirection: "up" | "down" | null;
}

export interface UseHeaderStylesReturn {
	transparentBackground: boolean;
	scrolledClass: string;
	scrollAnimationClass: string;
	scrollDirectionEffect: string;
}

/**
 * Header のスタイル計算フック
 */
export function useHeaderStyles({
	background = "default",
	isAtTop,
	hideOnScroll,
	shouldHide,
	scrollDirection,
}: UseHeaderStylesOptions): UseHeaderStylesReturn {
	// 背景透過の判定（メモ化）
	const transparentBackground = useMemo(
		() => isAtTop && background === "transparent",
		[isAtTop, background],
	);

	// スクロール時の背景効果（メモ化）
	const scrolledClass = useMemo(
		() =>
			!isAtTop && !transparentBackground
				? "bg-background/90 backdrop-blur-sm shadow-sm"
				: "",
		[isAtTop, transparentBackground],
	);

	// スクロール方向に基づくアニメーションクラス（メモ化）
	const scrollAnimationClass = useMemo(() => {
		if (!hideOnScroll) return "translate-y-0";

		if (shouldHide) {
			return "-translate-y-full";
		}

		return "translate-y-0";
	}, [hideOnScroll, shouldHide]);

	// スクロール方向に応じたアニメーション効果（メモ化）
	const scrollDirectionEffect = useMemo(() => {
		if (!hideOnScroll) return "";

		// 上方向スクロール時は早めに表示
		if (scrollDirection === "up") {
			return "ease-out duration-200";
		}

		// 下方向スクロール時はゆっくり隠す
		if (scrollDirection === "down" && !isAtTop) {
			return "ease-in duration-300";
		}

		return "";
	}, [hideOnScroll, scrollDirection, isAtTop]);

	return {
		transparentBackground,
		scrolledClass,
		scrollAnimationClass,
		scrollDirectionEffect,
	};
}
