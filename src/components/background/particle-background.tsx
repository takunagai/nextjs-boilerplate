"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useParticleAnimation } from "@/hooks/use-particle-animation";
import { useParticleCanvas } from "@/hooks/use-particle-canvas";
import { useParticleInteraction } from "@/hooks/use-particle-interaction";
import {
	adjustParticlesForResize,
	drawParticleConnections,
	getParticleCount,
	initializeParticles,
	type Particle,
} from "@/lib/particle";
import { cn } from "@/lib/utils";

interface ParticleBackgroundProps {
	className?: string;
	onClick?: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

export function ParticleBackground({
	className,
	onClick,
}: ParticleBackgroundProps) {
	const particlesRef = useRef<Particle[]>([]);
	const isMobile = useIsMobile();
	const [isInitialized, setIsInitialized] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	// キャンバス管理
	const { canvasRef, getContext, getDimensions, clearCanvas } =
		useParticleCanvas({
			onResize: (width, height) => {
				// リサイズ時のパーティクル位置調整
				adjustParticlesForResize(particlesRef.current, width, height);
			},
		});

	// 接続線描画の設定
	const drawConnections = useCallback(
		(ctx: CanvasRenderingContext2D, particles: Particle[]) => {
			drawParticleConnections(ctx, particles);
		},
		[],
	);

	// アニメーション管理
	const { startAnimation } = useParticleAnimation({
		particlesRef,
		getContext,
		getDimensions,
		clearCanvas,
		drawConnections,
	});

	// マウスインタラクション
	useParticleInteraction({
		particlesRef,
		canvasRef,
		isMobile,
	});

	// prefers-reduced-motion 検出
	useEffect(() => {
		const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(mql.matches);
		const handler = (e: MediaQueryListEvent) =>
			setPrefersReducedMotion(e.matches);
		mql.addEventListener("change", handler);
		return () => mql.removeEventListener("change", handler);
	}, []);

	// 初期化
	useEffect(() => {
		if (isInitialized) return;

		// 短い遅延を入れてキャンバスサイズが設定されるのを待つ
		const setupParticles = () => {
			const { width, height } = getDimensions();
			if (width === 0 || height === 0) {
				// キャンバスサイズが設定されていない場合、少し待ってリトライ
				setTimeout(setupParticles, 50);
				return;
			}

			// パーティクル初期化
			const particleCount = getParticleCount(isMobile);
			particlesRef.current = initializeParticles(particleCount, width, height);

			if (prefersReducedMotion) {
				// reduced-motion: 初期パーティクル位置のみ描画（1フレーム）
				const ctx = getContext();
				if (ctx) {
					clearCanvas();
					for (const particle of particlesRef.current) {
						particle.draw(ctx, 0);
					}
					drawConnections(ctx, particlesRef.current);
				}
			} else {
				// アニメーション開始
				startAnimation();
			}
			setIsInitialized(true);
		};

		setupParticles();
	}, [
		getDimensions,
		startAnimation,
		isInitialized,
		isMobile,
		prefersReducedMotion,
		getContext,
		clearCanvas,
		drawConnections,
	]);

	return (
		<canvas
			ref={canvasRef}
			className={cn("absolute inset-0", className)}
			onClick={onClick}
			style={{ background: "transparent" }}
		/>
	);
}
