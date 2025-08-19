"use client";

import { useEffect, useState, useMemo } from "react";
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
	className = "space-y-4",
	itemClassName = "flex items-start gap-3 p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow",
	iconClassName = "w-3 h-3 text-primary",
	textClassName = "text-muted-foreground flex-1",
	renderItem,
}: AnimatedItemListProps) {
	const [currentSetIndex, setCurrentSetIndex] = useState(0);
	const [isFlipping, setIsFlipping] = useState(false);
	const [animationKey, setAnimationKey] = useState(0);

	const isAnimated = isNestedArray(items);
	const currentItems = isAnimated ? items[currentSetIndex] : items;

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
		if (!isAnimated || items.length <= 1) return;

		const interval = setInterval(() => {
			setIsFlipping(true);
			setAnimationKey((prev) => prev + 1);

			// アニメーション時間の50%でテキスト切り替え（opacity=0の瞬間でチラつき防止）
			setTimeout(() => {
				setCurrentSetIndex((prev) =>
					prev >= items.length - 1 ? 0 : prev + 1,
				);
			}, (animationDuration * 1000) / 2);

			// アニメーション完了後に状態リセット
			setTimeout(() => {
				setIsFlipping(false);
			}, animationDuration * 1000);
		}, intervalSeconds * 1000);

		return () => clearInterval(interval);
	}, [isAnimated, items.length, intervalSeconds, animationDuration]);

	// デフォルトのアイテムレンダリング関数
	const defaultRenderItem = (
		item: string,
		index: number,
		isPlaceholder: boolean,
	) => {
		const IconToRender = typeof IconComponent === "function" ? IconComponent : () => IconComponent;

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

	return (
		<div className={className}>
			{displayItems.map((item, index) => {
				const isPlaceholder = item.startsWith("__placeholder_");
				return renderItem
					? renderItem(item, index, isPlaceholder)
					: defaultRenderItem(item, index, isPlaceholder);
			})}

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