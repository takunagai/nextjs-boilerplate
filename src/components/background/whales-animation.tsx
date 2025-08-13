"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useIsClient } from "usehooks-ts";
import { useWindowResize } from "@/hooks/use-window-resize";

// 泡の型定義
interface Bubble {
	id: string;
	x: number;
	y: number;
	size: number;
	duration: number;
	delay: number;
	opacity: number;
}

// 鯨の型定義
interface Whale {
	id: string;
	initialX: number;
	initialY: number;
	scale: number;
	duration: number;
	delay: number;
	direction: 1 | -1; // 1: 右向き, -1: 左向き
}

export function WhalesAnimation() {
	const isClient = useIsClient();
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const [bubbles, setBubbles] = useState<Bubble[]>([]);
	const [whales, setWhales] = useState<Whale[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);

	// 画面サイズを取得
	useWindowResize(
		() => {
			if (!isClient) return;

			const { clientWidth, clientHeight } = document.documentElement;
			setDimensions({
				width: clientWidth,
				height: clientHeight,
			});
		},
		{ deps: [isClient] },
	);

	// 泡を生成
	useEffect(() => {
		if (!dimensions.width || !dimensions.height || !isClient) return;

		const bubbleCount = Math.min(30, Math.floor(dimensions.width / 80));
		const newBubbles: Bubble[] = [];

		for (let i = 0; i < bubbleCount; i++) {
			newBubbles.push({
				id: `bubble-${i}`,
				x: Math.random() * dimensions.width,
				y: dimensions.height + Math.random() * 100,
				size: 5 + Math.random() * 20,
				duration: 10 + Math.random() * 20,
				delay: Math.random() * 15,
				opacity: 0.3 + Math.random() * 0.4,
			});
		}

		setBubbles(newBubbles);
	}, [dimensions, isClient]);

	// 鯨を生成
	useEffect(() => {
		if (!dimensions.width || !dimensions.height || !isClient) return;

		// 巨大な鯨を1-2匹のみ生成
		const whaleCount = Math.min(
			2,
			Math.max(1, Math.floor(dimensions.width / 1200)),
		);
		const newWhales: Whale[] = [];

		for (let i = 0; i < whaleCount; i++) {
			// 左から右、または右から左に移動させるための向きを交互に設定
			const direction = i % 2 === 0 ? 1 : -1;

			// ビューポートの幅を基準にした巨大なサイズを設定
			const whaleSize = Math.max(dimensions.width * 1.2, 1500);

			newWhales.push({
				id: `whale-${i}`,
				initialX:
					direction === 1
						? -whaleSize * 0.5
						: dimensions.width - whaleSize * 0.5, // 画面の外から少し見えるように
				initialY:
					dimensions.height * 0.1 + Math.random() * (dimensions.height * 0.3), // 上部にランダムに配置
				scale: 1.5 + Math.random() * 1.0, // かなり大きく
				duration: 150 + Math.random() * 100, // 非常にゆっくり移動
				delay: Math.random() * 5, // 少し遅延
				direction,
			});
		}

		setWhales(newWhales);
	}, [dimensions, isClient]);

	if (!isClient) {
		return null;
	}

	return (
		<div
			ref={containerRef}
			className="fixed inset-0 z-20 overflow-hidden pointer-events-none"
			aria-hidden="true"
		>
			{/* デバッグ用マーカー */}
			<div className="absolute top-20 right-4 w-3 h-3 bg-red-500 rounded-full opacity-50" />

			{/* 泡のアニメーション */}
			{bubbles.map((bubble) => (
				<motion.div
					key={bubble.id}
					className="absolute rounded-full bg-sky-500/30 dark:bg-blue-400/20"
					style={{
						width: bubble.size,
						height: bubble.size,
						left: bubble.x,
						top: bubble.y,
						opacity: bubble.opacity,
					}}
					initial={{ y: 0 }}
					animate={{
						y: -dimensions.height - 100,
						x: bubble.x + (Math.random() * 100 - 50),
					}}
					transition={{
						duration: bubble.duration,
						delay: bubble.delay,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				/>
			))}

			{/* 鯨のアニメーション */}
			{whales.map((whale) => (
				<motion.div
					key={whale.id}
					className="absolute"
					style={{
						left: whale.initialX,
						top: whale.initialY,
						opacity: 0.15, // より控えめな不透明度
					}}
					initial={{ x: 0 }}
					animate={{
						x:
							whale.direction === 1
								? dimensions.width + whale.scale * 300 // 右に移動
								: -dimensions.width - whale.scale * 300, // 左に移動
					}}
					transition={{
						duration: whale.duration,
						delay: whale.delay,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				>
					<svg
						width={1000 * whale.scale} // サイズを大幅に拡大
						height={400 * whale.scale} // 縦横比を保ちつつ拡大
						viewBox="0 0 300 120"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style={{
							transform: whale.direction === -1 ? "scaleX(-1)" : "none",
						}}
						aria-labelledby={`whale-title-${whale.id}`}
					>
						<title id={`whale-title-${whale.id}`}>抽象的な鯨のイラスト</title>
						{/* 抽象的な鯨のシルエット */}
						<path
							d="M40 60C40 40 60 20 100 20C140 20 160 40 180 40C200 40 220 35 240 30C260 25 280 20 290 40C300 60 290 80 280 90C270 100 250 105 230 100C210 95 200 80 180 80C160 80 140 100 100 100C60 100 40 80 40 60Z"
							fill="#38bdf8"
							className="opacity-40 dark:opacity-30"
						/>
						{/* 鯨の目 */}
						<circle
							cx="90"
							cy="50"
							r="5"
							fill="#0284c7"
							className="opacity-60 dark:opacity-40"
						/>
						{/* 鯨の水噴射 */}
						<path
							d="M250 30C250 30 260 20 270 10C280 0 290 0 290 10C290 20 280 30 270 35C260 40 250 30 250 30Z"
							fill="#38bdf8"
							className="opacity-40 dark:opacity-30"
						/>
						{/* 鯨のひれ */}
						<path
							d="M150 80C150 80 160 100 170 110C180 120 190 120 190 110C190 100 180 85 170 80C160 75 150 80 150 80Z"
							fill="#38bdf8"
							className="opacity-40 dark:opacity-30"
						/>
					</svg>
				</motion.div>
			))}
		</div>
	);
}
