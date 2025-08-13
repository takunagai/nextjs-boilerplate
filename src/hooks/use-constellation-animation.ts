/**
 * Constellation のメインアニメーションループ管理フック
 */
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { ANIMATION_CONSTANTS } from "@/constants/constellation";
import type {
	MeshRefs,
	NodeData,
	ParticleData,
	RippleData,
} from "@/types/constellation";

interface UseConstellationAnimationProps {
	meshRefs: MeshRefs;
	nodes: NodeData[];
	particles: ParticleData[];
	ripples: RippleData[];
	connectionDistance: number;
	mouseInfluence: boolean;
	getMouse3DPosition: () => THREE.Vector3;
	updateParticles: () => void;
	updateRipples: () => void;
}

export function useConstellationAnimation({
	meshRefs,
	nodes,
	particles,
	ripples,
	connectionDistance,
	mouseInfluence,
	getMouse3DPosition,
	updateParticles,
	updateRipples,
}: UseConstellationAnimationProps) {
	useFrame((state) => {
		if (
			!meshRefs.mesh.current ||
			!meshRefs.lineMesh.current ||
			nodes.length === 0
		)
			return;

		const time = state.clock.elapsedTime;
		const mousePos3D = getMouse3DPosition();

		// ジオメトリのバッファアクセス
		const positions = meshRefs.mesh.current.geometry.attributes.position
			.array as Float32Array;
		const sizes = meshRefs.mesh.current.geometry.attributes.size
			.array as Float32Array;
		const colors = meshRefs.mesh.current.geometry.attributes.color
			.array as Float32Array;
		const linePositions = meshRefs.lineMesh.current.geometry.attributes.position
			.array as Float32Array;
		const lineColors = meshRefs.lineMesh.current.geometry.attributes.color
			.array as Float32Array;

		let lineIndex = 0;

		// ノードの更新
		nodes.forEach((node, i) => {
			updateNodePhysics(node, time, mousePos3D, mouseInfluence);
			updateNodeVisuals(node, i, time, positions, sizes, colors);
			lineIndex = updateNodeConnections(
				node,
				i,
				nodes,
				connectionDistance,
				linePositions,
				lineColors,
				lineIndex,
				time,
			);
		});

		// パーティクルの更新
		updateParticleSystem(meshRefs.particleMesh.current, particles);
		updateParticles();

		// 波紋の更新
		updateRippleSystem(meshRefs.rippleMesh.current, ripples);
		updateRipples();

		// 未使用ラインを非表示
		clearUnusedLines(linePositions, lineIndex, nodes.length);

		// ジオメトリの更新通知
		updateGeometryAttributes(meshRefs, lineIndex);
	});
}

// ノードの物理演算更新
function updateNodePhysics(
	node: NodeData,
	time: number,
	mousePos3D: THREE.Vector3,
	mouseInfluence: boolean,
) {
	// エネルギーレベルの更新
	node.energy +=
		(node.targetEnergy - node.energy) * ANIMATION_CONSTANTS.ENERGY_LERP_SPEED;
	node.pulsePhase += ANIMATION_CONSTANTS.PULSE_SPEED;

	// 爆発効果の減衰
	if (
		node.explosionTime &&
		time - node.explosionTime / 1000 >
			ANIMATION_CONSTANTS.EXPLOSION_DURATION_SEC
	) {
		node.targetEnergy = 0.5 + Math.random() * 0.5;
		delete node.explosionTime;
	}

	// 速度に基づいて位置を更新
	const energyMultiplier =
		ANIMATION_CONSTANTS.VELOCITY_MULTIPLIER_BASE + node.energy;
	node.position.add(node.velocity.clone().multiplyScalar(energyMultiplier));

	// 境界でバウンス
	if (Math.abs(node.position.x) > ANIMATION_CONSTANTS.BOUNDARY_SIZE) {
		node.velocity.x *= -1;
	}
	if (Math.abs(node.position.y) > ANIMATION_CONSTANTS.BOUNDARY_SIZE) {
		node.velocity.y *= -1;
	}
	if (Math.abs(node.position.z) > ANIMATION_CONSTANTS.BOUNDARY_SIZE) {
		node.velocity.z *= -1;
	}

	// マウスの影響
	if (mouseInfluence) {
		const distToMouse = node.position.distanceTo(mousePos3D);
		if (distToMouse < ANIMATION_CONSTANTS.MOUSE_INFLUENCE_RADIUS) {
			const force = mousePos3D.clone().sub(node.position).normalize();
			force.multiplyScalar(
				ANIMATION_CONSTANTS.MOUSE_FORCE_MULTIPLIER *
					(1 - distToMouse / ANIMATION_CONSTANTS.MOUSE_INFLUENCE_RADIUS),
			);
			node.position.sub(force);
			node.targetEnergy = Math.max(
				node.targetEnergy,
				ANIMATION_CONSTANTS.MOUSE_ENERGY_BOOST,
			);
		}
	}
}

