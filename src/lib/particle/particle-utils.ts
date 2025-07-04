import { Particle } from "./particle";
import { RENDERING_CONSTANTS } from "@/constants/particle";

/**
 * パーティクル間の接続線を描画する関数（パフォーマンス最適化済み）
 * 近くのパーティクル同士をグラデーション線で結ぶ
 */
export function drawParticleConnections(
	ctx: CanvasRenderingContext2D,
	particles: Particle[],
): void {
	const particleCount = particles.length;
	const connectionDistance = RENDERING_CONSTANTS.CONNECTION_DISTANCE;
	const opacityBase = RENDERING_CONSTANTS.CONNECTION_OPACITY_BASE;
	
	// 接続線の設定を事前に行う
	ctx.lineWidth = RENDERING_CONSTANTS.CONNECTION_LINE_WIDTH;
	
	for (let i = 0; i < particleCount; i++) {
		const particleA = particles[i];
		
		for (let j = i + 1; j < particleCount; j++) {
			const particleB = particles[j];
			const distance = particleA.distanceTo(particleB);

			if (distance < connectionDistance) {
				const opacity = (1 - distance / connectionDistance) * opacityBase;
				
				ctx.beginPath();
				ctx.moveTo(particleA.x, particleA.y);
				ctx.lineTo(particleB.x, particleB.y);

				// グラデーション線の作成
				const gradient = ctx.createLinearGradient(
					particleA.x,
					particleA.y,
					particleB.x,
					particleB.y,
				);
				gradient.addColorStop(
					0,
					`rgba(${particleA.color.r}, ${particleA.color.g}, ${particleA.color.b}, ${opacity})`,
				);
				gradient.addColorStop(
					1,
					`rgba(${particleB.color.r}, ${particleB.color.g}, ${particleB.color.b}, ${opacity})`,
				);

				ctx.strokeStyle = gradient;
				ctx.stroke();
			}
		}
	}
}

/**
 * デバイスタイプに基づいてパーティクル数を決定
 */
export function getParticleCount(isMobile: boolean): number {
	if (typeof window === "undefined") return 50; // SSR対応
	
	const width = window.innerWidth;
	return width < 768 ? 50 : 100;
}

/**
 * パーティクル配列を初期化
 */
export function initializeParticles(
	count: number,
	canvasWidth: number,
	canvasHeight: number,
): Particle[] {
	return Array.from(
		{ length: count },
		() => new Particle(canvasWidth, canvasHeight),
	);
}

/**
 * キャンバスリサイズ時のパーティクル位置調整（効率化）
 */
export function adjustParticlesForResize(
	particles: Particle[],
	newWidth: number,
	newHeight: number,
): void {
	const particleCount = particles.length;
	for (let i = 0; i < particleCount; i++) {
		const particle = particles[i];
		// 新しいキャンバスサイズに収まるよう位置を調整
		if (particle.x > newWidth) particle.x = newWidth;
		if (particle.y > newHeight) particle.y = newHeight;
	}
}

/**
 * モバイルデバイス判定
 */
export function checkIsMobile(): boolean {
	if (typeof window === "undefined") return false; // SSR対応
	return window.innerWidth < 768;
}