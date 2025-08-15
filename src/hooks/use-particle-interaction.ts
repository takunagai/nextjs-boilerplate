import { useCallback, useEffect, useRef } from "react";
import type { Particle } from "@/lib/particle/particle";

interface UseParticleInteractionOptions {
	particlesRef: React.MutableRefObject<Particle[]>;
	canvasRef: React.RefObject<HTMLCanvasElement | null>;
	isMobile: boolean;
}

/**
 * パーティクルのマウスインタラクションを管理するフック
 * マウス移動の追跡、パーティクルへの力の適用を担当
 */
export function useParticleInteraction({
	particlesRef,
	canvasRef,
	isMobile,
}: UseParticleInteractionOptions) {
	const mouseRef = useRef({ x: 0, y: 0 });

	// マウス移動ハンドラー
	const handleMouseMove = useCallback(
		(e: MouseEvent) => {
			if (isMobile) return;

			mouseRef.current = { x: e.clientX, y: e.clientY };

			// 近くのパーティクルに力を適用
			const particles = particlesRef.current;
			particles.forEach((particle) => {
				particle.applyMouseForce(mouseRef.current.x, mouseRef.current.y);
			});
		},
		[particlesRef, isMobile],
	);

	// 現在のマウス位置取得
	const getMousePosition = useCallback(() => mouseRef.current, []);

	// マウスインタラクションの設定
	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || isMobile) return;

		canvas.addEventListener("mousemove", handleMouseMove);

		return () => {
			canvas.removeEventListener("mousemove", handleMouseMove);
		};
	}, [handleMouseMove, canvasRef, isMobile]);

	return {
		getMousePosition,
		handleMouseMove,
	};
}
