"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";

type AnimatedItem = string;
type AnimatedItemSet = AnimatedItem[];
type AnimatedItemData = AnimatedItem[] | AnimatedItemSet[];

interface AnimatedItemListProps {
	// 必須: 項目データ
	items: AnimatedItemData;

	// アニメーション制御
	intervalSeconds?: number; // 切り替え間隔（デフォルト: 5）
	animationDuration?: number; // フリップ時間（デフォルト: 0.6）
	staggerDelay?: number; // 時差間隔（デフォルト: 0.1）

	// 表示設定
	showIcon?: boolean; // アイコン表示（デフォルト: true）
	icon?: React.ComponentType<{ className?: string }> | React.ReactElement;

	// インジゲーター制御
	showIndicator?: boolean; // インジゲーター表示（デフォルト: false）
	indicatorPosition?: "top" | "bottom"; // 配置位置（デフォルト: 'bottom'）
	indicatorClassName?: string; // インジゲータースタイル
	enableManualSwitch?: boolean; // 手動切り替え（デフォルト: true）
	onSetChange?: (index: number) => void; // 切り替えコールバック

	// スタイリング
	className?: string; // コンテナスタイル
	itemClassName?: string; // 各項目スタイル
	iconClassName?: string; // アイコンスタイル
	textClassName?: string; // テキストスタイル

	// 高度なカスタマイゼーション
	renderItem?: (
		item: string,
		index: number,
		isPlaceholder: boolean,
	) => React.ReactNode;
}

function isNestedArray(data: AnimatedItemData): data is AnimatedItemSet[] {
	return Array.isArray(data[0]);
}