// ノードの視覚的更新
function updateNodeVisuals(
	node: NodeData,
	index: number,
	time: number,
	positions: Float32Array,
	sizes: Float32Array,
	colors: Float32Array,
) {
	// サイズとカラーパルス効果
	const pulse = Math.sin(node.pulsePhase) * 0.3 + 0.7;
	const energyPulse = node.energy * pulse;
	sizes[index] =
		(0.08 + energyPulse * 0.15) * (0.8 + Math.sin(time * 2 + index) * 0.2);

	// 動的カラーエフェクト
	const hue = ANIMATION_CONSTANTS.BASE_HUE + node.energy * 0.3;
	const saturation = ANIMATION_CONSTANTS.SATURATION + energyPulse * 0.2;
	const lightness = ANIMATION_CONSTANTS.BASE_LIGHTNESS + energyPulse * 0.4;
	const color = new THREE.Color().setHSL(hue, saturation, lightness);

	colors[index * 3] = color.r;
	colors[index * 3 + 1] = color.g;
	colors[index * 3 + 2] = color.b;

	// 位置を更新
	positions[index * 3] = node.position.x;
	positions[index * 3 + 1] = node.position.y;
	positions[index * 3 + 2] = node.position.z;
}

// ノード接続の更新
function updateNodeConnections(
	node: NodeData,
	index: number,
	nodes: NodeData[],
	connectionDistance: number,
	linePositions: Float32Array,
	lineColors: Float32Array,
	lineIndex: number,
	time: number,
): number {
	node.connections = [];

	for (let j = index + 1; j < nodes.length; j++) {
		const dist = node.position.distanceTo(nodes[j].position);
		if (dist < connectionDistance) {
			node.connections.push(j);

			// エネルギー伝播
			const avgEnergy = (node.energy + nodes[j].energy) / 2;
			const energyFlow = Math.sin(time * 3 + dist) * 0.5 + 0.5;

			// ラインを追加
			const opacity = (1 - dist / connectionDistance) * (0.3 + avgEnergy * 0.7);

			// 開始点と終了点
			linePositions[lineIndex * 6] = node.position.x;
			linePositions[lineIndex * 6 + 1] = node.position.y;
			linePositions[lineIndex * 6 + 2] = node.position.z;
			linePositions[lineIndex * 6 + 3] = nodes[j].position.x;
			linePositions[lineIndex * 6 + 4] = nodes[j].position.y;
			linePositions[lineIndex * 6 + 5] = nodes[j].position.z;

			// 動的ラインカラー
			const lineHue =
				ANIMATION_CONSTANTS.BASE_HUE + avgEnergy * 0.3 + energyFlow * 0.2;
			const lineColor = new THREE.Color().setHSL(
				lineHue,
				ANIMATION_CONSTANTS.SATURATION,
				ANIMATION_CONSTANTS.BASE_LIGHTNESS + avgEnergy * 0.3,
			);

			for (let k = 0; k < 2; k++) {
				lineColors[lineIndex * 6 + k * 3] = lineColor.r * opacity;
				lineColors[lineIndex * 6 + k * 3 + 1] = lineColor.g * opacity;
				lineColors[lineIndex * 6 + k * 3 + 2] = lineColor.b * opacity;
			}

			lineIndex++;
		}
	}

	return lineIndex;
}

