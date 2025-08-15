import {
	PARTICLE_COLORS,
	type ParticleColor,
	PHYSICS_CONSTANTS,
	RENDERING_CONSTANTS,
} from "@/constants/particle";

/**
 * 個別のパーティクルを表現するクラス
 * アニメーション、物理シミュレーション、描画機能を統合
 */
export class Particle {
	// 位置
	x: number;
	y: number;

	// 速度
	vx: number;
	vy: number;

	// 見た目
	radius: number;
	color: ParticleColor;

	// アニメーション
	pulseSpeed: number;
	pulsePhase: number;

	constructor(canvasWidth: number, canvasHeight: number) {
		// ランダムな初期位置
		this.x = Math.random() * canvasWidth;
		this.y = Math.random() * canvasHeight;

		// ランダムな初期速度
		this.vx =
			(Math.random() - PHYSICS_CONSTANTS.VELOCITY_RANGE / 2) *
			PHYSICS_CONSTANTS.VELOCITY_BASE;
		this.vy =
			(Math.random() - PHYSICS_CONSTANTS.VELOCITY_RANGE / 2) *
			PHYSICS_CONSTANTS.VELOCITY_BASE;

		// ランダムな半径
		this.radius =
			Math.random() * PHYSICS_CONSTANTS.RADIUS_RANGE +
			PHYSICS_CONSTANTS.RADIUS_BASE;

		// ランダムな色
		this.color =
			PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];

		// パルスアニメーション設定
		this.pulseSpeed =
			Math.random() * PHYSICS_CONSTANTS.PULSE_SPEED_RANGE +
			PHYSICS_CONSTANTS.PULSE_SPEED_BASE;
		this.pulsePhase = Math.random() * Math.PI * 2;
	}

	/**
	 * パーティクルの位置と速度を更新
	 * 画面端での反射処理も含む
	 */
	update(canvasWidth: number, canvasHeight: number): void {
		// 位置の更新
		this.x += this.vx;
		this.y += this.vy;

		// 画面端での反射
		if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
		if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;

		// 境界内に収める
		this.x = Math.max(0, Math.min(canvasWidth, this.x));
		this.y = Math.max(0, Math.min(canvasHeight, this.y));
	}

	/**
	 * パーティクルをキャンバスに描画
	 * パルスエフェクトとグローエフェクトを含む
	 */
	draw(ctx: CanvasRenderingContext2D, time: number): void {
		// パルスエフェクトの計算
		const pulse =
			Math.sin(time * this.pulseSpeed + this.pulsePhase) *
				PHYSICS_CONSTANTS.PULSE_AMPLITUDE +
			PHYSICS_CONSTANTS.PULSE_OFFSET;
		const opacity = RENDERING_CONSTANTS.BASE_OPACITY * pulse;

		// メインパーティクルの描画
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity})`;
		ctx.fill();

		// グローエフェクトの描画
		ctx.beginPath();
		ctx.arc(
			this.x,
			this.y,
			this.radius * pulse * RENDERING_CONSTANTS.GLOW_RADIUS_MULTIPLIER,
			0,
			Math.PI * 2,
		);
		ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${opacity * RENDERING_CONSTANTS.GLOW_OPACITY_MULTIPLIER})`;
		ctx.fill();
	}

	/**
	 * マウスの位置に基づいてパーティクルに力を適用
	 * 近くのパーティクルを押し出す効果
	 */
	applyMouseForce(mouseX: number, mouseY: number): void {
		const dx = mouseX - this.x;
		const dy = mouseY - this.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance < PHYSICS_CONSTANTS.MOUSE_INFLUENCE_RADIUS && distance > 0) {
			const force =
				(PHYSICS_CONSTANTS.MOUSE_INFLUENCE_RADIUS - distance) /
				PHYSICS_CONSTANTS.MOUSE_FORCE_DECAY;
			this.vx -= (dx / distance) * force * PHYSICS_CONSTANTS.MOUSE_FORCE;
			this.vy -= (dy / distance) * force * PHYSICS_CONSTANTS.MOUSE_FORCE;

			// 速度制限
			this.vx = Math.max(
				PHYSICS_CONSTANTS.VELOCITY_MIN,
				Math.min(PHYSICS_CONSTANTS.VELOCITY_MAX, this.vx),
			);
			this.vy = Math.max(
				PHYSICS_CONSTANTS.VELOCITY_MIN,
				Math.min(PHYSICS_CONSTANTS.VELOCITY_MAX, this.vy),
			);
		}
	}

	/**
	 * 他のパーティクルとの距離を計算
	 */
	distanceTo(other: Particle): number {
		const dx = this.x - other.x;
		const dy = this.y - other.y;
		return Math.sqrt(dx * dx + dy * dy);
	}
}
