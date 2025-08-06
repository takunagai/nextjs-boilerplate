"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Particle, drawParticleConnections, getParticleCount, initializeParticles, adjustParticlesForResize } from "@/lib/particle";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useParticleCanvas } from "@/hooks/use-particle-canvas";
import { useParticleAnimation } from "@/hooks/use-particle-animation";
import { useParticleInteraction } from "@/hooks/use-particle-interaction";

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

	// キャンバス管理
	const { canvasRef, getContext, getDimensions, clearCanvas } = useParticleCanvas({
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

			// アニメーション開始
			startAnimation();
			setIsInitialized(true);
		};

		setupParticles();
	}, [getDimensions, startAnimation]);

	return (
		<canvas
			ref={canvasRef}
			className={cn("absolute inset-0", className)}
			onClick={onClick}
			style={{ background: "transparent" }}
		/>
	);
}