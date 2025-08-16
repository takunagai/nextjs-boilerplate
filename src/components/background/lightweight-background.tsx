"use client";

import { useEffect, useState } from "react";

interface LightweightBackgroundProps {
	/** 背景の種類 */
	variant?: "gradient" | "animated" | "static";
	/** 透明度 */
	opacity?: number;
	/** アニメーション速度 */
	animationSpeed?: "slow" | "medium" | "fast";
}

/**
 * 軽量な代替背景コンポーネント
 * 3D効果が利用できない、または低性能デバイス向け
 */
export function LightweightBackground({
	variant = "gradient",
	opacity = 0.6,
	animationSpeed = "slow",
}: LightweightBackgroundProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// フェードイン効果
		const timer = setTimeout(() => setIsVisible(true), 100);
		return () => clearTimeout(timer);
	}, []);

	const getAnimationDuration = () => {
		switch (animationSpeed) {
			case "fast": return "10s";
			case "medium": return "20s";
			case "slow": return "30s";
			default: return "30s";
		}
	};

	if (variant === "static") {
		return (
			<div 
				className={`
					fixed inset-0 -z-10 transition-opacity duration-1000
					${isVisible ? 'opacity-100' : 'opacity-0'}
				`}
				style={{ opacity }}
			>
				<div className="h-full w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900" />
			</div>
		);
	}

	if (variant === "animated") {
		return (
			<div 
				className={`
					fixed inset-0 -z-10 transition-opacity duration-1000
					${isVisible ? 'opacity-100' : 'opacity-0'}
				`}
				style={{ opacity }}
			>
				{/* メインの背景グラデーション */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900" />
				
				{/* アニメーション要素 */}
				<div className="absolute inset-0 overflow-hidden">
					{/* 浮遊する円形要素 */}
					{Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className="absolute rounded-full bg-white/20 dark:bg-white/10 blur-xl"
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
								width: `${50 + Math.random() * 100}px`,
								height: `${50 + Math.random() * 100}px`,
								animation: `float-${i} ${getAnimationDuration()} ease-in-out infinite`,
								animationDelay: `${i * 2}s`,
							}}
						/>
					))}
				</div>

				{/* CSSアニメーション定義 */}
				<style jsx>{`
					@keyframes float-0 {
						0%, 100% { transform: translate(0px, 0px) scale(1); }
						25% { transform: translate(10px, -10px) scale(1.1); }
						50% { transform: translate(-5px, 5px) scale(0.9); }
						75% { transform: translate(-10px, -5px) scale(1.05); }
					}
					@keyframes float-1 {
						0%, 100% { transform: translate(0px, 0px) scale(1); }
						25% { transform: translate(-15px, 10px) scale(0.95); }
						50% { transform: translate(8px, -8px) scale(1.1); }
						75% { transform: translate(12px, 6px) scale(0.9); }
					}
					@keyframes float-2 {
						0%, 100% { transform: translate(0px, 0px) scale(1); }
						25% { transform: translate(5px, 15px) scale(1.05); }
						50% { transform: translate(-10px, -5px) scale(0.95); }
						75% { transform: translate(8px, -12px) scale(1.1); }
					}
					@keyframes float-3 {
						0%, 100% { transform: translate(0px, 0px) scale(1); }
						25% { transform: translate(-8px, -15px) scale(0.9); }
						50% { transform: translate(12px, 8px) scale(1.05); }
						75% { transform: translate(-6px, 10px) scale(0.95); }
					}
					@keyframes float-4 {
						0%, 100% { transform: translate(0px, 0px) scale(1); }
						25% { transform: translate(15px, 5px) scale(1.1); }
						50% { transform: translate(-12px, -10px) scale(0.9); }
						75% { transform: translate(6px, 12px) scale(1.05); }
					}
				`}</style>
			</div>
		);
	}

	// デフォルト: gradient
	return (
		<div 
			className={`
				fixed inset-0 -z-10 transition-opacity duration-1000
				${isVisible ? 'opacity-100' : 'opacity-0'}
			`}
			style={{ opacity }}
		>
			<div 
				className="h-full w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900"
				style={{
					background: `
						radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%),
						radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%),
						radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3), transparent 50%),
						linear-gradient(135deg, 
							rgb(219, 234, 254) 0%, 
							rgb(199, 210, 254) 25%, 
							rgb(196, 181, 253) 50%, 
							rgb(221, 214, 254) 75%, 
							rgb(238, 242, 255) 100%
						)
					`,
				}}
			/>
		</div>
	);
}

/**
 * パフォーマンス対応背景コンポーネント
 * デバイス性能に基づいて最適な背景を選択
 */
export function PerformanceAwareBackground() {
	const [performanceLevel, setPerformanceLevel] = useState<"low" | "medium" | "high">("medium");

	useEffect(() => {
		// 簡易パフォーマンス検出
		const detectPerformance = () => {
			const userAgent = navigator.userAgent.toLowerCase();
			const isDesktop = !(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent));
			
			if (isDesktop) {
				return "high";
			} else if (/iphone.*os 1[6-9]|ipad.*os 1[6-9]|android.*chrome/i.test(userAgent)) {
				return "medium";
			} else {
				return "low";
			}
		};

		setPerformanceLevel(detectPerformance());
	}, []);

	// パフォーマンスレベルに基づいて背景を選択
	if (performanceLevel === "low") {
		return <LightweightBackground variant="static" opacity={0.4} />;
	} else if (performanceLevel === "medium") {
		return <LightweightBackground variant="gradient" opacity={0.6} />;
	} else {
		return <LightweightBackground variant="animated" opacity={0.7} animationSpeed="slow" />;
	}
}