export function AnimatedItemList({
	items,
	intervalSeconds = 5,
	animationDuration = 0.6,
	staggerDelay = 0.1,
	showIcon = true,
	icon: IconComponent = FaCheck,
	showIndicator = false,
	indicatorPosition = "bottom",
	indicatorClassName = "",
	enableManualSwitch = true,
	onSetChange,
	className = "space-y-4",
	itemClassName = "flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow",
	iconClassName = "w-3 h-3 text-primary",
	textClassName = "text-muted-foreground flex-1",
	renderItem,
}: AnimatedItemListProps) {
	const [currentSetIndex, setCurrentSetIndex] = useState(0);
	const [isFlipping, setIsFlipping] = useState(false);
	const [animationKey, setAnimationKey] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const isAnimated = isNestedArray(items);
	const currentItems = isAnimated ? items[currentSetIndex] : items;

	// インジゲーター表示判定
	const shouldShowIndicator = isAnimated && showIndicator && items.length > 1;

	// 自動切り替えタイマー開始関数
	const startAutoSwitching = useCallback(() => {
		if (!isAnimated || items.length <= 1) return;

		intervalRef.current = setInterval(() => {
			setIsFlipping(true);
			setAnimationKey((prev) => prev + 1);

			setTimeout(
				() => {
					setCurrentSetIndex((prev) =>
						prev >= items.length - 1 ? 0 : prev + 1,
					);
				},
				(animationDuration * 1000) / 2,
			);

			setTimeout(() => {
				setIsFlipping(false);
			}, animationDuration * 1000);
		}, intervalSeconds * 1000);
	}, [isAnimated, items.length, intervalSeconds, animationDuration]);

	// 手動切り替え関数
	const handleManualSwitch = useCallback(
		(targetIndex: number) => {
			if (!enableManualSwitch || isFlipping || targetIndex === currentSetIndex)
				return;

			// 現在のタイマーをクリア
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}

			// アニメーション開始
			setIsFlipping(true);
			setAnimationKey((prev) => prev + 1);

			// アニメーション時間の50%でセット切り替え
			setTimeout(
				() => {
					setCurrentSetIndex(targetIndex);
					onSetChange?.(targetIndex);
				},
				(animationDuration * 1000) / 2,
			);

			// アニメーション完了後に状態リセット
			setTimeout(() => {
				setIsFlipping(false);
				// 新しいタイマーを開始
				startAutoSwitching();
			}, animationDuration * 1000);
		},
		[
			enableManualSwitch,
			isFlipping,
			currentSetIndex,
			animationDuration,
			onSetChange,
			startAutoSwitching,
		],
	);

	// 最大項目数を計算（高さ固定のため）
	const maxItemCount = useMemo(() => {
		if (isAnimated) {
			return Math.max(...items.map((itemSet) => itemSet.length));
		}
		return items.length;
	}, [items, isAnimated]);

	// 高さ固定のため、不足分をプレースホルダーで埋める
	const displayItems = useMemo(() => {
		const itemsArray = [...currentItems];
		const shortage = maxItemCount - itemsArray.length;

		// 不足分を透明なプレースホルダーで埋める
		for (let i = 0; i < shortage; i++) {
			itemsArray.push(`__placeholder_${i}`);
		}

		return itemsArray;
	}, [currentItems, maxItemCount]);

	useEffect(() => {
		// 既存のタイマーをクリア
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}

		// 新しいタイマーを開始
		startAutoSwitching();

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [startAutoSwitching]);

	// デフォルトのアイテムレンダリング関数
	const defaultRenderItem = (
		item: string,
		index: number,
		isPlaceholder: boolean,
	) => {
		const IconToRender =
			typeof IconComponent === "function" ? IconComponent : () => IconComponent;

		return (
			<div
				key={isAnimated ? `${animationKey}-${index}` : index}
				className={`${itemClassName} ${
					isPlaceholder
						? "invisible" // プレースホルダーは透明
						: ""
				} ${isAnimated ? "flip-item" : ""}`}
				style={
					isAnimated
						? ({
								"--delay": `${index * staggerDelay}s`,
								animation: isFlipping
									? `flipVertical ${animationDuration}s ease-in-out`
									: "none",
							} as React.CSSProperties)
						: undefined
				}
			>
				{showIcon && (
					<div
						className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
							isPlaceholder ? "bg-transparent" : "bg-primary/10"
						}`}
					>
						{!isPlaceholder && <IconToRender className={iconClassName} />}
					</div>
				)}
				<p
					className={`${textClassName} ${
						isPlaceholder ? "text-transparent" : ""
					}`}
				>
					{isPlaceholder ? "placeholder" : item}
				</p>
			</div>
		);
	};

	// インジゲーターレンダリング関数
	const renderIndicator = () => {
		if (!shouldShowIndicator) return null;

		return (
			<div
				className={`flex items-center justify-center gap-2 py-3 ${indicatorClassName}`}
				role="tablist"
				aria-label="コンテンツセット選択"
			>
				{items.map((_, index) => (
					<button
						key={`indicator-${items.length}-${index}`}
						type="button"
						className={`w-2 h-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
							index === currentSetIndex
								? "bg-primary scale-110"
								: "bg-muted-foreground/30 hover:bg-muted-foreground/60"
						}`}
						onClick={() => handleManualSwitch(index)}
						disabled={isFlipping || !enableManualSwitch}
						role="tab"
						aria-selected={index === currentSetIndex}
						aria-label={`セット ${index + 1} / ${items.length}`}
					/>
				))}
			</div>
		);
	};

	return (
		<div className={className}>
			{/* top位置のインジゲーター */}
			{indicatorPosition === "top" && renderIndicator()}

			{displayItems.map((item, index) => {
				const isPlaceholder = item.startsWith("__placeholder_");
				return renderItem
					? renderItem(item, index, isPlaceholder)
					: defaultRenderItem(item, index, isPlaceholder);
			})}

			{/* bottom位置のインジゲーター */}
			{indicatorPosition === "bottom" && renderIndicator()}

			{/* CSS-in-JS アニメーションスタイル */}
			{isAnimated && (
				<style>{`
					@keyframes flipVertical {
						0% {
							transform: rotateX(0deg);
							opacity: 1;
						}
						50% {
							transform: rotateX(90deg);
							opacity: 0;
						}
						100% {
							transform: rotateX(0deg);
							opacity: 1;
						}
					}
					
					.flip-item {
						animation-delay: var(--delay);
						transform-origin: center;
						backface-visibility: hidden;
					}
				`}</style>
			)}
		</div>
	);
}
