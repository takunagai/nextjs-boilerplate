/**
 * Constellation 3D アニメーション関連の定数
 */

// アニメーション関連
export const ANIMATION_CONSTANTS = {
	// 物理シミュレーション
	ENERGY_LERP_SPEED: 0.05,
	PULSE_SPEED: 0.05,
	VELOCITY_MULTIPLIER_BASE: 0.5,
	BOUNDARY_SIZE: 10,
	
	// マウスインタラクション
	MOUSE_INFLUENCE_RADIUS: 4,
	MOUSE_FORCE_MULTIPLIER: 0.02,
	MOUSE_ENERGY_BOOST: 1.5,
	CLICK_DEBOUNCE_MS: 300,
	
	// パーティクル
	PARTICLE_LIFE_DECAY: 0.02,
	PARTICLE_VELOCITY_DECAY: 0.98,
	PARTICLE_COUNT_PER_EXPLOSION: 20,
	
	// 波紋
	RIPPLE_LIFE_DECAY: 0.03,
	RIPPLE_SEGMENTS: 32,
	RIPPLE_OPACITY: 0.5,
	
	// 爆発効果
	EXPLOSION_DURATION_SEC: 2,
	
	// 色とレンダリング
	BASE_HUE: 0.6,
	SATURATION: 0.8,
	BASE_LIGHTNESS: 0.5,
} as const;

// バッファサイズの定数
export const BUFFER_SIZES = {
	MAX_PARTICLES: 1000,
	MAX_RIPPLES: 100,
	RIPPLE_SEGMENTS: 64,
} as const;

// シェーダー
export const VERTEX_SHADER_NODE = `
	attribute float size;
	varying vec3 vColor;
	varying float vSize;
	void main() {
		vColor = color;
		vSize = size;
		vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
		gl_PointSize = size * (400.0 / -mvPosition.z);
		gl_Position = projectionMatrix * mvPosition;
	}
`;

export const FRAGMENT_SHADER_NODE = `
	varying vec3 vColor;
	varying float vSize;
	void main() {
		float r = distance(gl_PointCoord, vec2(0.5, 0.5));
		if (r > 0.5) discard;
		// グロー効果
		float glow = 1.0 - smoothstep(0.0, 0.5, r);
		float core = 1.0 - smoothstep(0.0, 0.2, r);
		float intensity = core + glow * 0.3;
		gl_FragColor = vec4(vColor * intensity, glow);
	}
`;

export const VERTEX_SHADER_PARTICLE = `
	attribute float size;
	varying vec3 vColor;
	void main() {
		vColor = color;
		vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
		gl_PointSize = size * (200.0 / -mvPosition.z);
		gl_Position = projectionMatrix * mvPosition;
	}
`;

export const FRAGMENT_SHADER_PARTICLE = `
	varying vec3 vColor;
	void main() {
		float r = distance(gl_PointCoord, vec2(0.5, 0.5));
		if (r > 0.5) discard;
		float opacity = 1.0 - r * 2.0;
		gl_FragColor = vec4(vColor, opacity);
	}
`;

// デフォルト設定
export const DEFAULT_SETTINGS = {
	DESKTOP: {
		nodeCount: 150,
		connectionDistance: 2,
		mouseInfluence: true,
		dpr: 2,
	},
	MOBILE: {
		nodeCount: 50,
		connectionDistance: 1.5,
		mouseInfluence: false,
		dpr: 1,
	},
} as const;