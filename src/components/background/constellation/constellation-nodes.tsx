/**
 * Constellation のメインノード描画コンポーネント
 */
import { forwardRef } from "react";
import * as THREE from "three";

import { FRAGMENT_SHADER_NODE, VERTEX_SHADER_NODE } from "@/constants/constellation";

interface ConstellationNodesProps {
	geometry: THREE.BufferGeometry;
}

export const ConstellationNodes = forwardRef<THREE.Points, ConstellationNodesProps>(
	({ geometry }, ref) => {
		return (
			<points ref={ref} geometry={geometry}>
				<shaderMaterial
					vertexShader={VERTEX_SHADER_NODE}
					fragmentShader={FRAGMENT_SHADER_NODE}
					transparent
					vertexColors
					blending={THREE.AdditiveBlending}
				/>
			</points>
		);
	},
);

ConstellationNodes.displayName = "ConstellationNodes";