// パーティクルシステムの更新
function updateParticleSystem(
	particleMesh: THREE.Points | null,
	particles: ParticleData[],
) {
	if (!particleMesh || particles.length === 0) return;

	const particlePositions = particleMesh.geometry.attributes.position
		.array as Float32Array;
	const particleColors = particleMesh.geometry.attributes.color
		.array as Float32Array;
	const particleSizes = particleMesh.geometry.attributes.size
		.array as Float32Array;

	particles.forEach((particle, i) => {
		particle.life -= ANIMATION_CONSTANTS.PARTICLE_LIFE_DECAY;
		particle.position.add(particle.velocity);
		particle.velocity.multiplyScalar(
			ANIMATION_CONSTANTS.PARTICLE_VELOCITY_DECAY,
		);

		if (particle.life > 0) {
			const lifeRatio = particle.life / particle.maxLife;
			particlePositions[i * 3] = particle.position.x;
			particlePositions[i * 3 + 1] = particle.position.y;
			particlePositions[i * 3 + 2] = particle.position.z;

			particleColors[i * 3] = particle.color.r * lifeRatio;
			particleColors[i * 3 + 1] = particle.color.g * lifeRatio;
			particleColors[i * 3 + 2] = particle.color.b * lifeRatio;

			particleSizes[i] = 0.05 * lifeRatio;
		} else {
			particlePositions[i * 3] = 0;
			particlePositions[i * 3 + 1] = 0;
			particlePositions[i * 3 + 2] = 0;
			particleSizes[i] = 0;
		}
	});

	particleMesh.geometry.attributes.position.needsUpdate = true;
	particleMesh.geometry.attributes.color.needsUpdate = true;
	particleMesh.geometry.attributes.size.needsUpdate = true;
}

// 波紋システムの更新
function updateRippleSystem(
	rippleMesh: THREE.LineSegments | null,
	ripples: RippleData[],
) {
	if (!rippleMesh || ripples.length === 0) return;

	const ripplePositions = rippleMesh.geometry.attributes.position
		.array as Float32Array;
	const rippleColors = rippleMesh.geometry.attributes.color
		.array as Float32Array;
	let rippleIndex = 0;

	ripples.forEach((ripple) => {
		ripple.life -= ANIMATION_CONSTANTS.RIPPLE_LIFE_DECAY;
		ripple.radius = ripple.maxRadius * (1 - ripple.life);

		if (ripple.life > 0) {
			const segments = ANIMATION_CONSTANTS.RIPPLE_SEGMENTS;
			const opacity = ripple.life * ANIMATION_CONSTANTS.RIPPLE_OPACITY;

			for (let i = 0; i < segments; i++) {
				const angle1 = (i / segments) * Math.PI * 2;
				const angle2 = ((i + 1) / segments) * Math.PI * 2;

				const x1 = ripple.position.x + Math.cos(angle1) * ripple.radius;
				const y1 = ripple.position.y + Math.sin(angle1) * ripple.radius;
				const x2 = ripple.position.x + Math.cos(angle2) * ripple.radius;
				const y2 = ripple.position.y + Math.sin(angle2) * ripple.radius;

				// ライン描画
				ripplePositions[rippleIndex * 6] = x1;
				ripplePositions[rippleIndex * 6 + 1] = y1;
				ripplePositions[rippleIndex * 6 + 2] = ripple.position.z;
				ripplePositions[rippleIndex * 6 + 3] = x2;
				ripplePositions[rippleIndex * 6 + 4] = y2;
				ripplePositions[rippleIndex * 6 + 5] = ripple.position.z;

				// カラー
				for (let k = 0; k < 2; k++) {
					rippleColors[rippleIndex * 6 + k * 3] = 0.8 * opacity;
					rippleColors[rippleIndex * 6 + k * 3 + 1] = 0.9 * opacity;
					rippleColors[rippleIndex * 6 + k * 3 + 2] = 1.0 * opacity;
				}

				rippleIndex++;
			}
		}
	});

	rippleMesh.geometry.attributes.position.needsUpdate = true;
	rippleMesh.geometry.attributes.color.needsUpdate = true;
	rippleMesh.geometry.setDrawRange(0, rippleIndex * 2);
}

// 未使用ラインをクリア
function clearUnusedLines(
	linePositions: Float32Array,
	lineIndex: number,
	nodeCount: number,
) {
	for (let i = lineIndex; i < nodeCount * nodeCount; i++) {
		for (let j = 0; j < 6; j++) {
			linePositions[i * 6 + j] = 0;
		}
	}
}

// ジオメトリ属性の更新
function updateGeometryAttributes(meshRefs: MeshRefs, lineIndex: number) {
	if (meshRefs.mesh.current) {
		meshRefs.mesh.current.geometry.attributes.position.needsUpdate = true;
		meshRefs.mesh.current.geometry.attributes.size.needsUpdate = true;
		meshRefs.mesh.current.geometry.attributes.color.needsUpdate = true;
	}

	if (meshRefs.lineMesh.current) {
		meshRefs.lineMesh.current.geometry.attributes.position.needsUpdate = true;
		meshRefs.lineMesh.current.geometry.attributes.color.needsUpdate = true;
		meshRefs.lineMesh.current.geometry.setDrawRange(0, lineIndex * 2);
	}
}
