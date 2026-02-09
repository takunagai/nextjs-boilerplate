"use client";

import { useEffect, useState } from "react";

interface MinimalAnimationProps {
	className?: string;
}

export function MinimalAnimation({ className = "" }: MinimalAnimationProps) {
	const [animationStarted, setAnimationStarted] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	// prefers-reduced-motion 検出
	useEffect(() => {
		const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mql.matches);
		if (mql.matches) {
			setAnimationStarted(true);
		}
		const handler = (e: MediaQueryListEvent) => {
			setPrefersReducedMotion(e.matches);
			if (e.matches) setAnimationStarted(true);
		};
		mql.addEventListener("change", handler);
		return () => mql.removeEventListener("change", handler);
	}, []);

	// アニメーション開始（reduced-motion でない場合のみ遅延）
	useEffect(() => {
		if (prefersReducedMotion) return;
		const timer = setTimeout(() => {
			setAnimationStarted(true);
		}, 100);

		return () => clearTimeout(timer);
	}, [prefersReducedMotion]);

	return (
		<div className={`relative ${className}`}>
			<h1 className="text-6xl leading-[1.2] md:text-6xl lg:text-7xl font-bold tracking-tight">
				{/* Web */}
				<span
					className={`
						inline-block text-primary
						${
							prefersReducedMotion
								? "opacity-100"
								: `transition-all duration-600 ease-out ${
										animationStarted
											? "opacity-100 translate-y-0 animate-neon-glow"
											: "opacity-0 translate-y-8"
									}`
						}
					`}
					style={
						prefersReducedMotion
							? undefined
							: {
									animationDelay: animationStarted ? "2s" : "0s",
									transitionDelay: "0.5s",
								}
					}
				>
					Web
				</span>

				{/* First × */}
				<span
					className={`
						inline-block mx-2 text-white
						${
							prefersReducedMotion
								? "opacity-100"
								: `transition-all duration-300 ease-out ${
										animationStarted
											? "opacity-100 scale-100"
											: "opacity-0 scale-0"
									}`
						}
					`}
					style={prefersReducedMotion ? undefined : { transitionDelay: "0.7s" }}
				>
					×
				</span>

				{/* AI */}
				<span
					className={`
						inline-block text-primary
						${
							prefersReducedMotion
								? "opacity-100"
								: `transition-all duration-600 ease-out ${
										animationStarted
											? "opacity-100 translate-y-0 animate-neon-glow"
											: "opacity-0 translate-y-8"
									}`
						}
					`}
					style={
						prefersReducedMotion
							? undefined
							: {
									animationDelay: animationStarted ? "2.4s" : "0s",
									transitionDelay: "0.8s",
								}
					}
				>
					AI
				</span>

				{/* Mobile line break */}
				<br className="md:hidden" />

				{/* Second × */}
				<span
					className={`
						inline-block mx-2 md:mx-2 text-white
						${
							prefersReducedMotion
								? "opacity-100"
								: `transition-all duration-300 ease-out ${
										animationStarted
											? "opacity-100 scale-100"
											: "opacity-0 scale-0"
									}`
						}
					`}
					style={prefersReducedMotion ? undefined : { transitionDelay: "1.0s" }}
				>
					×
				</span>

				{/* Creative */}
				<span
					className={`
						inline-block text-primary
						${
							prefersReducedMotion
								? "opacity-100"
								: `transition-all duration-600 ease-out ${
										animationStarted
											? "opacity-100 translate-y-0 animate-neon-glow"
											: "opacity-0 translate-y-8"
									}`
						}
					`}
					style={
						prefersReducedMotion
							? undefined
							: {
									animationDelay: animationStarted ? "2.8s" : "0s",
									transitionDelay: "1.1s",
								}
					}
				>
					Creative
				</span>
			</h1>

			{/* Subtle breathing effect after animation completes */}
			{!prefersReducedMotion && (
				<div
					className={`
						absolute inset-0 transition-opacity duration-1000 ease-out
						${animationStarted ? "opacity-100" : "opacity-0"}
						animate-breathing
					`}
					style={{
						transitionDelay: "2s",
						animationDelay: "2s",
					}}
				>
					<div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-lg blur-xl" />
				</div>
			)}
		</div>
	);
}
