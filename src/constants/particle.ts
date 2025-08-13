/**
 * Particle Background アニメーション関連の定数
 */

// パーティクルの色定義（寒色系カラフル）
export const PARTICLE_COLORS = [
	{ r: 100, g: 200, b: 255 }, // ライトブルー
	{ r: 150, g: 100, b: 255 }, // パープル
	{ r: 100, g: 255, b: 220 }, // シアン
	{ r: 200, g: 150, b: 255 }, // ラベンダー
	{ r: 50, g: 150, b: 255 }, // スカイブルー
] as const;

// 物理シミュレーション関連
export const PHYSICS_CONSTANTS = {
	// 速度関連
	VELOCITY_BASE: 0.5,
	VELOCITY_RANGE: 1.0, // Math.random() - 0.5 の範囲
	VELOCITY_MAX: 2,
	VELOCITY_MIN: -2,

	// パーティクルサイズ
	RADIUS_BASE: 1,
	RADIUS_RANGE: 2,

	// パルス・アニメーション
	PULSE_SPEED_BASE: 0.01,
	PULSE_SPEED_RANGE: 0.02,
	PULSE_AMPLITUDE: 0.3,
	PULSE_OFFSET: 0.7,

	// 力とインタラクション
	MOUSE_FORCE: 0.05,
	MOUSE_INFLUENCE_RADIUS: 100,
	MOUSE_FORCE_DECAY: 100,
} as const;

// 描画・視覚効果関連
export const RENDERING_CONSTANTS = {
	// 透明度
	BASE_OPACITY: 0.6,
	GLOW_OPACITY_MULTIPLIER: 0.1,

	// 接続線
	CONNECTION_DISTANCE: 150,
	CONNECTION_OPACITY_BASE: 0.3,
	CONNECTION_LINE_WIDTH: 1,

	// グローエフェクト
	GLOW_RADIUS_MULTIPLIER: 3,
} as const;

// パフォーマンス設定
export const PERFORMANCE_CONSTANTS = {
	DESKTOP: {
		PARTICLE_COUNT: 100,
		MOBILE_BREAKPOINT: 768,
	},
	MOBILE: {
		PARTICLE_COUNT: 50,
	},
} as const;

// デバイス設定のタイプ
export type DeviceType = "DESKTOP" | "MOBILE";

// パーティクル色のタイプ
export type ParticleColor = (typeof PARTICLE_COLORS)[number];
