"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";

import { useDebugLogger } from "@/hooks/use-debug-logger";
import { UI_ANIMATED_LIST } from "@/lib/constants/ui";

type AnimatedItem = string;
type AnimatedItemSet = AnimatedItem[];
type AnimatedItemData = AnimatedItem[] | AnimatedItemSet[];

interface AnimatedItemListProps {
	// 必須: 項目データ
	items: AnimatedItemData;

	// アニメーション制御
	intervalSeconds?: number; // 切り替え間隔（デフォルト: 5）
	animationDuration?: number; // フリップ時間（デフォルト: 1）
	staggerDelay?: number; // 時差間隔（デフォルト: 0.1）

	// 表示設定
	showIcon?: boolean; // アイコン表示（デフォルト: true）
	icon?: React.ComponentType<{ className?: string }> | React.ReactElement;

	// インジゲーター制御
	showIndicator?: boolean; // インジゲーター表示（デフォルト: false）
	indicatorPosition?: "top" | "bottom"; // 配置位置（デフォルト: 'top'）
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
	intervalSeconds = UI_ANIMATED_LIST.DEFAULT_INTERVAL_SECONDS,
	animationDuration = UI_ANIMATED_LIST.DEFAULT_ANIMATION_DURATION,
	staggerDelay = UI_ANIMATED_LIST.DEFAULT_STAGGER_DELAY,
	showIcon = true,
	icon: IconComponent = FaCheck,
	showIndicator = false,
	indicatorPosition = "top",
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

	// デバッグログフック
	const { log, warn } = useDebugLogger("AnimatedItemList");

	const isAnimated = isNestedArray(items);
	const currentItems = isAnimated ? items[currentSetIndex] : items;

	// インジゲーター表示判定
	const shouldShowIndicator = isAnimated && showIndicator && items.length > UI_ANIMATED_LIST.MIN_ITEMS_FOR_INDICATOR;

	// 自動切り替えタイマー開始関数
	const startAutoSwitching = useCallback(() => {
		if (!isAnimated || items.length <= 1) return;

		intervalRef.current = setInterval(() => {
			setIsFlipping(true);
			setAnimationKey((prev) => prev + UI_ANIMATED_LIST.ANIMATION_KEY_INCREMENT);

			setTimeout(
				() => {
					setCurrentSetIndex((prev) =>
						prev >= items.length - UI_ANIMATED_LIST.ANIMATION_KEY_INCREMENT ? 0 : prev + UI_ANIMATED_LIST.ANIMATION_KEY_INCREMENT,
					);
				},
				(animationDuration * UI_ANIMATED_LIST.SECONDS_TO_MILLISECONDS) / UI_ANIMATED_LIST.ANIMATION_SWITCH_RATIO,
			);

			setTimeout(() => {
				setIsFlipping(false);
			}, animationDuration * UI_ANIMATED_LIST.SECONDS_TO_MILLISECONDS);
		}, intervalSeconds * UI_ANIMATED_LIST.SECONDS_TO_MILLISECONDS);
	}, [isAnimated, items.length, intervalSeconds, animationDuration]);

	// バリデーション関数
	const validateManualSwitch = useCallback((): boolean => {
		if (!enableManualSwitch) {
			warn("⚠️ Manual switch is disabled");
			return false;
		}

		if (isFlipping) {
			warn("⚠️ Animation in progress, click ignored");
			return false;
		}

		return true;
	}, [enableManualSwitch, isFlipping, warn]);

	// 同一インデックス処理関数
	const handleSameIndexFeedback = useCallback(() => {
		log("🔄 Same index clicked, providing visual feedback");
		setAnimationKey((prev) => prev + UI_ANIMATED_LIST.ANIMATION_KEY_INCREMENT);
	}, [log]);

	// アニメーション実行関数
	const executeAnimation = useCallback(
		(targetIndex: number) => {
			// タイマークリア
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}

			log("✨ Starting manual switch animation to:", targetIndex);

			// アニメーション開始
			setIsFlipping(true);
			setAnimationKey((prev) => prev + UI_ANIMATED_LIST.ANIMATION_KEY_INCREMENT);

			// アニメーション時間の50%でセット切り替え
			setTimeout(
				() => {
					setCurrentSetIndex(targetIndex);
					onSetChange?.(targetIndex);
					log("🔄 Set switched to:", targetIndex);
				},
				(animationDuration * UI_ANIMATED_LIST.SECONDS_TO_MILLISECONDS) / UI_ANIMATED_LIST.ANIMATION_SWITCH_RATIO,
			);

			// アニメーション完了後に状態リセット
			setTimeout(() => {
				setIsFlipping(false);
				startAutoSwitching();
				log("✅ Manual switch complete, auto-timer resumed");
			}, animationDuration * UI_ANIMATED_LIST.SECONDS_TO_MILLISECONDS);
		},
		[animationDuration, onSetChange, startAutoSwitching, log],
	);

	// 手動切り替え関数（リファクタリング済み）
	const handleManualSwitch = useCallback(
		(targetIndex: number) => {
			// デバッグログ
			log("🎯 IndIcator clicked:", {
				targetIndex,
				currentIndex: currentSetIndex,
				isFlipping,
				enableManualSwitch,
			});

			// バリデーション
			if (!validateManualSwitch()) {
				return;
			}

			// 同一インデックス処理
			if (targetIndex === currentSetIndex) {
				handleSameIndexFeedback();
				return;
			}

			// アニメーション実行
			executeAnimation(targetIndex);
		},
		[
			currentSetIndex,
			isFlipping,
			enableManualSwitch,
			log,
			validateManualSwitch,
			handleSameIndexFeedback,
			executeAnimation,
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
				{items.map((_, index) => {
					const isActive = index === currentSetIndex;
					const isDisabled = isFlipping || !enableManualSwitch;

					return (
						<button
							key={`indicator-${items.length}-${index}`}
							type="button"
							className={`
								relative w-2 h-2 rounded-full transition-all duration-300 ease-out
								focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
								${!isDisabled ? "cursor-pointer" : "cursor-not-allowed"}
								${
									isActive
										? "bg-primary scale-110 shadow-md shadow-primary/25"
										: `
										bg-muted-foreground/30 
										${!isDisabled ? "hover:bg-muted-foreground/60 hover:scale-105" : ""}
									`
								}
								${isFlipping && isActive ? "animate-pulse" : ""}
								${isDisabled ? "opacity-50" : "opacity-100"}
								active:scale-95
							`}
							onClick={() => handleManualSwitch(index)}
							disabled={isDisabled}
							role="tab"
							aria-selected={isActive}
							aria-label={`セット ${index + UI_ANIMATED_LIST.ANIMATION_KEY_INCREMENT} / ${items.length}`}
							title={
								isActive
									? `現在のセット: ${index + UI_ANIMATED_LIST.ANIMATION_KEY_INCREMENT}`
									: `セット ${index + UI_ANIMATED_LIST.ANIMATION_KEY_INCREMENT} へ切り替え`
							}
						>
							{/* アクティブ状態の内側ドット */}
							{isActive && (
								<div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
							)}
						</button>
					);
				})}
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
