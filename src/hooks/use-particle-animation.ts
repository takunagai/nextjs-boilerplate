import { useCallback, useRef, useEffect } from "react";
import { Particle } from "@/lib/particle/particle";

interface UseParticleAnimationOptions {
	particlesRef: React.MutableRefObject<Particle[]>;
	getContext: () => CanvasRenderingContext2D | null;
	getDimensions: () => { width: number; height: number };
	clearCanvas: () => void;
	drawConnections: (ctx: CanvasRenderingContext2D, particles: Particle[]) => void;
}

/**
 * パーティクルアニメーションループを管理するフック
 * フレーム制御、タイマー管理、アニメーション実行を担当
 */
export function useParticleAnimation({
	particlesRef,
	getContext,
	getDimensions,
	clearCanvas,
	drawConnections,
}: UseParticleAnimationOptions) {
	const animationRef = useRef<number | undefined>(undefined);
	const timeRef = useRef(0);
	const isAnimatingRef = useRef(false);

	// アニメーションループ（パフォーマンス最適化済み）
	const animate = useCallback(() => {
		const ctx = getContext();
		if (!ctx || !isAnimatingRef.current) return;

		const { width, height } = getDimensions();
		if (width === 0 || height === 0) return;

		// キャンバスをクリア
		clearCanvas();

		// 現在のパーティクル配列を取得
		const particles = particlesRef.current;
		
		// パーティクルの更新と描画（for文で効率化）
		const particleCount = particles.length;
		for (let i = 0; i < particleCount; i++) {
			const particle = particles[i];
			particle.update(width, height);
			particle.draw(ctx, timeRef.current);
		}

		// 接続線の描画
		drawConnections(ctx, particles);

		// タイマー更新
		timeRef.current += 1;

		// 次のフレーム予約
		if (isAnimatingRef.current) {
			animationRef.current = requestAnimationFrame(animate);
		}
	}, [particlesRef, getContext, getDimensions, clearCanvas, drawConnections]);

	// アニメーション開始
	const startAnimation = useCallback(() => {
		if (isAnimatingRef.current) return;
		
		isAnimatingRef.current = true;
		animate();
	}, [animate]);

	// アニメーション停止
	const stopAnimation = useCallback(() => {
		isAnimatingRef.current = false;
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
			animationRef.current = undefined;
		}
	}, []);

	// 現在の時間取得
	const getCurrentTime = useCallback(() => timeRef.current, []);

	// クリーンアップ
	useEffect(() => {
		return () => {
			stopAnimation();
		};
	}, [stopAnimation]);

	return {
		startAnimation,
		stopAnimation,
		getCurrentTime,
		isAnimating: () => isAnimatingRef.current,
	};
}