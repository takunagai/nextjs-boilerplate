/**
 * Constellation のパーティクル管理フック
 */
import { useState } from "react";
import * as THREE from "three";

import { ANIMATION_CONSTANTS } from "@/constants/constellation";
import type { ParticleData } from "@/types/constellation";

export function useConstellationParticles() {
	const [particles, setParticles] = useState<ParticleData[]>([]);

	const createExplosion = (
		position: THREE.Vector3,
		particleCount: number = ANIMATION_CONSTANTS.PARTICLE_COUNT_PER_EXPLOSION,
	) => {
		const newParticles: ParticleData[] = [];
		for (let i = 0; i < particleCount; i++) {
			newParticles.push({
				position: position.clone(),
				velocity: new THREE.Vector3(
					(Math.random() - 0.5) * 0.1,
					(Math.random() - 0.5) * 0.1,
					(Math.random() - 0.5) * 0.1,
				),
				life: 1,
				maxLife: 1 + Math.random() * 0.5,
				color: new THREE.Color().setHSL(
					0.6 + Math.random() * 0.3,
					0.8,
					0.5 + Math.random() * 0.3,
				),
			});
		}
		setParticles((prev) => [...prev, ...newParticles]);
	};

	const updateParticles = () => {
		setParticles((prev) => prev.filter((p) => p.life > 0));
	};

	return {
		particles,
		setParticles,
		createExplosion,
		updateParticles,
	};
}
