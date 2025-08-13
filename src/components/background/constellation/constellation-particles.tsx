/**
 * Constellation のパーティクル描画コンポーネント
 */
import { forwardRef } from "react";
import * as THREE from "three";

import {
	FRAGMENT_SHADER_PARTICLE,
	VERTEX_SHADER_PARTICLE,
} from "@/constants/constellation";

interface ConstellationParticlesProps {
	geometry: THREE.BufferGeometry;
}

export const ConstellationParticles = forwardRef<
	THREE.Points,
	ConstellationParticlesProps
>(({ geometry }, ref) => {
	return (
		<points ref={ref} geometry={geometry}>
			<shaderMaterial
				vertexShader={VERTEX_SHADER_PARTICLE}
				fragmentShader={FRAGMENT_SHADER_PARTICLE}
				transparent
				vertexColors
				blending={THREE.AdditiveBlending}
			/>
		</points>
	);
});

ConstellationParticles.displayName = "ConstellationParticles";
